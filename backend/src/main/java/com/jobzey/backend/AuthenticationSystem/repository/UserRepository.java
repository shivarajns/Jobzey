package com.jobzey.backend.AuthenticationSystem.repository;

import com.jobzey.backend.AuthenticationSystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional <User> findByFirebaseUid(String firebaseUid);
    Optional <User> findByEmail(String email);

    boolean existsByFirebaseUid(String firebaseUid);
    boolean existsByEmail(String email);
}
