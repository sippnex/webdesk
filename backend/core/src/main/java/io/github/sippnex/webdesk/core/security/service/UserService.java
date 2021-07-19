package io.github.sippnex.webdesk.core.security.service;

import io.github.sippnex.webdesk.core.security.domain.User;
import io.github.sippnex.webdesk.core.security.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserByUsername(String name) {
        return userRepository.findByUsername(name);
    }

}
