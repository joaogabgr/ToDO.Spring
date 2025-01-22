package com.joaogabgr.backend.application.operations.user;

import com.joaogabgr.backend.core.domain.models.User;
import com.joaogabgr.backend.infra.repositories.UserRepository;
import com.joaogabgr.backend.web.exeption.SystemContextException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FindUser {

    @Autowired
    private UserRepository userRepository;

    public User execute(String userId) throws SystemContextException {
        return userRepository.findById(userId).orElseThrow(
                () -> new SystemContextException("User not found"));
    }
}
