package fdit.alteration.core.engine;

import fdit.alteration.core.basestation.message.BaseStationMessage;
import fdit.alteration.core.beast.engine.BeastActionEngine;
import fdit.alteration.core.beast.message.BeastMessage;
import fdit.alteration.core.incident.Action;
import fdit.alteration.core.incident.UnknownScopeException;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map.Entry;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import static fdit.alteration.core.basestation.engine.BaseStationActionEngine.isMessageInScope;
import static fdit.alteration.core.engine.ActionEngine.isMessageTargeted;

public class SuperAction {

    private String actionType;
    private final Collection<Action> actions = newArrayList();

    public SuperAction(final String actionType) {
        this.actionType = actionType;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(final String actionType) {
        this.actionType = actionType;
    }

    public void addAction(final Action action) {
        actions.add(action);
    }

    public Collection<Action> getConcernedActions(final BaseStationMessage message,
                                                  final long firstDate) throws UnknownScopeException {
        final Collection<Action> result = newArrayList();
        for (final Action action : actions) {
            if (isMessageInScope(message, action.getScope(), firstDate) &&
                    isMessageTargeted(message, action.getParameters().getTarget().getContent())) {
                result.add(action);
            }
        }
        return result;
    }

    public Collection<Action> getConcernedActions(final BaseStationMessage message) throws UnknownScopeException {
        final Collection<Action> result = newArrayList();
        for (final Action action : actions) {
            if (isMessageTargeted(message, action.getParameters().getTarget().getContent())) {
                result.add(action);
            }
        }
        return result;
    }

    public Collection<Action> getConcernedActions(final BeastMessage message,
                                                  final long firstDate)
            throws UnknownScopeException {
        final Collection<Action> result = newArrayList();
        for (final Action action : actions) {
            if (BeastActionEngine.isMessageInScope(message, action.getScope(), firstDate) &&
                    isMessageTargeted(message, action.getParameters().getTarget().getContent())) {
                result.add(action);
            }
        }
        return result;
    }

    public static Collection<SuperAction> createSuperActions(final Collection<Action> actions) {
        final HashMap<String, Collection<Action>> actionMap = newHashMap();
        for (final Action action : actions) {
            actionMap.putIfAbsent(action.getActionType(), newArrayList());
            actionMap.get(action.getActionType()).add(action);
        }
        final Collection<SuperAction> result = newArrayList();
        for (Entry<String, Collection<Action>> toMerge : actionMap.entrySet()) {
            result.add(mergeActions(toMerge.getKey(), toMerge.getValue()));
        }
        return result;
    }

    private static SuperAction mergeActions(final String type, final Collection<Action> actions) {
        final SuperAction superAction = new SuperAction(type);
        for (final Action action : actions) {
            superAction.addAction(action);
        }
        return superAction;
    }

    public Collection<Action> getActions() {
        return actions;
    }
}