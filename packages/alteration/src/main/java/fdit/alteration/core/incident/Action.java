package fdit.alteration.core.incident;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

public class Action {

    public static final String ACTION_TYPE_ALTERATION = "ALTERATION";
    public static final String ACTION_TYPE_CREATION = "CREATION";
    public static final String ACTION_TYPE_DELAY = "ALTERATIONTIMESTAMP";
    public static final String ACTION_TYPE_DELETION = "DELETION";
    public static final String ACTION_TYPE_SATURATION = "SATURATION";
    public static final String ACTION_TYPE_REPLAY = "REPLAY";
    public static final String ACTION_TYPE_TRAJECTORY_MODIFICATION = "TRAJECTORY";
    public static final String ACTION_TYPE_ROTATION = "ROTATION";
    public static final String ACTION_TYPE_CUT = "CUT";

    @JacksonXmlProperty(isAttribute = true, localName = "alterationType")
    @JsonProperty("alterationType")
    private String actionType;

    private Scope scope;

    private Parameters parameters;

    public String getActionType() {
        return actionType;
    }

    public void setActionType(final String actionType) {
        this.actionType = actionType;
    }

    public Scope getScope() {
        return scope;
    }

    public void setScope(final Scope scope) {
        this.scope = scope;
    }

    public Parameters getParameters() {
        return parameters;
    }

    public void setParameters(final Parameters parameters) {
        this.parameters = parameters;
    }

    public interface ActionTypeSwitch<T> {

        T visitAlteration();

        T visitDeletion();

        T visitSaturation();

        T visitDelay();

        T visitReplay();

        T visitTrajectoryModification();

        T visitCreation();

        T visitRotation();

        T visitCut();

        default T doSwitch(final String type) throws UnknownActionException {
            if ((type.toLowerCase()).compareTo(ACTION_TYPE_ALTERATION.toLowerCase()) == 0) {
                return visitAlteration();
            }
            if ((type.toLowerCase()).compareTo(ACTION_TYPE_CREATION.toLowerCase()) == 0) {
                return visitCreation();
            }
            if ((type.toLowerCase()).compareTo(ACTION_TYPE_DELAY.toLowerCase()) == 0) {
                return visitDelay();
            }
            if ((type.toLowerCase()).compareTo(ACTION_TYPE_DELETION.toLowerCase()) == 0) {
                return visitDeletion();
            }
            if ((type.toLowerCase()).compareTo(ACTION_TYPE_SATURATION.toLowerCase()) == 0) {
                return visitSaturation();
            }
            if ((type.toLowerCase()).compareTo(ACTION_TYPE_REPLAY.toLowerCase()) == 0) {
                return visitReplay();
            }
            if ((type.toLowerCase()).compareTo(ACTION_TYPE_TRAJECTORY_MODIFICATION.toLowerCase()) == 0) {
                return visitTrajectoryModification();
            }
            if ((type.toLowerCase()).compareTo(ACTION_TYPE_ROTATION.toLowerCase()) == 0) {
                return visitRotation();
            }
            if ((type.toLowerCase()).compareTo(ACTION_TYPE_CUT.toLowerCase()) == 0) {
                return visitCut();
            }
            throw new UnknownActionException(type);
        }
    }
}