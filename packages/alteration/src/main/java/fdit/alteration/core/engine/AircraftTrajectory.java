package fdit.alteration.core.engine;

import org.apache.commons.math3.analysis.interpolation.AkimaSplineInterpolator;
import org.apache.commons.math3.analysis.polynomials.PolynomialSplineFunction;

import java.util.Collection;
import java.util.Optional;
import java.util.SortedMap;

import static com.google.common.collect.Maps.newTreeMap;
import static fdit.alteration.core.engine.AlterationUtils.*;
import static java.lang.Math.round;
import static java.util.Optional.empty;
import static java.util.Optional.of;

public class AircraftTrajectory {

    private final SortedMap<Double, Double> latitudes = newTreeMap();
    private final SortedMap<Double, Double> longitudes = newTreeMap();
    private final SortedMap<Double, Double> altitudes = newTreeMap();
    private PolynomialSplineFunction latitudeFunction;
    private PolynomialSplineFunction longitudeFunction;
    private PolynomialSplineFunction altitudeFunction;

    private static double[] convertDoubles(final Collection<Double> doubles) {
        double[] result = new double[doubles.size()];
        int i = 0;
        for (final Double value : doubles) {
            result[i] = value;
            i++;
        }
        return result;
    }

    private static double applyNoise(final double value) {
        final double ratio = (RANDOM.nextDouble() - 0.5) / 50000;
        return value + value * ratio;
    }

    public void interpolate() {
        final AkimaSplineInterpolator interpolator = new AkimaSplineInterpolator();
        if (latitudes.size() >= 5) {
            latitudeFunction = interpolator.interpolate(
                    convertDoubles(latitudes.keySet()),
                    convertDoubles(latitudes.values()));
        }
        if (longitudes.size() >= 5) {
            longitudeFunction = interpolator.interpolate(
                    convertDoubles(longitudes.keySet()),
                    convertDoubles(longitudes.values()));
        }
        if (altitudes.size() >= 5) {
            altitudeFunction = interpolator.interpolate(
                    convertDoubles(altitudes.keySet()),
                    convertDoubles(altitudes.values()));
        }
    }

    public void addLatitude(final double latitude,
                            final double time) {
        latitudes.put(time, latitude);
    }

    public void addLongitude(final double longitude,
                             final double time) {
        longitudes.put(time, longitude);
    }

    public void addAltitude(final double altitude,
                            final double time) {
        altitudes.put(time, altitude);
    }

    public SortedMap<Double, Double> getLatitudes() {
        return latitudes;
    }

    public SortedMap<Double, Double> getLongitudes() {
        return longitudes;
    }

    public SortedMap<Double, Double> getAltitudes() {
        return altitudes;
    }

    public Optional<Double> getLatitudeWithNoise(final long time) {
        try {
            return of(applyNoise(latitudeFunction.value(time)));
        } catch (final Exception ignored) {
            return empty();
        }
    }

    public Optional<Double> getLatitude(final long time) {
        try {
            return of(latitudeFunction.value(time));
        } catch (final Exception ignored) {
            return empty();
        }
    }

    public Optional<Double> getLatitude(final long time, final boolean noise) {
        if (noise) {
            return getLatitudeWithNoise(time);
        }
        return getLatitude(time);
    }

    public Optional<Double> getLongitudeWithNoise(final long time) {
        try {
            return of(applyNoise(longitudeFunction.value(time)));
        } catch (final Exception ignored) {
            return empty();
        }
    }

    public Optional<Double> getLongitude(final long time) {
        try {
            return of(longitudeFunction.value(time));
        } catch (final Exception ignored) {
            return empty();
        }
    }

    public Optional<Double> getLongitude(final long time, final boolean noise) {
        if (noise) {
            return getLongitudeWithNoise(time);
        }
        return getLongitude(time);
    }

    public Optional<Integer> getAltitude(final long time) {
        try {
            return of((int) (25 * round(altitudeFunction.value(time) / 25)));
        } catch (final Exception ignored) {
            return empty();
        }
    }

    public Optional<Double> getTrack(final long timestamp) {
        final long duration = 500;
        final Optional<Double> latitudeBefore = getLatitude(timestamp - duration);
        final Optional<Double> latitudeAfter = getLatitude(timestamp + duration);
        final Optional<Double> longitudeBefore = getLongitude(timestamp - duration);
        final Optional<Double> longitudeAfter = getLongitude(timestamp + duration);
        if (latitudeBefore.isPresent() && latitudeAfter.isPresent() &&
                longitudeBefore.isPresent() && longitudeAfter.isPresent()) {
            return of(computeRotation(
                    latitudeBefore.get(),
                    longitudeBefore.get(),
                    latitudeAfter.get(),
                    longitudeAfter.get()));
        }
        return empty();
    }

    public Optional<Double> getGroundSpeed(final long timestamp) {
        final long duration = 500;
        final Optional<Double> latitudeBefore = getLatitude(timestamp - duration);
        final Optional<Double> latitudeAfter = getLatitude(timestamp + duration);
        final Optional<Double> longitudeBefore = getLongitude(timestamp - duration);
        final Optional<Double> longitudeAfter = getLongitude(timestamp + duration);
        if (latitudeBefore.isPresent() && latitudeAfter.isPresent() &&
                longitudeBefore.isPresent() && longitudeAfter.isPresent()) {
            return of(computeSpeed(
                    latitudeBefore.get(),
                    longitudeBefore.get(),
                    latitudeAfter.get(),
                    longitudeAfter.get(),
                    duration * 2));
        }
        return empty();
    }

    public Optional<Integer> getVerticalRate(final long timestamp) {
        final long duration = 30000;
        final Optional<Integer> altitudeBefore = getAltitude(timestamp - duration);
        final Optional<Integer> altitudeAfter = getAltitude(timestamp + duration);
        if (altitudeBefore.isPresent() && altitudeAfter.isPresent()) {
            return of(computeVerticalRate(
                    altitudeBefore.get(),
                    altitudeAfter.get(),
                    duration * 2.0));
        }
        return empty();
    }

    public PolynomialSplineFunction getLatitudeFunction() {
        return latitudeFunction;
    }

    public PolynomialSplineFunction getLongitudeFunction() {
        return longitudeFunction;
    }

    public PolynomialSplineFunction getAltitudeFunction() {
        return altitudeFunction;
    }
}