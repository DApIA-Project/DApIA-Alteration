package fdit.alteration.core.basestation.engine;

import fdit.alteration.core.engine.GhostAircraft;

import java.util.function.Predicate;

import static java.lang.Integer.parseInt;

public class GhostAircraftHelper {

    @SafeVarargs
    public static Predicate<GhostAircraft> aGhostAircraft(final Predicate<GhostAircraft>... predicates) {
        return ghostAircraft -> {
            for (final Predicate<GhostAircraft> predicate : predicates) {
                if (!predicate.test(ghostAircraft)) {
                    return false;
                }
            }
            return true;
        };
    }

    public static Predicate<GhostAircraft> withIcaoDerivedFrom(final String icao) {
        return ghostAircraft -> {
            final int expected = parseInt(icao, 16);
            final int actual = parseInt(ghostAircraft.getIcao(), 16);
            if (expected - actual > 1000 || expected - actual < -1000) {
                System.err.println("ICAO: " + ghostAircraft.getIcao() + ". Too far from:" + icao);
                return false;
            }
            return true;
        };
    }

    public static Predicate<GhostAircraft> withFirstAppearance(final long timestamp) {
        return ghostAircraft -> {
            if (timestamp != ghostAircraft.getFirstAppearance()) {
                System.err.println("First appearance - Expected: " + timestamp + ". Got:" + ghostAircraft.getFirstAppearance());
                return false;
            }
            return true;
        };
    }

    public static Predicate<GhostAircraft> withValidAngle() {
        return ghostAircraft -> {
            if (ghostAircraft.getAngle() < 0.0 || ghostAircraft.getAngle() > 360.0) {
                System.err.println("Angle:" + ghostAircraft.getAngle() + " is not valid.");
                return false;
            }
            return true;
        };
    }

    public static Predicate<GhostAircraft> withValidDistanceCoeff() {
        return ghostAircraft -> {
            if (ghostAircraft.getDistanceCoeff() < 0.0 || ghostAircraft.getDistanceCoeff() > 2.0) {
                System.err.println("Distance coefficient:" + ghostAircraft.getDistanceCoeff() + " is not valid.");
                return false;
            }
            return true;
        };
    }
}