package fdit.alteration.core.basestation.message.parameter;

import java.util.Optional;

public interface SpiParameter {

    Optional<Boolean> isSpi();

    void setSpi(final boolean spi);
}