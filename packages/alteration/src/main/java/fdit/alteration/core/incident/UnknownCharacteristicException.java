package fdit.alteration.core.incident;

public class UnknownCharacteristicException extends Exception {

    private final String characteristic;

    UnknownCharacteristicException(final String characteristic) {
        this.characteristic = characteristic;
    }

    @Override
    public String getMessage() {
        return "Unknown characteristic: " + characteristic;
    }
}