package fdit.alteration.core.basestation.message.parameter;

import java.util.Optional;

public interface GroundSpeedParameter {

    Optional<Double> getGroundSpeed();

    void setGroundSpeed(final double groundSpeed);
}
