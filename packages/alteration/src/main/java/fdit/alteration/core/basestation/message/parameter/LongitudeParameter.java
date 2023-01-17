package fdit.alteration.core.basestation.message.parameter;

import java.util.Optional;

public interface LongitudeParameter {

    Optional<Double> getLongitude();

    void setLongitude(final double longitude);
}