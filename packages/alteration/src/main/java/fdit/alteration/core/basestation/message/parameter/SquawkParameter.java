package fdit.alteration.core.basestation.message.parameter;

import java.util.Optional;

public interface SquawkParameter {

    Optional<Integer> getSquawk();

    void setSquawk(final int squawk);
}
