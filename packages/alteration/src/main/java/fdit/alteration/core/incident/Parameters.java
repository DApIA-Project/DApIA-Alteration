package fdit.alteration.core.incident;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collection;

import static com.google.common.collect.Lists.newArrayList;

public class Parameters {

    @JsonProperty("target")
    private Target target;

    @JacksonXmlProperty(localName = "parameter")
    @JacksonXmlElementWrapper(useWrapping = false)
    @JsonProperty("parameter")
    private Collection<Parameter> parameterList = newArrayList();

    private String recordPath;

    private Trajectory trajectory;

    public Trajectory getTrajectory() {
        return trajectory;
    }

    public void setTrajectory(final Trajectory trajectory) {
        this.trajectory = trajectory;
    }

    public Target getTarget() {
        return target;
    }

    public void setTarget(final Target target) {
        this.target = target;
    }

    public Collection<Parameter> getParameterList() {
        return parameterList;
    }

    public void setParameterList(final Collection<Parameter> parameterList) {
        this.parameterList = parameterList;
    }

    public String getRecordPath() {
        return recordPath;
    }

    public void setRecordPath(final String recordPath) {
        this.recordPath = recordPath;
    }
}