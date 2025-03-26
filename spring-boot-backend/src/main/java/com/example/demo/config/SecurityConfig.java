package com.example.demo.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.web.DefaultOAuth2AuthorizationRequestResolver;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import java.io.IOException;
import java.util.Map;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, ClientRegistrationRepository clientRegistrationRepository) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.disable())
            .authorizeHttpRequests(auth -> auth
            	.requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .authorizationEndpoint(auth -> 
                    auth.authorizationRequestResolver(
                        oAuth2AuthorizationRequestResolver(clientRegistrationRepository)
                    )
                )
                .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2UserService()))
                .successHandler((request, response, authentication) -> {
                    OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                    String email = oauth2User.getAttribute("email");
                    
                    String redirectUrl = determineRedirectUrl(email);
                    response.sendRedirect(redirectUrl);
                })
                .failureHandler(new SimpleUrlAuthenticationFailureHandler("http://localhost:5173/login?error"))
            );

        return http.build();
    }

    @Bean
    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService() {
        return userRequest -> {
            OAuth2User oauth2User = new DefaultOAuth2UserService().loadUser(userRequest);
            String email = oauth2User.getAttribute("email");

            if (email == null || !email.endsWith("@nitc.ac.in")) {
                throw new OAuth2AuthenticationException("Only NITC emails are allowed");
            }

            return oauth2User;
        };
    }

    private String determineRedirectUrl(String email) {
        if (email.equals("elisala_b220841cs@nitc.ac.in")) {
            return "http://localhost:5173/generaladmin-dashboard";
        } else if (email.equals("chitta_b220243cs@nitc.ac.in")) {
            return "http://localhost:5173/supervisor-dashboard";
        } 
        else if (email.equals("samudrala_b221178cs@nitc.ac.in")) {
            return "http://localhost:5173/student-dashboard";
        } 
        else if (email.equals("chenna_b220234cs@nitc.ac.in")) {
            return "http://localhost:5173/labadmin-dashboard";
        } 
        // Matches bXXXXXX<dept>@nitc.ac.in OR mXXXXXX<dept>@nitc.ac.in (Students)
        else if (email.matches(".*[bm]\\d{6}[a-zA-Z]+@nitc\\.ac\\.in")) {
            return "http://localhost:5173/student-dashboard";
        } 
        
        // Matches pXXXXXX<dept>@nitc.ac.in (Researchers)
        else if (email.matches(".*p\\d{6}[a-zA-Z]+@nitc\\.ac\\.in")) {
            return "http://localhost:5173/researcher-dashboard";
        } 
        // Faculty (No b/m/p and has only name)
        else {
            return "http://localhost:5173/faculty-dashboard";
        }
    }


    @Bean
    public OAuth2AuthorizationRequestResolver oAuth2AuthorizationRequestResolver(ClientRegistrationRepository clientRegistrationRepository) {
        DefaultOAuth2AuthorizationRequestResolver defaultResolver = new DefaultOAuth2AuthorizationRequestResolver(
            clientRegistrationRepository, "/oauth2/authorization"
        );

        return new OAuth2AuthorizationRequestResolver() {
            @Override
            public OAuth2AuthorizationRequest resolve(HttpServletRequest request) {
                OAuth2AuthorizationRequest authRequest = defaultResolver.resolve(request);
                if (authRequest == null) {
                    return null;
                }

                return OAuth2AuthorizationRequest.from(authRequest)
                    .additionalParameters(params -> params.put("prompt", "select_account"))
                    .build();
            }

            @Override
            public OAuth2AuthorizationRequest resolve(HttpServletRequest request, String clientRegistrationId) {
                return defaultResolver.resolve(request, clientRegistrationId);
            }
        };
    }
}