package fdit.alteration.core.engine;

import fdit.alteration.core.incident.Action;

import java.util.Collection;

import static com.google.common.collect.Iterables.get;
import static fdit.alteration.core.engine.SuperAction.createSuperActions;
import static java.util.Arrays.asList;

public class SuperActionHelper {

    public static Collection<SuperAction> superActions(final Action... actions) {
        return createSuperActions(asList(actions));
    }

    public static SuperAction superAction(final Action... actions) {
        return get(createSuperActions(asList(actions)), 0);
    }
}
