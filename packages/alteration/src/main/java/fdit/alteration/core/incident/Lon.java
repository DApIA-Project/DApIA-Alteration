package fdit.alteration.core.incident;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;

public class Lon {

    @JacksonXmlProperty(isAttribute = true)
    private Boolean offset;

    @JacksonXmlText()
    private Double content;

    public Boolean getOffset() {
        if (offset == null) {
            return false;
        }
        return offset;
    }

    public void setOffset(final Boolean offset) {
        this.offset = offset;
    }

    public Double getContent() {
        if(content == null) {
            return 0.0;
        }
        return content;
    }

    public void setContent(final Double content) {
        this.content = content;
    }
}
