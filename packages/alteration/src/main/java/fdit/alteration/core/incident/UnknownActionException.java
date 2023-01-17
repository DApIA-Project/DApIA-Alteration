package fdit.alteration.core.incident;

public class UnknownActionException extends Exception {

    private final String type;

    UnknownActionException(final String type) {
        this.type = type;
    }

    @Override
    public String getMessage() {
        return "Unknown action type: " + type;
    }
}