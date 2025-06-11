package com.example.demo.user.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Signature {

    @Id
    private String id; // 항상 "jwt-key" 같은 값 고정 가능

    @Lob
    @Column(name="signKey")
    private byte[] keyBytes;

    @Column(name="createAt")
    private LocalDate createAt;
}