package fdit.alteration.core.engine;

import java.util.HashMap;

import static com.google.common.collect.Maps.newHashMap;

public class Step {

    final HashMap<String, Integer> map = newHashMap();

    public int getAndIncrement(final String characteristic) {
        map.putIfAbsent(characteristic, 1);
        final int step = map.get(characteristic);
        map.put(characteristic, step + 1);
        return step;
    }
}