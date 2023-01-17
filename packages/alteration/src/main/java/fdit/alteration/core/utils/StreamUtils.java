package fdit.alteration.core.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class StreamUtils {

    private StreamUtils() {
    }

    public static String inputStreamToString(final InputStream inputStream) throws IOException {
        final StringBuilder stringBuilder = new StringBuilder();
        String line;
        final BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        reader.close();
        return stringBuilder.toString();
    }
}