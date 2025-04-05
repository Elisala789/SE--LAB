package com.example.demo.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;

/**
 * Test security configuration to disable Spring Security during controller tests.
 */
@TestConfiguration
public class SecurityConfigTest {

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/**"); // Ignores all endpoints during test
    }
}
