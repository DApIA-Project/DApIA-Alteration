package fdit.alteration.core.basestation;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.basestation.message.BaseStationMessageFull;
import fdit.alteration.core.engine.Message;
import fdit.tools.predicate.PredicateUtils;

import java.util.function.Consumer;
import java.util.function.Predicate;

public class BstHelper {

    public static BaseStationMessage timestampedBstMessage(final long relativeDate) {
        return new BaseStationMessage(1, 0, 0, "", 0, relativeDate, relativeDate, 0) {

            @Override
            public BaseStationMessage copy() {
                return null;
            }
        };
    }

    @SafeVarargs
    public static BaseStationMessageFull bstMessageFull(final String icao,
                                                        final long date,
                                                        final Consumer<BaseStationMessageFull>... consumers) {
        final BaseStationMessageFull message = new BaseStationMessageFull(
                0,
                0,
                0,
                icao,
                0,
                date,
                date,
                "",
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null);
        for (final Consumer<BaseStationMessageFull> consumer : consumers) {
            consumer.accept(message);
        }
        return message;
    }

    public static Consumer<BaseStationMessageFull> altitude(final int altitude) {
        return bstMessageFull -> bstMessageFull.setAltitude(altitude);
    }

    public static Consumer<BaseStationMessageFull> callsign(final String callsign) {
        return bstMessageFull -> bstMessageFull.setCallsign(callsign);
    }

    public static Consumer<BaseStationMessageFull> groundSpeed(final double groundSpeed) {
        return bstMessageFull -> bstMessageFull.setGroundSpeed(groundSpeed);
    }

    public static Consumer<BaseStationMessageFull> track(final double track) {
        return bstMessageFull -> bstMessageFull.setTrack(track);
    }

    public static Consumer<BaseStationMessageFull> latitude(final double latitude) {
        return bstMessageFull -> bstMessageFull.setLatitude(latitude);
    }

    public static Consumer<BaseStationMessageFull> longitude(final double longitude) {
        return bstMessageFull -> bstMessageFull.setLongitude(longitude);
    }

    public static Consumer<BaseStationMessageFull> verticalRate(final int verticalRate) {
        return bstMessageFull -> bstMessageFull.setVerticalRate(verticalRate);
    }

    public static Consumer<BaseStationMessageFull> squawk(final int squawk) {
        return bstMessageFull -> bstMessageFull.setSquawk(squawk);
    }

    public static Consumer<BaseStationMessageFull> alert(final boolean alert) {
        return bstMessageFull -> bstMessageFull.setAlert(alert);
    }

    public static Consumer<BaseStationMessageFull> emergency(final boolean emergency) {
        return bstMessageFull -> bstMessageFull.setEmergency(emergency);
    }

    public static Consumer<BaseStationMessageFull> spi(final boolean spi) {
        return bstMessageFull -> bstMessageFull.setSpi(spi);
    }

    public static Consumer<BaseStationMessageFull> onGround(final boolean onGround) {
        return bstMessageFull -> bstMessageFull.setOnGround(onGround);
    }


    @SafeVarargs
    private static Predicate<Message> aBstMessage(final int transmissionType,
                                                  final Predicate<BaseStationMessage>... predicates) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessage) {
                final BaseStationMessage message = (BaseStationMessage) bstMessage;
                if (message.getTransmissionType() != transmissionType) {
                    System.err.println("Expected type: " + transmissionType + ". Got: " + message.getTransmissionType());
                    return false;
                }
                for (final Predicate<BaseStationMessage> predicate : predicates) {
                    if (!predicate.test(message)) {
                        return false;
                    }
                }
                return true;
            } else {
                System.err.println("Bad instance (expect BaseStationMessage)");
                return false;
            }
        };
    }

    @SafeVarargs
    public static Predicate<Message> aBstMessageFull(final Predicate<BaseStationMessage>... predicates) {
        return PredicateUtils.and(message -> {
            if (message instanceof BaseStationMessageFull) {
                return true;
            } else {
                System.err.println("Bad instance (expect BaseStationMessageFull)");
                return false;
            }
        }, aBstMessage(0, predicates));
    }

    @SafeVarargs
    public static Predicate<Message> aBstMessage1(final Predicate<BaseStationMessage>... predicates) {
        return aBstMessage(1, predicates);
    }

    @SafeVarargs
    public static Predicate<Message> aBstMessage2(final Predicate<BaseStationMessage>... predicates) {
        return aBstMessage(2, predicates);
    }

    @SafeVarargs
    public static Predicate<Message> aBstMessage3(final Predicate<BaseStationMessage>... predicates) {
        return aBstMessage(3, predicates);
    }

    @SafeVarargs
    public static Predicate<Message> aBstMessage4(final Predicate<BaseStationMessage>... predicates) {
        return aBstMessage(4, predicates);
    }

    @SafeVarargs
    public static Predicate<Message> aBstMessage5(final Predicate<BaseStationMessage>... predicates) {
        return aBstMessage(5, predicates);
    }

    @SafeVarargs
    public static Predicate<Message> aBstMessage6(final Predicate<BaseStationMessage>... predicates) {
        return aBstMessage(6, predicates);
    }

    @SafeVarargs
    public static Predicate<Message> aBstMessage7(final Predicate<BaseStationMessage>... predicates) {
        return aBstMessage(7, predicates);
    }

    @SafeVarargs
    public static Predicate<Message> aBstMessage8(final Predicate<BaseStationMessage>... predicates) {
        return aBstMessage(8, predicates);
    }

    public static Predicate<BaseStationMessage> withIcao(final String icao) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                if (bstMessage.getIcao().compareTo(icao) != 0) {
                    System.err.println("Expected ICAO: " + icao + ". Got: " + bstMessage.getIcao());
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withDate(final long date) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                if (bstMessage.getTimestampGenerated() != date) {
                    System.err.println("Expected date: " + date + ". Got: " + bstMessage.getTimestampGenerated());
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withCallsign(final String callsign) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.getCallsign().isPresent() && message.getCallsign().get().compareTo(callsign) == 0)) {
                    System.err.println("Expected callsign: " + callsign +
                            ". Got: " + (message.getCallsign().isPresent() ? message.getCallsign().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withAltitude(final int altitude) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.getAltitude().isPresent() && message.getAltitude().get() == altitude)) {
                    System.err.println("Expected altitude: " + altitude +
                            ". Got: " + (message.getAltitude().isPresent() ? message.getAltitude().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withGroundSpeed(final double groundSpeed) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.getGroundSpeed().isPresent() && message.getGroundSpeed().get() == groundSpeed)) {
                    System.err.println("Expected ground speed: " + groundSpeed +
                            ". Got: " + (message.getGroundSpeed().isPresent() ? message.getGroundSpeed().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withTrack(final double track) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.getTrack().isPresent() && message.getTrack().get() == track)) {
                    System.err.println("Expected track: " + track +
                            ". Got: " + (message.getTrack().isPresent() ? message.getTrack().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withLatitude(final double latitude) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.getLatitude().isPresent() && message.getLatitude().get() == latitude)) {
                    System.err.println("Expected latitude: " + latitude +
                            ". Got: " + (message.getLatitude().isPresent() ? message.getLatitude().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withLongitude(final double longitude) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.getLongitude().isPresent() && message.getLongitude().get() == longitude)) {
                    System.err.println("Expected longitude: " + longitude +
                            ". Got: " + (message.getLongitude().isPresent() ? message.getLongitude().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withVerticalRate(final double verticalRate) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.getVerticalRate().isPresent() && message.getVerticalRate().get() == verticalRate)) {
                    System.err.println("Expected vertical rate: " + verticalRate +
                            ". Got: " + (message.getVerticalRate().isPresent() ? message.getVerticalRate().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withSquawk(final double squawk) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.getSquawk().isPresent() && message.getSquawk().get() == squawk)) {
                    System.err.println("Expected squawk: " + squawk +
                            ". Got: " + (message.getSquawk().isPresent() ? message.getSquawk().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withAlert(final boolean alert) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.isAlert().isPresent() && message.isAlert().get() == alert)) {
                    System.err.println("Expected alert: " + alert +
                            ". Got: " + (message.isAlert().isPresent() ? message.isAlert().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withEmergency(final boolean emergency) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.isEmergency().isPresent() && message.isEmergency().get() == emergency)) {
                    System.err.println("Expected emergency: " + emergency +
                            ". Got: " + (message.isEmergency().isPresent() ? message.isEmergency().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withSpi(final boolean spi) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.isSpi().isPresent() && message.isSpi().get() == spi)) {
                    System.err.println("Expected SPI: " + spi +
                            ". Got: " + (message.isSpi().isPresent() ? message.isSpi().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }

    public static Predicate<BaseStationMessage> withOnGround(final boolean isOnGround) {
        return bstMessage -> {
            if (bstMessage instanceof BaseStationMessageFull) {
                final BaseStationMessageFull message = (BaseStationMessageFull) bstMessage;
                if (!(message.isOnGround().isPresent() && message.isOnGround().get() == isOnGround)) {
                    System.err.println("Expected on ground: " + isOnGround +
                            ". Got: " + (message.isOnGround().isPresent() ? message.isOnGround().get() : "Empty."));
                    return false;
                }
                return true;
            }
            System.err.println("Bad instance");
            return false;
        };
    }
}