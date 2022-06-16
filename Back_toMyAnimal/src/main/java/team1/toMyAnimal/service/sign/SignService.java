package team1.toMyAnimal.service.sign;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.config.TokenHelper;
import team1.toMyAnimal.domain.dto.request.SignInRequest;
import team1.toMyAnimal.domain.dto.request.SignUpRequest;
import team1.toMyAnimal.domain.dto.response.SignInResponse;
import team1.toMyAnimal.domain.dto.sign.RefreshTokenResponse;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.member.Role;
import team1.toMyAnimal.domain.member.RoleType;
import team1.toMyAnimal.exception.*;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.role.RoleRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SignService {

    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenHelper accessTokenHelper;
    private final TokenHelper refreshTokenHelper;

    @Transactional
    public void signUp(SignUpRequest req) {
        validateSignUpInfo(req);

        String encodedPassword = passwordEncoder.encode(req.getPassword());
        List<Role> roles = List.of(roleRepository.findByRoleType(RoleType.ROLE_USER).orElseThrow(RoleNotFoundException::new));
        memberRepository.save(
                new Member(req.getUserId(), req.getUserPhoneNumber(), req.getUsername(), encodedPassword, roles)
        );
    }

    @Transactional(readOnly = true)
    public SignInResponse signIn(SignInRequest req) {
        Member member = memberRepository.findByUserId(req.getUserId()).orElseThrow(MemberNotFoundException::new);
        validatePassword(req, member);
        String subject = createSubject(member);
        String accessToken = accessTokenHelper.createToken(subject);
        String refreshToken = refreshTokenHelper.createToken(subject);
        return new SignInResponse(accessToken, refreshToken);
    }

    public RefreshTokenResponse refreshToken(String rToken) {
        validateRefreshToken(rToken);
        String subject = refreshTokenHelper.extractSubject(rToken);
        String accessToken = accessTokenHelper.createToken(subject);
        return new RefreshTokenResponse(accessToken);
    }

    private void validateRefreshToken(String rToken) {
        if (!refreshTokenHelper.validate(rToken)) {
            throw new AuthenticationEntryPointException();
        }
    }

    private void validateSignUpInfo(SignUpRequest req) {
        if (memberRepository.existsByUserId(req.getUserId()))
            throw new MemberIdAlreadyExistsException(req.getUserId());
        if (memberRepository.existsByUserPhoneNumber(req.getUserPhoneNumber()))
            throw new MemberPhoneNumberAlreadyExistsException(req.getUserPhoneNumber());
    }

    private void validatePassword(SignInRequest req, Member member) {
        if (!passwordEncoder.matches(req.getPassword(), member.getPassword())) {
            throw new LoginFailureException();
        }
    }

    private String createSubject(Member member) {
        return String.valueOf(member.getUserId());
    }


}
