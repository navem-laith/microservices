package com.laith.monitor_app.dto;

import java.util.Objects;
import java.util.UUID;
public class DeviceDetailsDTO {
    private UUID id;
    private Float maxHrConsumption;
    public DeviceDetailsDTO() {
    }
    public DeviceDetailsDTO(UUID id, Float maxHrConsumption) {
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
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DeviceDetailsDTO deviceDetailsDTO = (DeviceDetailsDTO) o;
        return this.id == deviceDetailsDTO.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "DeviceDetailsDTO{" +
                "id=" + id +
                ", maxHrConsumption=" + maxHrConsumption +
                '}';
    }
}
