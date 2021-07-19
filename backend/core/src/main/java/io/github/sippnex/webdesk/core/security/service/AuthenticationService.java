package io.github.sippnex.webdesk.core.security.service;

import io.github.sippnex.webdesk.core.security.domain.JwtResponse;
import io.github.sippnex.webdesk.core.security.exception.UserNotFoundException;
import io.github.sippnex.webdesk.core.security.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthenticationService(UserRepository userRepository, JwtService jwtService, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    public JwtResponse generateJwt(String username, String password) throws UserNotFoundException {
        return userRepository.findByUsername(username)
                .filter(account ->  passwordEncoder.matches(password, account.getPassword()))
                .map(account -> new JwtResponse(jwtService.generateToken(username)))
                .orElseThrow(() ->  new UserNotFoundException(username));
    }
}
