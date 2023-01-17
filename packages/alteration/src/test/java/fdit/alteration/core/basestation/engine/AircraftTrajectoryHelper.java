package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.engine.AircraftTrajectory;

import java.util.function.Consumer;

public class AircraftTrajectoryHelper {

    public static AircraftTrajectory aircraftTrajectory(final Consumer<AircraftTrajectory> wayPointsConsumers) {
        final AircraftTrajectory trajectory = new AircraftTrajectory();
        wayPointsConsumers.accept(trajectory);
        return trajectory;
    }

    @SafeVarargs
    public static Consumer<AircraftTrajectory> withWayPoints(final Consumer<AircraftTrajectory>... consumers) {
        return trajectory -> {
            for (final Consumer<AircraftTrajectory> consumer : consumers) {
                consumer.accept(trajectory);
            }
        };
    }

    public static Consumer<AircraftTrajectory> wayPoint(final double latitude,
                                                        final double longitude,
                                                        final int altitude,
                                                        final long time) {
        return trajectory -> {
            trajectory.addLatitude(latitude, time);
            trajectory.addLongitude(longitude, time);
            trajectory.addAltitude(altitude, time);
        };
    }
}