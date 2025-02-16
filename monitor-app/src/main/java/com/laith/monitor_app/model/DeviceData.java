package com.laith.monitor_app.model;

import java.util.*;

public class DeviceData {
    private final UUID deviceId;
    private final Deque<Double> queue;
    private static final int MAX_QUEUE_SIZE = 6; // maximum size of the queue (representing 6*10 minutes)
    public DeviceData(UUID deviceId) {
        this.deviceId = deviceId;
        this.queue = new ArrayDeque<>();
    }
    public Double getAvgConsumption() {
        if (queue.isEmpty()) {
            throw new IllegalStateException("Cannot calculate average: queue is empty.");
        }
        return queue.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
    }
    public void addVal(Double v) {
        if (queue.size() == MAX_QUEUE_SIZE) {
            queue.removeFirst();
        }
        queue.addLast(v);
    }
    public UUID getDeviceId() {
        return deviceId;
    }
}
