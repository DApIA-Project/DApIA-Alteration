package fdit.alteration.core.basestation.message.parameter;

import java.util.Optional;

public interface OnGroundParameter {

    Optional<Boolean> isOnGround();

    void setOnGround(final boolean onGround);
}