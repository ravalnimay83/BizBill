package in.nimay.billingsoftware.service.impl;

import in.nimay.billingsoftware.entity.UserEntity;
import in.nimay.billingsoftware.io.UserRequest;
import in.nimay.billingsoftware.io.UserResponse;
import in.nimay.billingsoftware.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final in.nimay.billingsoftware.repository.UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse createUser(UserRequest userRequest) {
        UserEntity newUser = convertToEntity(userRequest);
        newUser = userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    @Override
    public String getUserRole(String email) {
        return userRepository.findByEmail(email)
                .map(UserEntity::getRole)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    @Override
    public List<UserResponse> readUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    @Override
    public void deleteUser(String id) {
        UserEntity user = userRepository.findByUserId(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
        userRepository.delete(user);
    }

    private UserEntity convertToEntity(UserRequest request) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
    }

    private UserResponse convertToResponse(UserEntity user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
