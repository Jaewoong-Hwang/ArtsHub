package com.example.demo.user.entity;

import com.example.demo.interest.entity.Interest;
import com.example.demo.project.entity.Project;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

	@Column(nullable = false, unique = true, length = 255)
	private String email;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false, length = 45)
	private String name;

	@Column(nullable = false, length = 100)
	private String nickname;

	@Column(name = "phone_number", nullable = false, length = 20)
	private String phoneNumber;


	@Column(name = "create_at", nullable = false)
	private LocalDateTime createAt;

	@Column(name = "update_at", nullable = false)
	private LocalDateTime updateAt;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 50)
	private Role role;

	@Column(name = "profile_image", length = 300)
	private String profileImage;

	@Column(name = "address", length = 255)
	private String address;

	@OneToMany(mappedBy = "creator", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private List<Project> createdProjects = new ArrayList<>();




	@ManyToMany
	@JoinTable(
			name = "user_interest",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "interest_id")
	)
	private Set<Interest> interests = new HashSet<>();

	@PrePersist
	public void onCreate() {
		this.createAt = LocalDateTime.now();
		this.updateAt = LocalDateTime.now();
	}

	@PreUpdate
	public void onUpdate() {
		this.updateAt = LocalDateTime.now();
	}


}
