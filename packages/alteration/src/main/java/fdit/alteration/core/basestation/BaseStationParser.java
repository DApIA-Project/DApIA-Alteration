package fdit.alteration.core.basestation;

import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import fdit.alteration.core.basestation.message.BaseStationMessage.BstMessageTypeSwitch;
import fdit.alteration.core.basestation.message.BaseStationMessageFull;
import fdit.alteration.core.engine.Message;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.Callable;

import static java.lang.Double.parseDouble;
import static java.lang.Integer.parseInt;
import static java.util.Arrays.copyOf;
import static java.util.Optional.empty;
import static java.util.Optional.of;
import static java.util.TimeZone.getTimeZone;

public class BaseStationParser {

    public static final String BST_DATE_PATTERN = "yyyy/MM/dd,HH:mm:ss.SSS";
    private static final String SPLIT_PATTERN = ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)";
    private static final String SPLIT_JSON_PATTERN = ",\\{";

    private BaseStationParser() {
    }

    public static Optional<Message> createBstMessage(final String line) {
        /* Separation du message de base et de l'objet json **/
        String[] parts = line.split(SPLIT_JSON_PATTERN);
        final boolean extraFieldsArePresent = parts.length > 1;

        /* Separation des valeurs du message **/
        String[] fields = parts[0].split(SPLIT_PATTERN);

        /* Regroupement des valeurs et de l'objet json **/
        final String[] fieldsWithElement = copyOf(fields, extraFieldsArePresent ? fields.length + 1 : fields.length);
        if (extraFieldsArePresent) fieldsWithElement[fieldsWithElement.length - 1] = '{' + parts[1];

        try {
            final int bstType = extractBstType(fieldsWithElement);
            final int sessionID = extractSessionID(fieldsWithElement);
            final int aircraftID = extractAircraftID(fieldsWithElement);
            final String icao = extractIcao(fieldsWithElement);
            final int flightID = extractFlightID(fieldsWithElement);
            final long timestampGenerated = extractTimestampGenerated(fieldsWithElement);
            final long timestampLogged = extractTimestampLogged(fieldsWithElement);

            return new BstMessageTypeSwitch<Optional<Message>>() {

                @Override
                public Optional<Message> visitBstMessageFull() {
                    return of(new BaseStationMessageFull(
                            bstType,
                            sessionID,
                            aircraftID,
                            icao,
                            flightID,
                            timestampGenerated,
                            timestampLogged,
                            nullableString(() -> extractCallSign(fieldsWithElement)),
                            nullableInteger(() -> extractAltitude(fieldsWithElement)),
                            nullableDouble(() -> extractGroundSpeed(fieldsWithElement)),
                            nullableDouble(() -> extractTrack(fieldsWithElement)),
                            nullableDouble(() -> extractLatitude(fieldsWithElement)),
                            nullableDouble(() -> extractLongitude(fieldsWithElement)),
                            nullableInteger(() -> extractVerticalRate(fieldsWithElement)),
                            nullableInteger(() -> extractSquawk(fieldsWithElement)),
                            nullableBoolean(() -> extractAlert(fieldsWithElement)),
                            nullableBoolean(() -> extractEmergency(fieldsWithElement)),
                            nullableBoolean(() -> extractSpi(fieldsWithElement)),
                            nullableBoolean(() -> extractOnGround(fieldsWithElement)),
                            nullableJsonObject(() -> extractExtraField(fieldsWithElement)),
                            extractMask(fieldsWithElement)));
                }
            }.doSwitch(0);
        } catch (final Exception e) {
            return empty();
        }
    }

    private static Integer nullableInteger(final Callable<Integer> callable) {
        return (Integer) nullableObject(callable);
    }

    private static Double nullableDouble(final Callable<Double> callable) {

        return (Double) nullableObject(callable);
    }

    private static String nullableString(final Callable<String> callable) {
        return (String) nullableObject(callable);
    }

    private static Boolean nullableBoolean(final Callable<Boolean> callable) {
        return (Boolean) nullableObject(callable);
    }

    private static JsonObject nullableJsonObject(final Callable<JsonObject> callable) {
        return (JsonObject) nullableObject(callable);
    }

    private static Object nullableObject(final Callable<?> callable) {
        try {
            return callable.call();
        } catch (Exception ignored) {
            return null;
        }
    }

    private static Integer extractVerticalRate(final String[] fields) {
        return (int) parseDouble(fields[16]);
    }

    private static Double extractTrack(final String[] fields) {
        return parseDouble(fields[13]);
    }

    private static Integer extractSquawk(final String[] fields) {
        return parseInt(fields[17]);
    }

    private static Boolean extractSpi(final String[] fields) {
        return parseFlag(fields[20]);
    }

    private static Boolean extractOnGround(final String[] fields) {
        return parseFlag(fields[21]);
    }

    private static int extractMask(final String[] fields) {
        if (fields.length >= 24) {
            return parseInt(fields[23]);
        }
        return 0;
    }

    private static JsonObject extractExtraField(final String[] fields) {
        if (fields.length == 23 || fields.length == 25) {
            JsonParser parser = new JsonParser();
            JsonObject jsonObject;
            try {
                jsonObject = parser.parse(fields[fields.length - 1]).getAsJsonObject();
            } catch (JsonParseException e) {
                System.out.println("Erreur de parsing JSON : " + e.getMessage());
                return null;
            }
            return jsonObject;
        }
        return null;

    }

    private static Double extractGroundSpeed(final String[] fields) {
        return parseDouble(fields[12]);
    }

    private static Boolean extractEmergency(final String[] fields) {
        return parseFlag(fields[19]);
    }

    private static Integer extractAltitude(final String[] fields) {
        try {
            return (int) parseDouble(fields[11]);
        } catch (final Exception ignored) {
            return null;
        }
    }

    private static Boolean extractAlert(final String[] fields) {
        return parseFlag(fields[18]);
    }

    private static Boolean parseFlag(final String flag) {
        return parseInt(flag) == 1;
    }

    private static int extractBstType(final String[] partLine) {
        return parseInt(partLine[1]);
    }

    private static int extractAircraftID(final String[] partLine) {
        return parseInt(partLine[3]);
    }

    private static int extractSessionID(final String[] partLine) {
        return parseInt(partLine[2]);
    }

    private static int extractFlightID(final String[] partLine) {
        return parseInt(partLine[5]);
    }

    private static String extractIcao(final String[] partLine) {
        return partLine[4];
    }

    private static long extractTimestampGenerated(final String[] partLine) throws ParseException {
        return strDateToTimestamp(partLine[6] + ',' + partLine[7]);
    }

    private static long extractTimestampLogged(final String[] partLine) throws ParseException {
        return strDateToTimestamp(partLine[8] + ',' + partLine[9]);
    }

    private static Double extractLatitude(final String[] partLine) {
        try {
            return parseDouble(partLine[14]);
        } catch (final Exception ignored) {
            return null;
        }
    }

    private static Double extractLongitude(final String[] partLine) {
        try {
            return parseDouble(partLine[15]);
        } catch (final Exception ignored) {
            return null;
        }
    }

    private static String extractCallSign(final String[] partLine) {
        return partLine[10];
    }

    public static long strDateToTimestamp(final String date) throws ParseException {
        final SimpleDateFormat dateFormat = new SimpleDateFormat(BST_DATE_PATTERN);
        dateFormat.setTimeZone(getTimeZone("UTC"));
        return dateFormat.parse(date).toInstant().toEpochMilli();
    }

    public static String timestampToStrDate(final long timestamp) {
        final SimpleDateFormat dateFormat = new SimpleDateFormat(BST_DATE_PATTERN);
        dateFormat.setTimeZone(getTimeZone("UTC"));
        return dateFormat.format(new Date(timestamp));
    }
}