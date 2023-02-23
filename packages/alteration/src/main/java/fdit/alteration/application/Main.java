package fdit.alteration.application;

import fdit.alteration.api.AlterationAPIJson;
import fdit.alteration.core.engine.EngineParameters;

import java.io.File;

// Use this class as a free script to your needs
class Main {

    public static void main(final String[] args) throws Exception {
        if (args.length > 0) {
            System.out.println("main");
            alterRecording(args[0], args[1]);
        }
    }

    private static void alterRecording(final String incidentFilePath) throws Exception {
        extracted(incidentFilePath, "./public", false, "");
    }

    private static void alterRecording(final String incidentFilePath, final String file_name) throws Exception {
        String file_name_without_ext = file_name.replaceFirst("[.][^.]+$", "");
        extracted(incidentFilePath, "./temp", true, file_name_without_ext);
    }

    private static void extracted(String incidentFilePath, String pathname, boolean logResults, String suffix) throws Exception {
        final File incidentFile = new File(incidentFilePath);
        System.out.println(incidentFile.exists());
        System.out.println(incidentFile.isFile());
        if (incidentFile.exists() && incidentFile.isFile()) {
            System.out.println("alterRecording");
            //AlterationAPI.startAlteration(new File("."), new File(incidentFilePath));
            AlterationAPIJson.startAlteration(new File(pathname), new File(incidentFilePath), logResults, new EngineParameters(), "modified", suffix);
        }
    }

}