package fdit.alteration.application;

import fdit.alteration.api.AlterationAPI;
import fdit.alteration.api.AlterationAPIJson;

import java.io.File;

// Use this class as a free script to your needs
class Main {

    public static void main(final String[] args) throws Exception {
        if (args.length > 0) {
            System.out.println("main");
            alterRecording(args[0]);
        }
    }

    private static void alterRecording(final String incidentFilePath) throws Exception {
        final File incidentFile = new File(incidentFilePath);
        System.out.println(incidentFile.exists());
        System.out.println(incidentFile.isFile());
        if (incidentFile.exists() && incidentFile.isFile()) {
            System.out.println("alterRecording");
            //AlterationAPI.startAlteration(new File("."), new File(incidentFilePath));
            AlterationAPIJson.startAlteration(new File("."), new File(incidentFilePath));
        }
    }
}