package com.laith.monitor_app.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.laith.monitor_app.dto.ConsumptionDataDTO;
import com.laith.monitor_app.dto.DeviceDetailsDTO;
import com.laith.monitor_app.entities.ConsumptionData;
import com.laith.monitor_app.entities.Device;
import com.laith.monitor_app.model.DeviceData;
import com.laith.monitor_app.repo.ConsumptionDataRepository;
import com.laith.monitor_app.repo.DeviceRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class RabbitMQConsumer {
    private final List<DeviceData> devList = new CopyOnWriteArrayList<>();
    @Autowired
    private ConsumptionDataRepository consumptionDataRepository;
    @Autowired
    private DeviceRepository deviceRepository;

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void receiveMessage(String message) {
        System.out.println("Received message: " + message);
        try {
            // parse the JSON message
            ObjectMapper objectMapper = new ObjectMapper();
            ConsumptionDataDTO data = objectMapper.readValue(message, ConsumptionDataDTO.class);
            UUID uuid = data.getDevice_id();
            Double val = data.getMeasurement_value();
            Long timestamp = data.getTimestamp();
            System.out.println("we parsed the uuid " + uuid);

            Device deviceInDB = deviceRepository.findById(uuid).orElse(null);
            if(deviceInDB != null){
                System.out.println("device in db exists!");
                if(!isInDevList(uuid)){ // we make sure it's in backend
                    DeviceData semiNewDev = new DeviceData(uuid);
                    devList.add(semiNewDev);
                }
            }
            else{
                System.out.println("Doesn't exist in database!");
            }

            synchronized (devList) {
                if (isInDevList(uuid)) {
                    System.out.println("Device already exists!");
                    DeviceData d = getDevice(uuid);
                    if (d != null) {
                        d.addVal(val);
                        Double newAvg = d.getAvgConsumption();
                        // save data to the consumption database
                        ConsumptionData consumptionData = new ConsumptionData(uuid, timestamp, val, newAvg);
                        consumptionDataRepository.save(consumptionData);
                        System.out.println("Saved to database: " + uuid);

                        // PUSH: we compare new average to old max, and push notification to user page if it exceeds the limit
                        Device device = deviceRepository.findById(uuid).orElse(null);
                        if(device != null){
                            Double maxHourlyCon = Double.valueOf(device.getMaxHrConsumption());
                            System.out.println("Device: " + uuid + " has max consumption: " + maxHourlyCon);
                            if(newAvg > maxHourlyCon){
                                System.out.println("WARNING: New average consumption '" + newAvg + "' exceeds max hourly consumption");
                            }
                            else{
                                System.out.println("LOG: New average consumption '" + newAvg + "' doesn't exceed max hourly consumption");
                            }
                        }
                        else {
                            System.out.println("WARNING: No max hourly consumption found for device: " + uuid);
                        }
                    }
                } else {
                    System.out.println("Its a new device consumer!");

                    // add a new device to the backend list
                    DeviceData newDev = new DeviceData(uuid);
                    newDev.addVal(val);
                    devList.add(newDev);

                    // save data to the consumption database
                    ConsumptionData consumptionData = new ConsumptionData(uuid, timestamp, val);
                    consumptionDataRepository.save(consumptionData);
                    System.out.println("Saved to consumption database: " + uuid);
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to process message: " + e.getMessage());
        }
    }
    @RabbitListener(queues = "${rabbitmq.devices-queue.name}")
    public void handleDeviceUpdateMessage(String message) {
        System.out.println("Received update message: " + message);
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceDetailsDTO deviceDetailsDTO = objectMapper.readValue(message, DeviceDetailsDTO.class);

            UUID deviceId = deviceDetailsDTO.getId();
            Float maxHrConsumption = deviceDetailsDTO.getMaxHrConsumption();
            System.out.println("Parsed device update: " + deviceId + ", maxHrConsumption: " + maxHrConsumption);

            // save data to database if new, else update it (spring save is smart enough to do both)
            Device newDevice = new Device(deviceId, maxHrConsumption);
            deviceRepository.save(newDevice);
        } catch (Exception e) {
            System.err.println("Failed to process device update message: " + e.getMessage());
        }
    }
    boolean isInDevList(UUID uuid) {
        synchronized (devList) {
            for (DeviceData d : devList) {
                if (d.getDeviceId().equals(uuid)) {
                    return true;
                }
            }
        }
        return false;
    }
    DeviceData getDevice(UUID uuid) {
        synchronized (devList) {
            for (DeviceData d : devList) {
                if (d.getDeviceId().equals(uuid)) {
                    return d;
                }
            }
        }
        return null;
    }
}
