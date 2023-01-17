package fdit.alteration.core.incident;

import java.io.File;

public class Recording {

    private File file;
    private long firstDate = -1;

    public Recording(final File file) {
        this.file = file;
    }

    public Recording(final File file, final long firstDate) {
        this.file = file;
        this.firstDate = firstDate;
    }

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }

    public long getFirstDate() {
        return firstDate;
    }
}