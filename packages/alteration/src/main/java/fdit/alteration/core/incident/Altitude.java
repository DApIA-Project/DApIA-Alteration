package fdit.alteration.core.incident;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;

public class Altitude {

    @JacksonXmlProperty(isAttribute = true)
    private Boolean offset;

    @JacksonXmlProperty(isAttribute = true)
    private Boolean time;

    @JacksonXmlText()
    private Integer content;

    public Boolean getOffset() {
        if (offset == null) {
            return false;
        }
        return offset;
    }

    public void setOffset(final Boolean offset) {
        this.offset = offset;
    }

    public Boolean getTime() {
        if (time == null) {
            return false;
        }
        return time;
    }

    public void setTime(Boolean time) {
        this.time = time;
    }

    public Integer getContent() {
        if (content == null) {
            return 0;
        }
        return content;
    }

    public void setContent(final Integer content) {
        this.content = content;
    }
}