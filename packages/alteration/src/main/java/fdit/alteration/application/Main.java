package fdit.alteration.application;

import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import fdit.alteration.api.AlterationAPI;
import fdit.alteration.core.engine.EngineParameters;
import org.apache.commons.cli.CommandLine;
import org.apache.commons.cli.DefaultParser;
import static fdit.alteration.core.engine.EngineParameters.OPTIONS;

import java.io.File;
import java.util.regex.Pattern;

// Use this class as a free script to your needs
class Main {

    public static void main(final String[] args) throws Exception {

        if (args.length > 0) {
            System.out.println("main");
            if (args[0].contains(".xml"))
                AlterationAPI.setMapper(new XmlMapper());
            else
                AlterationAPI.setMapper(new JsonMapper());
                alterRecording(args,args[0], args[1]);


        }
    }

    private static void alterRecording(final String[] args, final String incidentFilePath) throws Exception {
        extracted(args, incidentFilePath, "./public", false, "");
    }

    private static void alterRecording(final String[] args,final String incidentFilePath, final String file_name) throws Exception {
        String file_name_without_ext = file_name.replaceFirst("[.][^.]+$", "");
        extracted(args,incidentFilePath, "./temp", true, file_name_without_ext);
    }



    private static void extracted(final String[] args,String incidentFilePath, String pathname, boolean logResults, String suffix) throws Exception {
        final File incidentFile = new File(incidentFilePath);
        System.out.println(incidentFile.exists());
        System.out.println(incidentFile.isFile());
        if (incidentFile.exists() && incidentFile.isFile()) {
            System.out.println("alterRecording");
            //AlterationAPI.startAlteration(new File("."), new File(incidentFilePath));
            final CommandLine commandLine = new DefaultParser().parse(OPTIONS, args);
            AlterationAPI.startAlteration(new File(pathname), new File(incidentFilePath), logResults, commandLine, "modified", suffix);
        }
    }

}