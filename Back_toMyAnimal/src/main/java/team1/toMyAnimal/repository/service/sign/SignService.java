package team1.toMyAnimal.repository.service.sign;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.config.TokenHelper;
import team1.toMyAnimal.domain.dto.sign.SignInRequest;
import team1.toMyAnimal.domain.dto.sign.SignUpRequest;
import team1.toMyAnimal.domain.dto.sign.SignInResponse;
import team1.toMyAnimal.domain.dto.sign.RefreshTokenResponse;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.domain.member.Role;
import team1.toMyAnimal.domain.member.RoleType;
import team1.toMyAnimal.exception.*;
import team1.toMyAnimal.repository.member.MemberRepository;
import team1.toMyAnimal.repository.role.RoleRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
                new Member(req.getIdentifier(), req.getPhoneNumber(), req.getName(), encodedPassword, req.getEmail(),roles)
        );
    }

    @Transactional(readOnly = true)
    public SignInResponse signIn(SignInRequest req) {

        Member member = memberRepository.findByIdentifier(req.getIdentifier()).orElseThrow(MemberNotFoundException::new);
        validatePassword(req, member);
        String subject = createSubject(member);
        String accessToken = accessTokenHelper.createToken(subject);
        String refreshToken = refreshTokenHelper.createToken(subject);
        Long memberId = member.getId();

        return new SignInResponse(accessToken, refreshToken, memberId);
    }

    public RefreshTokenResponse refreshToken(String rToken) {
        validateRefreshToken(rToken);
        String subject = refreshTokenHelper.extractSubject(rToken);
        String accessToken = accessTokenHelper.createToken(subject);
        return new RefreshTokenResponse(accessToken);
    }

    private void validateRefreshToken(String rToken) {
        if(!refreshTokenHelper.validate(rToken)) {
            throw new AuthenticationEntryPointException();
        }
    }

    private void validateSignUpInfo(SignUpRequest req) {
        if(memberRepository.existsByIdentifier(req.getIdentifier()))
            throw new MemberIdAlreadyExistsException(req.getIdentifier());
        if(memberRepository.existsByPhoneNumber(req.getPhoneNumber()))
            throw new MemberPhoneNumberAlreadyExistsException(req.getPhoneNumber());
    }

    private void validatePassword(SignInRequest req, Member member) {
        if(!passwordEncoder.matches(req.getPassword(), member.getPassword())) {
            throw new LoginFailureException();
        }
    }

    private String createSubject(Member member) {
        return String.valueOf(member.getId());
    }

    public void logout(HttpServletRequest req) {
        HttpSession session = req.getSession();
        session.invalidate();
    }


}
