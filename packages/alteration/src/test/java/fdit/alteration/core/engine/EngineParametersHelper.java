package fdit.alteration.core.engine;

import java.util.function.Consumer;

import static java.util.Arrays.stream;

public class EngineParametersHelper {

    @SafeVarargs
    public static EngineParameters engineParameters(final Consumer<EngineParameters>... parameters) {
        final EngineParameters engineParameters = new EngineParameters();
        stream(parameters).forEach(parameter -> parameter.accept(engineParameters));
        return engineParameters;
    }

    public static Consumer<EngineParameters> label(final boolean value) {
        return parameters -> parameters.setLabeled(value);
    }

    public static Consumer<EngineParameters> groundSpeed(final boolean value) {
        return parameters -> parameters.setGroundSpeed(value);
    }

    public static Consumer<EngineParameters> track(final boolean value) {
        return parameters -> parameters.setTrack(value);
    }

    public static Consumer<EngineParameters> verticalRate(final boolean value) {
        return parameters -> parameters.setVerticalRate(value);
    }

    public static Consumer<EngineParameters> disableLatitude(final boolean value) {
        return parameters -> parameters.setDisableLatitude(value);
    }

    public static Consumer<EngineParameters> disableLongitude(final boolean value) {
        return parameters -> parameters.setDisableLongitude(value);
    }

    public static Consumer<EngineParameters> disableAltitude(final boolean value) {
        return parameters -> parameters.setDisableAltitude(value);
    }

    public static Consumer<EngineParameters> latitudeNoise(final boolean value) {
        return parameters -> parameters.setLatitudeNoise(value);
    }

    public static Consumer<EngineParameters> longitudeNoise(final boolean value) {
        return parameters -> parameters.setLongitudeNoise(value);
    }

}