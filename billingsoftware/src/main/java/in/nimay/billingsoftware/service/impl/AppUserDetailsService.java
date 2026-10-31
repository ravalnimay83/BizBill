package in.nimay.billingsoftware.service.impl;

import in.nimay.billingsoftware.entity.UserEntity;
import in.nimay.billingsoftware.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppUserDetailsService
implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity existingUsers =  userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("Email not  found :"+email));
        return new User(existingUsers.getEmail(), existingUsers.getPassword(), Collections.singleton(new SimpleGrantedAuthority(existingUsers.getRole())));
    }
}
