package com.laith.monitor_app.entities;

import jakarta.persistence.*;

import java.util.UUID;
@Entity
@Table(name = "consumption_data")
public class ConsumptionData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment
    @Column(nullable = false, name = "message_id")
    private Integer messageId;
    @Column(nullable = false, name = "device_id")
    private UUID deviceId;
    @Column(nullable = false, name = "timestamp")
    private Long timestamp;
    @Column(nullable = false, name = "consumption")
    private Double consumption;
    @Column(nullable = false, name = "average_consumption")
    private Double avgConsumption;

    public ConsumptionData() {
    }
    public ConsumptionData(UUID deviceId, Long timestamp, Double consumption, Double avgConsumption) {
        this.deviceId = deviceId;
        this.timestamp = timestamp;
        this.consumption = consumption;
        this.avgConsumption = avgConsumption;
    }

    public ConsumptionData(UUID deviceId, Long timestamp, Double consumption) {
        this.deviceId = deviceId;
        this.timestamp = timestamp;
        this.consumption = consumption;
        this.avgConsumption = consumption;
    }

    public Integer getMessageId() {
        return messageId;
    }

    public UUID getDeviceId() {
        return deviceId;
    }
    public void setDeviceId(UUID deviceId) {
        this.deviceId = deviceId;
    }
    public Long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
    public Double getConsumption() {
        return consumption;
    }
    public void setConsumption(Double consumption) {
        this.consumption = consumption;
    }
    public Double getAvgConsumption() {
        return avgConsumption;
    }
    public void setAvgConsumption(Double avgConsumption) {
        this.avgConsumption = avgConsumption;
    }

}
