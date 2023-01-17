package fdit.alteration.core.incident;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;

public class Target {

    public static final String TARGET_ALL = "ALL";

    @JacksonXmlProperty(isAttribute = true)
    private String identifier;

    @JacksonXmlText()
    private String content;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(final String identifier) {
        this.identifier = identifier;
    }

    public String getContent() {
        return content;
    }

    public void setContent(final String content) {
        this.content = content;
    }
}