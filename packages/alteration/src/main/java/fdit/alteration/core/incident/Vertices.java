package fdit.alteration.core.incident;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import java.util.Collection;

import static com.google.common.collect.Lists.newArrayList;

public class Vertices {

    @JacksonXmlElementWrapper(useWrapping = false)
    @JacksonXmlProperty(localName = "vertex")
    private Collection<Vertex> vertexList = newArrayList();

    public Collection<Vertex> getVertexList() {
        return vertexList;
    }

    public void setVertexList(final Collection<Vertex> vertexList) {
        this.vertexList = vertexList;
    }
}