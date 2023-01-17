package fdit.alteration.core.beast;

import com.google.gson.Gson;
import fdit.alteration.core.beast.message.*;
import fdit.alteration.core.beast.message.BeastMessageType.BeastMessageTypeSwitch;
import fdit.alteration.core.engine.Message;

import java.util.Optional;

import static java.util.Optional.empty;
import static java.util.Optional.of;

public class BeastDeserializer implements BeastMessageTypeSwitch<BeastMessage> {

    private final Gson deserializer;

    public BeastDeserializer(final Gson deserializer) {
        this.deserializer = deserializer;
    }

    public Optional<Message> deserialize(final String message) {
        try {
            return of(doSwitch(message));
        } catch (final Exception ignored) {
            return empty();
        }
    }

    @Override
    public BeastMessage visitAltitudeReply(final String message) {
        return deserializer.fromJson(message, AltitudeReplyMessage.class);
    }

    @Override
    public BeastMessage visitAdsbAirbornPosition(final String message) {
        return deserializer.fromJson(message, AdsbAirbornePositionMessage.class);
    }

    @Override
    public BeastMessage visitAdsbEmergency(final String message) {
        return deserializer.fromJson(message, AdsbEmergencyMessage.class);
    }

    @Override
    public BeastMessage visitAdsbIdentification(final String message) {
        return deserializer.fromJson(message, AdsbIdentificationMessage.class);
    }

    @Override
    public BeastMessage visitAdsbStatus(final String message) {
        return deserializer.fromJson(message, AdsbStatusMessage.class);
    }

    @Override
    public BeastMessage visitAdsbVelocity(final String message) {
        return deserializer.fromJson(message, AdsbVelocityMessage.class);
    }

    @Override
    public BeastMessage visitAllCallReply(final String message) {
        return deserializer.fromJson(message, AllCallReplyMessage.class);
    }

    @Override
    public BeastMessage visitCommBAltitudeReply(final String message) {
        return deserializer.fromJson(message, CommBAltitudeReplyMessage.class);
    }

    @Override
    public BeastMessage visitCommBIdentifyReply(final String message) {
        return deserializer.fromJson(message, CommBIdentifyReplyMessage.class);
    }

    @Override
    public BeastMessage visitExtendedSquitter(final String message) {
        return deserializer.fromJson(message, ExtendedSquitterMessage.class);
    }

    @Override
    public BeastMessage visitIdentifyReply(final String message) {
        return deserializer.fromJson(message, IdentifyReplyMessage.class);
    }

    @Override
    public BeastMessage visitLongAcas(final String message) {
        return deserializer.fromJson(message, LongAcasMessage.class);
    }

    @Override
    public BeastMessage visitShortAcas(final String message) {
        return deserializer.fromJson(message, ShortAcasMessage.class);
    }

    @Override
    public BeastMessage visitModeSReply(final String message) {
        return deserializer.fromJson(message, ModeSReplyMessage.class);
    }
}