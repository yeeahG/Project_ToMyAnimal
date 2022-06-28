package team1.toMyAnimal.service.member;

import lombok.RequiredArgsConstructor;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team1.toMyAnimal.domain.dto.member.MemberDto;
import team1.toMyAnimal.domain.dto.member.MemberReadCondition;
import team1.toMyAnimal.domain.dto.member.MemberUpdateRequest;
import team1.toMyAnimal.domain.dto.member.MemberUpdateResponse;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.exception.MemberNotFoundException;
import team1.toMyAnimal.repository.member.MemberRepository;

import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberDto read(MemberReadCondition cond) {
        return MemberDto.toDto(memberRepository.findById(cond.getMemberId()).orElseThrow(MemberNotFoundException::new));
    }

    @Transactional
    public void delete(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(MemberNotFoundException::new);
        memberRepository.delete(member);
    }

    @Transactional
    public MemberUpdateResponse update(Long id, MemberUpdateRequest req) {
        Member member = memberRepository.findById(id).orElseThrow(MemberNotFoundException::new);
        member.updateUserInfo(req);
        return new MemberUpdateResponse(id);

    }

    public void findPw(HttpServletResponse response, Member member) {
    }

//    public void sendEmail(Member member, String div) throws Exception {
//        // Mail Server 설정
//        String charSet = "utf-8";
//        String hostSMTP = "smtp.naver.com"; //네이버 이용시 smtp.naver.com
//        String hostSMTPid = "서버 이메일 주소(보내는 사람 이메일 주소)";
//        String hostSMTPpwd = "서버 이메일 비번(보내는 사람 이메일 비번)";
//
//        // 보내는 사람 EMail, 제목, 내용
//        String fromEmail = "보내는 사람 이메일주소(받는 사람 이메일에 표시됨)";
//        String fromName = "프로젝트이름 또는 보내는 사람 이름";
//        String subject = "";
//        String msg = "";
//
//        if (div.equals("api/member/my-password")) {
//            subject = "베프마켓 임시 비밀번호 입니다.";
//            msg += "<div align='center' style='border:1px solid black; font-family:verdana'>";
//            msg += "<h3 style='color: blue;'>";
//            msg += member.getId() + "님의 임시 비밀번호 입니다. 비밀번호를 변경하여 사용하세요.</h3>";
//            msg += "<p>임시 비밀번호 : ";
//            msg += member.getPassword() + "</p></div>";
//        }
//
//        // 받는 사람 E-Mail 주소
//        String mail = member.getEmail();
//        try {
//            HtmlEmail email = new HtmlEmail();
//            email.setDebug(true);
//            email.setCharset(charSet);
//            email.setSSL(true);
//            email.setHostName(hostSMTP);
//            email.setSmtpPort(465); //네이버 이용시 587
//
//            email.setAuthentication(hostSMTPid, hostSMTPpwd);
//            email.setTLS(true);
//            email.addTo(mail, charSet);
//            email.setFrom(fromEmail, fromName, charSet);
//            email.setSubject(subject);
//            email.setHtmlMsg(msg);
//            email.send();
//        } catch (Exception e) {
//            System.out.println("메일발송 실패 : " + e);
//        }
//    }
////        비밀번호찾기
//        public void findPw(HttpServletResponse response, Member member) throws Exception {
//            response.setContentType("text/html;charset=utf-8");
//            Member ck = mdao.readMember(member.getId());
//            PrintWriter out = response.getWriter();
//            // 가입된 아이디가 없으면
//            if (mdao.idCheck(member.getId()) == null) {
//                out.print("등록되지 않은 아이디입니다.");
//                out.close();
//            }
//            // 가입된 이메일이 아니면
//            else if (!member.getEmail().equals(ck.getEmail())) {
//                out.print("등록되지 않은 이메일입니다.");
//                out.close();
//            } else {
//                // 임시 비밀번호 생성
//                String pw = "";
//                for (int i = 0; i < 12; i++) {
//                    pw += (char) ((Math.random() * 26) + 97);
//                }
//                member.setPw(pw);
//                // 비밀번호 변경
//                mdao.updatePw(vo);
//                // 비밀번호 변경 메일 발송
//                sendEmail(member, "findpw");
//
//                out.print("이메일로 임시 비밀번호를 발송하였습니다.");
//                out.close();
//            }
//        }

}
