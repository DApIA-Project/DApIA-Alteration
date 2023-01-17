package fdit.alteration.application;

import fdit.alteration.api.AlterationAPI;

import java.io.File;

// Use this class as a free script to your needs
class Main {

    public static void main(final String[] args) throws Exception {
        if (args.length > 0) {
            alterRecording(args[0]);
        }
    }

    private static void alterRecording(final String incidentFilePath) throws Exception {
        final File incidentFile = new File(incidentFilePath);
        if (incidentFile.exists() && incidentFile.isFile()) {
            AlterationAPI.startAlteration(new File("."), new File(incidentFilePath));
        }
    }
}