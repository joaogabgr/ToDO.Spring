package com.joaogabgr.backend.infra.repositories;

import com.joaogabgr.backend.core.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
