package com.example.demo.project.entity;

import com.example.demo.user.entity.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

@Entity
@Data
@Cacheable
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String slug;

    private String genre;
    private int capacity;
    private String deadline;
    @Column(name = "thumbnail", length = 300)
    private String thumbnail;
    private String descriptionSummary;

    @Embedded
    private ProjectDescription description;

    @Column(nullable = false)
    private String status = "모집중"; // 모집중, 마감

    // ✅ 리워드와 양방향 관계 + 순환 참조 방지
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Reward> rewards;

    private int views;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;


    @PrePersist
    public void prePersist() {
        if (this.slug == null || this.slug.trim().isEmpty()) {
            this.slug = createSlug(this.title);
        }
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }

    private String createSlug(String input) {
        String now = String.valueOf(System.currentTimeMillis());
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        String slug = Pattern.compile("[^\\w\\s-]")
                .matcher(normalized)
                .replaceAll("")  // 특수문자 제거
                .replaceAll("[\\s]+", "-")  // 공백 → 하이픈
                .toLowerCase();

        return slug + "-" + now;
    }

    // Project.java 내부에 추가
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProjectParticipant> participants;


    public int getCurrentMembers() {
        return participants != null ? participants.size() : 0;
    }
}
