package com.example.case_study.model;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Posts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String imageName;
    private Long likeCount;
    private String permissionPost;
    private int deletePost = 1;
    @ManyToOne
    private Users users;
    @Transient
    private MultipartFile imageFile;
}
