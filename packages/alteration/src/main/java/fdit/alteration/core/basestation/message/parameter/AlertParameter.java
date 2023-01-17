package fdit.alteration.core.basestation.message.parameter;

import java.util.Optional;

public interface AlertParameter {

    Optional<Boolean> isAlert();

    void setAlert(final boolean alert);
}