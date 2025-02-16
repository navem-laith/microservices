package com.laith.monitor_app.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.io.Serializable;
import java.util.UUID;

@Entity
public class Device implements Serializable{
    @Id
    @Column(name="id", columnDefinition = "BINARY(16)")
    private UUID id;
    @Column(name = "maxHrConsumption")
    private Float maxHrConsumption;
    public Device() {
    }
    public Device(Float maxHrConsumption) {
        this.maxHrConsumption = maxHrConsumption;
    }
    public Device(UUID id, Float maxHrConsumption) {
        this.id = id;
        this.maxHrConsumption = maxHrConsumption;
    }
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public Float getMaxHrConsumption() {
        return maxHrConsumption;
    }
    public void setMaxHrConsumption(Float maxHrConsumption) {
        this.maxHrConsumption = maxHrConsumption;
    }
}
