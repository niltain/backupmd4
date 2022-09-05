//package com.example.case_study.model;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.springframework.security.core.GrantedAuthority;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class Roles implements GrantedAuthority {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String name;
//
//    @Override
//    public String getAuthority() {
//        return name;
//    }
//}
