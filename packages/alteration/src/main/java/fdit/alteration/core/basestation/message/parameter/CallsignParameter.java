package fdit.alteration.core.basestation.message.parameter;

import java.util.Optional;

public interface CallsignParameter {

    Optional<String> getCallsign();

    void setCallsign(final String callsign);
}