//package com.example.case_study.config;
//
//import com.example.case_study.jwt.CustomAccessDeniedHandler;
//import com.example.case_study.jwt.JwtAuthenticationFilter;
//import com.example.case_study.jwt.RestAuthenticationEntryPoint;
//import com.example.security.jwt.CustomAccessDeniedHandler;
//import com.example.security.jwt.JwtAuthenticationFilter;
//import com.example.security.jwt.RestAuthenticationEntryPoint;
//import com.example.security.service.IUserService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.BeanIds;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//    @Autowired
//    private IUserService iUserService;
//
//    @Bean(BeanIds.AUTHENTICATION_MANAGER)
//    @Override
//    protected AuthenticationManager authenticationManager() throws Exception {
//        return super.authenticationManager();
//    }
//
//    @Bean
//    public JwtAuthenticationFilter jwtAuthenticationFilter() {
//        return new JwtAuthenticationFilter();
//    }
//
//    @Bean
//    public RestAuthenticationEntryPoint restServicesEntryPoint() {
//        return new RestAuthenticationEntryPoint();
//    }
//
//    @Bean
//    public CustomAccessDeniedHandler customAccessDeniedHandler() {
//        return new CustomAccessDeniedHandler();
//    }
//
//    //sử dụng password encoder để mã hóa password
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder(10);
//    }
//
//    @Autowired
//    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(iUserService).passwordEncoder(passwordEncoder());
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf().ignoringAntMatchers("/**");
//        http.exceptionHandling().authenticationEntryPoint(restServicesEntryPoint());
//        http.authorizeRequests()
//                .antMatchers("/", "/api/login","/api/signup","/api/role").permitAll()
//                //đặt url dưới quyền User, quản lý bởi Spring Security
//                .antMatchers("/students**","/").hasAnyAuthority("ADMIN")
//                .anyRequest().authenticated()
//                .and().csrf().disable();
//        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
//                .exceptionHandling().accessDeniedHandler(customAccessDeniedHandler());
//        http.sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//        http.cors();
//    }
//
////        @Override
////    protected void configure(HttpSecurity http) throws Exception {
////        http.authorizeRequests().antMatchers("/").permitAll()
////                .and()
////                .authorizeRequests().antMatchers("/user**").hasRole("USER")
////                .and()
////                .authorizeRequests().antMatchers("/admin**").hasRole("ADMIN")
////                .and()
////                .formLogin()
////                .loginPage("/login")
////                .failureUrl("/error")
////                .and()
////                .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
////    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication()
//                .withUser("user").password("{noop}12345").roles("USER")
//                .and()
//                .withUser("admin").password("{noop}12345").roles("ADMIN");
//    }
//}
