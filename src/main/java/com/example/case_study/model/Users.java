package com.example.case_study.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
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
    @NotEmpty
    @Pattern(regexp = "^(?=.*?[A-Z])[A-Za-z0-9]{6,32}$",message = "Mật khẩu không hợp lệ!")
    private String pass;
    private String fullName;
    @Pattern(regexp = "^[0-9]{10}$",message = "Số điện thoại không hợp lệ!")
    private String phone;
    @Pattern(regexp = "^[\\w-]+@([\\w-]+\\.)+[\\w-]{2,4}$",message = "Email không hợp lệ!")
    private String email;
    private LocalDate dateOfBirth;
    private String address;
    private String imageName;
    private String hobby;
    private int blockStatus = 1;
    @Transient
    private MultipartFile imageFile;
    @ManyToMany(targetEntity = Roles.class,fetch = FetchType.EAGER)
    private Set<Roles> roles;
}
