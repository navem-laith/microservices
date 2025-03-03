package com.laith.monitor_app.repo;

import com.laith.monitor_app.entities.ConsumptionData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Repository
public interface ConsumptionDataRepository extends JpaRepository<ConsumptionData, UUID> {
    /*@Modifying //because the query is an update or delete operation
    @Transactional // ensures that the update operation is wrapped in a transaction
    @Query("UPDATE ConsumptionData c SET c.avgConsumption = :newAvg WHERE c.deviceId = :uuid")
    void updateAvgConsumption(UUID uuid, Double newAvg);*/
}
