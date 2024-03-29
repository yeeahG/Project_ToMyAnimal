package team1.toMyAnimal.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import team1.toMyAnimal.security.CustomUserDetailsService;
import team1.toMyAnimal.security.JwtAuthenticationFilter;
import team1.toMyAnimal.security.handler.CustomAccessDeniedHandler;
import team1.toMyAnimal.security.CustomAuthenticationEntryPoint;

@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final TokenHelper accessTokenHelper;
    private final CustomUserDetailsService userDetailsService;

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().mvcMatchers("/exception/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .httpBasic().disable()
                .formLogin().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()

                .antMatchers(HttpMethod.GET, "/api/members/**","/api/categories/**", "/api/comments/**", "/logout").permitAll()
                .antMatchers(HttpMethod.GET, "/image/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/my-animal").authenticated()
                .antMatchers(HttpMethod.GET, "/api/my-board").authenticated()
                .antMatchers(HttpMethod.GET, "/api/public-board").authenticated()
                .antMatchers(HttpMethod.GET, "/api/animals/{id}").authenticated()
                .antMatchers(HttpMethod.GET, "/api/board/{id}").access("@boardGuard.check(#id)")
                .antMatchers(HttpMethod.GET, "/api/reservation/{id}").authenticated()
                .antMatchers(HttpMethod.GET, "/api/my-reservation").authenticated()
                .antMatchers(HttpMethod.GET, "/sendMail").permitAll()

                .antMatchers(HttpMethod.POST, "/api/signin", "/api/signup", "/api/refresh-token").permitAll()
                .antMatchers(HttpMethod.POST, "/api/categories/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/animals").authenticated()
                .antMatchers(HttpMethod.POST, "/api/comments").authenticated()
                .antMatchers(HttpMethod.POST, "/api/board").authenticated()
                .antMatchers(HttpMethod.POST, "/api/reservation").authenticated()
                .antMatchers(HttpMethod.POST, "/sendMail").permitAll()

                .antMatchers(HttpMethod.DELETE, "/api/members/{id}").access("@memberGuard.check(#id)")
                .antMatchers(HttpMethod.DELETE, "/api/categories/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/animals/{id}").access("@animalGuard.check(#id)")
                .antMatchers(HttpMethod.DELETE, "/api/comments/{id}").access("@commentGuard.check(#id)")
                .antMatchers(HttpMethod.DELETE, "/api/board/{id}").access("@boardGuard.check(#id)")
                .antMatchers(HttpMethod.DELETE, "/api/reservation/{id}").authenticated()

                .antMatchers(HttpMethod.PUT, "/api/animals/{id}").access("@animalGuard.check(#id)")
                .antMatchers(HttpMethod.PUT, "/api/member/{id}").access("@memberGuard.check(#id)")
                .antMatchers(HttpMethod.PUT, "/api/board/{id}").access("@boardGuard.check(#id)")
                .antMatchers(HttpMethod.PUT, "/api/reservation/{id}").authenticated()

                .anyRequest().hasAnyRole("ADMIN")
                .and()
                .exceptionHandling().accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                .exceptionHandling().authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(accessTokenHelper, userDetailsService), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


}
