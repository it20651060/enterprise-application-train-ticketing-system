package com.sliit.ead;

public class Item_Spinner {
    private String label;
    private String value;

    public Item_Spinner(String label, String value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return label;
    }
}
