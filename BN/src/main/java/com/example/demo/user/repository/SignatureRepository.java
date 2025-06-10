package com.example.demo.user.repository;


import com.example.demo.user.entity.Signature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.web.webauthn.api.Bytes;
import org.springframework.stereotype.Repository;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Bytes> {
}
