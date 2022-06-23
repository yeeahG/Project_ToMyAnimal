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

                .antMatchers(HttpMethod.GET, "/api/posts/**", "/api/members/**", "/api/categories/**", "/api/comments/**", "/logout").permitAll()
                .antMatchers(HttpMethod.GET, "/image/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/my-pet").authenticated()
                .antMatchers(HttpMethod.GET, "/api/my-board").authenticated()
                .antMatchers(HttpMethod.GET, "/api/pets/{id}").authenticated()
                .antMatchers(HttpMethod.GET, "/api/board/{id}").access("@boardGuard.check(#id)")

                .antMatchers(HttpMethod.POST, "/api/posts").authenticated()
                .antMatchers(HttpMethod.POST, "/api/signin", "/api/signup", "/api/refresh-token").permitAll()
                .antMatchers(HttpMethod.POST, "/api/categories/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/pets").authenticated()
                .antMatchers(HttpMethod.POST, "/api/comments").authenticated()
                .antMatchers(HttpMethod.POST, "/api/board").authenticated()

                .antMatchers(HttpMethod.DELETE, "/api/members/{id}").access("@memberGuard.check(#id)")
                .antMatchers(HttpMethod.DELETE, "/api/categories/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/posts/{id}").access("@postGuard.check(#id)")
                .antMatchers(HttpMethod.DELETE, "/api/pets/{id}").access("@petGuard.check(#id)")
                .antMatchers(HttpMethod.DELETE, "/api/comments/{id}").access("@commentGuard.check(#id)")
                .antMatchers(HttpMethod.DELETE, "/api/board/{id}").access("@boardGuard.check(#id)")

                .antMatchers(HttpMethod.PUT, "/api/pets/{id}").access("@petGuard.check(#id)")
                .antMatchers(HttpMethod.PUT, "/api/posts/{id}").access("@postGuard.check(#id)")
                .antMatchers(HttpMethod.PUT, "/api/member/{id}").access("@memberGuard.check(#id)")
                .antMatchers(HttpMethod.PUT, "/api/board/{id}").access("@boardGuard.check(#id)")

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
