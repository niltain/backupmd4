package com.example.case_study.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String userName;
    //    @NotEmpty
//    @Pattern(regexp = "^(?=.*?[A-Z])[A-Za-z0-9]{6,32}$",message = "Password invalid!")
    @Column(nullable = false)
    private String pass;
    private String fullName;
    //    @Pattern(regexp = "^[0-9]{10}$",message = "Phone number invalid!")
    private String phone;
    //    @Pattern(regexp = "^[\\w-]+@([\\w-]+\\.)+[\\w-]{2,4}$",message = "Email invalid!")
    private String email;
    private LocalDate dateOfBirth;
    private String address;
    private String avatar;
    private String hobby;
    private LocalDateTime createDate = LocalDateTime.now();
    private Boolean blockUser = true;
//    @ManyToMany(targetEntity = Roles.class,fetch = FetchType.EAGER)
//    private Set<Roles> roles;
}
