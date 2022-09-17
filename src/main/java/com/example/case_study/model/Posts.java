package com.example.case_study.model;

import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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
    private Long likeCount = 0L;
    private String permissionPost = "Public";
    private LocalDateTime createPost = LocalDateTime.now();
    private Boolean deletePost = true;
    @ManyToOne
    private Users users;

}
