package fdit.alteration.core.basestation.message.parameter;

import java.util.Optional;

public interface TrackParameter {

    Optional<Double> getTrack();

    void setTrack(final double track);
}