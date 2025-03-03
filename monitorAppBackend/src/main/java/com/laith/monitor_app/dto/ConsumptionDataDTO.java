package com.laith.monitor_app.dto;

import java.util.UUID;

public class ConsumptionDataDTO {
    private Long timestamp;
    private UUID device_id;
    private Double measurement_value;
    public ConsumptionDataDTO() {
    }
    public ConsumptionDataDTO(Long timestamp, String device_id, Double measurement_value) {
        this.timestamp = timestamp;
        this.device_id = UUID.fromString(device_id);
        this.measurement_value = measurement_value;
    }
    public Long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
    public UUID getDevice_id() {
        return device_id;
    }
    public void setDevice_id(String device_id) {
        this.device_id = UUID.fromString(device_id);
    }
    public Double getMeasurement_value() {
        return measurement_value;
    }
    public void setMeasurement_value(Double measurement_value) {
        this.measurement_value = measurement_value;
    }
}
