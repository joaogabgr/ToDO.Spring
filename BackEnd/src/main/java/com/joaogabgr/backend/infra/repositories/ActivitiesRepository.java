package com.joaogabgr.backend.infra.repositories;

import com.joaogabgr.backend.core.domain.models.Activities;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivitiesRepository extends JpaRepository<Activities, String> {
    List<Activities> findByUserId(String userId);
}
