package io.github.sippnex.webdesk.core.security.web.rest;

import io.github.sippnex.webdesk.core.security.domain.JwtResponse;
import io.github.sippnex.webdesk.core.security.exception.UserNotFoundException;
import io.github.sippnex.webdesk.core.security.service.AuthenticationService;
import io.github.sippnex.webdesk.core.security.web.dto.AuthenticationRequestDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class AuthenticationResource {

    private final AuthenticationService authenticationService;

    public AuthenticationResource(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody AuthenticationRequestDto authRequest) {
        try {
            return new ResponseEntity<>(authenticationService.generateJwt(authRequest.getUsername(), authRequest.getPassword()), HttpStatus.OK);
        } catch (UserNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
