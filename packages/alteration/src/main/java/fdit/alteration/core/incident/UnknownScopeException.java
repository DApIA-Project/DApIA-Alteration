package fdit.alteration.core.incident;

public class UnknownScopeException extends Exception {

    private final String type;

    UnknownScopeException(final String type) {
        this.type = type;
    }

    @Override
    public String getMessage() {
        return "Unknown scope type: " + type;
    }
}
