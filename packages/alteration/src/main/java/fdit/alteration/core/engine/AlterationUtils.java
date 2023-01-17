package fdit.alteration.core.engine;

import fdit.alteration.core.basestation.engine.BaseStationAlterationMessageVisitor;
import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.basestation.message.parameter.AltitudeParameter;
import fdit.alteration.core.basestation.message.parameter.LatitudeParameter;
import fdit.alteration.core.basestation.message.parameter.LongitudeParameter;
import fdit.alteration.core.beast.message.AdsbVelocityMessage;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.Parameter;
import fdit.alteration.core.incident.WayPoint;
import gov.nasa.worldwind.geom.Angle;
import gov.nasa.worldwind.geom.LatLon;

import java.util.Collection;
import java.util.Optional;
import java.util.Random;

import static fdit.alteration.core.incident.Parameter.*;
import static gov.nasa.worldwind.geom.LatLon.*;
import static java.lang.Boolean.TRUE;
import static java.lang.Double.parseDouble;
import static java.lang.Integer.parseInt;
import static java.lang.Integer.toHexString;
import static java.lang.Math.*;
import static java.lang.String.valueOf;
import static java.util.Optional.empty;
import static java.util.Optional.of;

public class AlterationUtils {

    public static final Random RANDOM = new Random();
    private static final double EARTH_RADIUS_METER = 6378100.0;
    private static final double NAUTICAL_MILE_METER = 1852.0;
    private static final double MPS_TO_KNOTS = (3600.0 / NAUTICAL_MILE_METER);

    private AlterationUtils() {
    }

    public static void alterMessage(final Action action, final Message message) {
        for (final Parameter parameter : action.getParameters().getParameterList()) {
            new BaseStationAlterationMessageVisitor(parameter).accept(message);
        }
    }

    public static String getIcaoRandomOffset(final String initialIcao, final int range) {
        final int offset = RANDOM.nextInt(range * 2) - range;
        return toHexString(parseInt(initialIcao, 16) + offset).toUpperCase();
    }

    public static AircraftTrajectory createTrajectory(final long firstDate, final Action action) {
        final AircraftTrajectory trajectory = new AircraftTrajectory();
        for (final WayPoint wayPoint : action.getParameters().getTrajectory().getWayPoints()) {
            trajectory.addAltitude(wayPoint.getAltitude().getContent(), (double) firstDate + wayPoint.getTime());
            trajectory.addLatitude(wayPoint.getVertex().getLat().getContent(), (double) firstDate + wayPoint.getTime());
            trajectory.addLongitude(wayPoint.getVertex().getLon().getContent(), (double) firstDate + wayPoint.getTime());
        }
        trajectory.interpolate();
        return trajectory;
    }

    public static double generateRandomAngle() {
        return 360 * RANDOM.nextDouble();
    }

    public static double generateRandomDistanceCoeff() {
        return 2.0 * RANDOM.nextDouble();
    }

    public static LatLon rotateCoordinates(final LatLon start,
                                           final LatLon toRotate,
                                           final double angle) {
        final Angle pathLength = greatCircleDistance(start, toRotate);
        final double clockWiseAngle = angle + computeRotation(start, toRotate);
        return greatCircleEndPosition(start, Angle.fromDegrees(clockWiseAngle), pathLength);
    }

    public static double computeRotation(double latitudeBefore,
                                         double longitudeBefore,
                                         double latitudeAfter,
                                         double longitudeAfter) {
        return computeRotation(
                LatLon.fromDegrees(latitudeBefore, longitudeBefore),
                LatLon.fromDegrees(latitudeAfter, longitudeAfter));
    }

    public static double computeRotation(final LatLon before,
                                         final LatLon after) {
        final Angle angle = greatCircleAzimuth(before, after);
        if (angle.degrees < 0) {
            return angle.degrees + 360;
        }
        return angle.degrees;
    }

    public static double computeSpeed(final double latitudeBefore,
                                      final double longitudeBefore,
                                      final double latitudeAfter,
                                      final double longitudeAfter,
                                      final long time) {
        final double distance = distanceMeters(latitudeBefore, longitudeBefore, latitudeAfter, longitudeAfter);
        double speedMps = distance / (time / 1000.0);
        return speedMps * MPS_TO_KNOTS;
    }

    public static int computeVerticalRate(final double altitudeBefore,
                                          final double altitudeAfter,
                                          final double timeMillis) {
        final double timeSeconds = timeMillis / 1000;
        final double altitudeDiff = altitudeAfter - altitudeBefore;
        final int newValue = (int) ((altitudeDiff / timeSeconds) * 60);
        return (int) (64 * round(newValue / 64.0));
    }

    public static double distanceMeters(double latitudeFrom,
                                        double longitudeFrom,
                                        double latitudeTo,
                                        double longitudeTo) {
        return distanceMeters(fromDegrees(latitudeFrom, longitudeFrom), fromDegrees(latitudeTo, longitudeTo));
    }

    public static double distanceMeters(final LatLon from,
                                        final LatLon to) {
        return greatCircleDistance(from, to).radians * EARTH_RADIUS_METER;
    }

    public static void alterTrack(final AdsbVelocityMessage message, final Parameter parameter) {
        int dirWest = message.getData().isDirection_west() ? -1 : 1;
        int dirSouth = message.getData().isDirection_south() ? -1 : 1;

        double vEW = (message.getData().getEast_west_velocity() - 1) * (double) dirWest;
        double vNS = (message.getData().getNorth_south_velocity() - 1) * (double) dirSouth;

        final double ground_speed = sqrt(pow(vEW, 2) + pow(vNS, 2));
        final double track_altered = parseDouble(parameter.getValue());
        final boolean dirWest_altered = 0 <= track_altered && track_altered < 180;
        final boolean dirSouth_altered = 90 <= track_altered && track_altered < 270;
        dirWest = dirWest_altered ? -1 : 1;
        dirSouth = dirSouth_altered ? -1 : 1;
        double vEW_altered = round((ground_speed * sin(toRadians(track_altered)) * dirWest) + 1);
        double vNS_altered = round((ground_speed * cos(toRadians(track_altered)) * dirSouth) + 1);


        message.getData().setDirection_west(dirWest_altered);
        message.getData().setDirection_south(dirSouth_altered);
        message.getData().setNorth_south_velocity((int) (vNS_altered));
        message.getData().setEast_west_velocity((int) (vEW_altered));
    }

    public static void alterGroundSpeed(final AdsbVelocityMessage message, final Parameter parameter) {
        // TODO: supersonic case?
        final int dirWest = message.getData().isDirection_west() ? -1 : 1;
        final int dirSouth = message.getData().isDirection_south() ? -1 : 1;

        double vEW = (message.getData().getEast_west_velocity() - 1) * (double) dirWest;
        double vNS = (message.getData().getNorth_south_velocity() - 1) * (double) dirSouth;
        double heading = atan2(vEW, vNS) * (360 / (2 * PI));

        if (heading < 0) {
            heading += 360;
        }

        final double ground_speed_altered = parseDouble(parameter.getValue());
        double vEW_altered = round((ground_speed_altered * sin(toRadians(heading)) * dirWest) + 1);
        double vNS_altered = round((ground_speed_altered * cos(toRadians(heading)) * dirSouth) + 1);

        message.getData().setNorth_south_velocity((int) (vNS_altered));
        message.getData().setEast_west_velocity((int) (vEW_altered));
    }

    public static double computeNewValue(final double actualValue, double newValue, String mode) {
        return computeNewValue(actualValue, newValue, mode, 1);
    }

    public static double computeNewValue(final double actualValue, double newValue, String mode, int step) {
        return new Parameter.ModeSwitch<Double>() {

            @Override
            public Double visitNoise() {
                double randomValue = newValue * RANDOM.nextDouble();
                return actualValue * randomValue;
            }

            @Override
            public Double visitDrift() {
                return actualValue + newValue * step;
            }

            @Override
            public Double visitOffset() {
                return newValue + actualValue;
            }

            @Override
            public Double visitSimple() {
                return newValue;
            }
        }.doSwitch(mode);
    }

    public static void addMaskToMessage(final StringBuilder newMessage, final Message message) {
        newMessage.append(",").append(renderBooleanToFlag(message.getMask() > 0)).append(",").append(message.getMask());
    }

    public static String renderBooleanToFlag(final boolean b) {
        return b ? "1" : "0";
    }

    public static Optional<LatLon> getPosition(BaseStationMessage message) {
        if (message instanceof LatitudeParameter && message instanceof LongitudeParameter &&
                ((LatitudeParameter) message).getLatitude().isPresent() &&
                ((LongitudeParameter) message).getLongitude().isPresent()) {
            return of(fromDegrees(
                    ((LatitudeParameter) message).getLatitude().get(),
                    ((LongitudeParameter) message).getLongitude().get()));
        }
        return empty();
    }

    public static Optional<Integer> getAltitude(BaseStationMessage message) {
        if (message instanceof AltitudeParameter && ((AltitudeParameter) message).getAltitude().isPresent()) {
            return ((AltitudeParameter) message).getAltitude();
        }
        return empty();
    }

    public static LatLon computeDelta(final LatLon from, final LatLon to) {
        return fromDegrees(
                to.getLatitude().getDegrees() - from.getLatitude().getDegrees(),
                to.getLongitude().getDegrees() - from.getLongitude().getDegrees());
    }

    public static int computeCharacteristicMask(final Collection<String> characteristics) {

        String mask =
                valueOf(characteristics.contains(CHARAC_ICAO) || characteristics.contains(CHARAC_HEX_IDENT) ? 1 : 0) +
                        (characteristics.contains(CHARAC_CALLSIGN) ? 1 : 0) +
                        (characteristics.contains(CHARAC_SQUAWK) ? 1 : 0) +
                        (characteristics.contains(CHARAC_ALTITUDE) ? 1 : 0) +
                        (characteristics.contains(CHARAC_GROUNDSPEED) ? 1 : 0) +
                        (characteristics.contains(CHARAC_TRACK) ? 1 : 0) +
                        (characteristics.contains(CHARAC_LATITUDE) ? 1 : 0) +
                        (characteristics.contains(CHARAC_LONGITUDE) ? 1 : 0) +
                        (characteristics.contains(CHARAC_VERTICALRATE) ? 1 : 0) +
                        (characteristics.contains(CHARAC_ALERT) ? 1 : 0) +
                        (characteristics.contains(CHARAC_TIMESTAMP) ? 1 : 0) +
                        (characteristics.contains(CHARAC_EMERGENCY) ? 1 : 0) +
                        (characteristics.contains(CHARAC_SPI) ? 1 : 0) +
                        (characteristics.contains(CHARAC_ISONGROUND) ? 1 : 0);
        return parseInt(mask, 2);
    }

    public static void addAltitudeToTrajectory(final AircraftTrajectory newTrajectory,
                                               final AircraftTrajectory referenceTrajectory,
                                               final WayPoint wayPoint,
                                               final long recordingFirstDate) {
        final long wayPointTimestamp = wayPoint.getTime() + recordingFirstDate;
        if (TRUE.equals(wayPoint.isTimedAltitude())) {
            final long referenceDate = wayPoint.getAltitudeValue() + recordingFirstDate;
            referenceTrajectory.getAltitude(referenceDate).ifPresent(altitude ->
                    newTrajectory.addAltitude(altitude, wayPointTimestamp));
        } else if (TRUE.equals(wayPoint.isAltitudeOffset())) {
            referenceTrajectory.getAltitude(wayPointTimestamp).ifPresent(altitude ->
                    newTrajectory.addAltitude(wayPoint.getAltitudeValue() + altitude * 1.0, wayPointTimestamp));
        } else {
            newTrajectory.addAltitude(wayPoint.getAltitudeValue(), wayPointTimestamp);
        }
    }

    public static void addLatitudeToTrajectory(final AircraftTrajectory newTrajectory,
                                               final AircraftTrajectory referenceTrajectory,
                                               final WayPoint wayPoint,
                                               final long recordingFirstDate) {
        final long wayPointTimestamp = wayPoint.getTime() + recordingFirstDate;
        if (TRUE.equals(wayPoint.isTimedPosition())) {
            final long referenceDate = wayPoint.getVertex().getTime() + recordingFirstDate;
            referenceTrajectory.getLatitude(referenceDate).ifPresent(latitude ->
                    newTrajectory.addLatitude(latitude, wayPointTimestamp));
        } else if (TRUE.equals(wayPoint.getVertex().isLatOffset())) {
            referenceTrajectory.getLatitude(wayPointTimestamp).ifPresent(latitude ->
                    newTrajectory.addLatitude(wayPoint.getVertex().getLatValue() + latitude, wayPointTimestamp));
        } else {
            newTrajectory.addLatitude(wayPoint.getVertex().getLatValue(), wayPointTimestamp);
        }
    }

    public static void addLongitudeToTrajectory(final AircraftTrajectory newTrajectory,
                                                final AircraftTrajectory referenceTrajectory,
                                                final WayPoint wayPoint,
                                                final long recordingFirstDate) {
        final long wayPointTimestamp = wayPoint.getTime() + recordingFirstDate;
        if (TRUE.equals(wayPoint.isTimedPosition())) {
            final long referenceDate = wayPoint.getVertex().getTime() + recordingFirstDate;
            referenceTrajectory.getLongitude(referenceDate).ifPresent(longitude ->
                    newTrajectory.addLongitude(longitude, wayPointTimestamp));
        } else if (TRUE.equals(wayPoint.getVertex().isLatOffset())) {
            referenceTrajectory.getLongitude(wayPointTimestamp).ifPresent(longitude ->
                    newTrajectory.addLongitude(wayPoint.getVertex().getLonValue() + longitude, wayPointTimestamp));
        } else {
            newTrajectory.addLongitude(wayPoint.getVertex().getLonValue(), wayPointTimestamp);
        }
    }
}