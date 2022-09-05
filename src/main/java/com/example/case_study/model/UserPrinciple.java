//package com.example.case_study.model;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class UserPrinciple implements UserDetails {
//    private Long id;
//    private String userName;
//    private String pass;
//    private Collection<? extends GrantedAuthority> roles;
//
//    public UserPrinciple(Long id, String userName, String pass, Collection<? extends GrantedAuthority> roles) {
//        this.id = id;
//        this.userName = userName;
//        this.pass = pass;
//        this.roles = roles;
//    }
//
//    public static UserPrinciple build(Users user) {
//        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
//                new SimpleGrantedAuthority(role.getName())
//        ).collect(Collectors.toList());
//
//        return new UserPrinciple(
//                user.getId(),
//                user.getUserName(),
//                user.getPass(),
//                authorities
//        );
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return roles;
//    }
//
//    @Override
//    public String getPassword() {
//        return pass;
//    }
//
//    @Override
//    public String getUsername() {
//        return userName;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}
