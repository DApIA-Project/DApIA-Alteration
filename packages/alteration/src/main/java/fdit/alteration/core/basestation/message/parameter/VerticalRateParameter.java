package fdit.alteration.core.basestation.message.parameter;

import java.util.Optional;

public interface VerticalRateParameter {

    Optional<Integer> getVerticalRate();

    void setVerticalRate(final int verticalRate);
}