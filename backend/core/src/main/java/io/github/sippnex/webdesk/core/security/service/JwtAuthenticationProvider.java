package io.github.sippnex.webdesk.core.security.service;

import io.github.sippnex.webdesk.core.security.domain.JwtAuthenticatedProfile;
import io.github.sippnex.webdesk.core.security.domain.JwtAuthentication;
import io.github.sippnex.webdesk.core.security.exception.JwtAuthenticationException;
import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final JwtService jwtService;

    public JwtAuthenticationProvider(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        try {
            String token = (String) authentication.getCredentials();
            String username = jwtService.getUsernameFromToken(token);

            return jwtService.validateToken(token)
                    .map(aBoolean -> new JwtAuthenticatedProfile(username))
                    .orElseThrow(() -> new JwtAuthenticationException("JWT Token validation failed"));

        } catch (JwtException e) {
            System.out.printf("Invalid JWT Token: %s%n", e.getMessage());
            throw new JwtAuthenticationException("Failed to verify token");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return JwtAuthentication.class.equals(authentication);
    }
}
