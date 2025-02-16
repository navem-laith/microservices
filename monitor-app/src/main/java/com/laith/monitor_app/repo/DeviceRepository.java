package com.laith.monitor_app.repo;

import com.laith.monitor_app.entities.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
@Repository
public interface DeviceRepository extends JpaRepository<Device, UUID> {
    /*@Modifying
    @Transactional
    @Query("UPDATE ConsumptionData c SET c.maxHourlyConsumption = :newMax WHERE c.deviceId = :uuid")
    void updateDevice(UUID uuid, Double newMax);*/
}
