package fdit.alteration.core.incident;

import java.util.Collection;

public class Polygon {

    private String id;

    private String name;

    private double lowerAlt;

    private double upperAlt;

    private Vertices vertices;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public double getLowerAlt() {
        return lowerAlt;
    }

    public void setLowerAlt(final double lowerAlt) {
        this.lowerAlt = lowerAlt;
    }

    public double getUpperAlt() {
        return upperAlt;
    }

    public void setUpperAlt(final double upperAlt) {
        this.upperAlt = upperAlt;
    }

    public Collection<Vertex> getVertices() {
        return vertices.getVertexList();
    }

    public void setVertices(final Vertices vertices) {
        this.vertices = vertices;
    }
}