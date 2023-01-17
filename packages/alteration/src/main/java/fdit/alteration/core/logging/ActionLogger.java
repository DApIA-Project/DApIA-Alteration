package fdit.alteration.core.logging;

import fdit.alteration.core.incident.Action;

import java.io.File;
import java.util.Collection;
import java.util.Set;

import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Sets.newHashSet;
import static java.lang.Math.max;
import static java.lang.Math.min;

public class ActionLogger {

    private final Collection<Action> actions = newArrayList();
    private final Set<String> icaos = newHashSet();
    private int alteredMessageNumber = 0;
    private int modifiedMessageNumber = 0;
    private int deletedMessageNumber = 0;
    private int createdMessageNumber = 0;
    private long minDate = Long.MAX_VALUE;
    private long maxDate = Long.MIN_VALUE;

    public int getAlteredMessageNumber() {
        return alteredMessageNumber;
    }

    public int getAlteredAircraftNumber() {
        return icaos.size();
    }

    public int getModifiedMessageNumber() {
        return modifiedMessageNumber;
    }

    public int getDeletedMessageNumber() {
        return deletedMessageNumber;
    }

    public int getCreatedMessageNumber() {
        return createdMessageNumber;
    }

    public int getActionNumber() {
        return actions.size();
    }

    public long getMinDate() {
        return minDate;
    }

    public long getMaxDate() {
        return maxDate;
    }

    public void incrementAlteredMessage() {
        alteredMessageNumber++;
    }

    public void incrementModifiedMessage() {
        modifiedMessageNumber++;
        incrementAlteredMessage();
    }

    public void incrementDeletedMessage() {
        deletedMessageNumber++;
        incrementAlteredMessage();
    }

    public void incrementCreatedMessage() {
        createdMessageNumber++;
        incrementAlteredMessage();
    }

    public void updateDate(final long date) {
        minDate = min(minDate, date);
        maxDate = max(maxDate, date);
    }

    public Set<String> getIcaos() {
        return icaos;
    }

    public long getActionDuration() {
        return maxDate - minDate;
    }

    public void addAllActions(final Collection<Action> actions) {
        this.actions.addAll(actions);
    }

    public void addIcao(final String icao) {
        icaos.add(icao);
    }

    public void print(final File outputFile) {
        System.out.println();
    }
}