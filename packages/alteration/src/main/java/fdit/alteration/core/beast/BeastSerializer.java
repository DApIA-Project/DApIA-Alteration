package fdit.alteration.core.beast;

import com.google.gson.Gson;
import fdit.alteration.core.engine.Message;

public class BeastSerializer {

    private final Gson deserializer;

    public BeastSerializer(final Gson deserializer) {
        this.deserializer = deserializer;
    }

    public String serialize(final Message message) {
        return deserializer.toJson(message);
    }
}