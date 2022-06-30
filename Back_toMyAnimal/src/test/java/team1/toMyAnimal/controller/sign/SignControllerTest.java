package team1.toMyAnimal.controller.sign;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import team1.toMyAnimal.domain.dto.sign.SignInRequest;
import team1.toMyAnimal.domain.dto.sign.SignInResponse;
import team1.toMyAnimal.domain.dto.sign.SignUpRequest;
import team1.toMyAnimal.domain.member.Member;
import team1.toMyAnimal.service.sign.SignService;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class SignControllerTest {
    @InjectMocks
    SignController signController;
    Member member;
    @Mock
    SignService signService;
    MockMvc mockMvc;
    ObjectMapper objectMapper = new ObjectMapper(); // 1

    @BeforeEach
    void beforeEach() {
        mockMvc = MockMvcBuilders.standaloneSetup(signController).build();
    }

    @Test
    void signUpTest() throws Exception {
        // given
        SignUpRequest req = new SignUpRequest("id1","01012345678", "name", "password", "email@naver.com");

        // when, then
        mockMvc.perform(
                        post("/api/signup")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(req))) // 2
                .andExpect(status().isCreated());

        verify(signService).signUp(req);
    }

    @Test
    void signInTest() throws Exception {
        // given
        SignInRequest req = new SignInRequest("email@id1.com", "password!");
        given(signService.signIn(req)).willReturn(new SignInResponse("access", "refresh", member.getId()));

        // when, then
        mockMvc.perform(
                        post("/api/signin")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.data.accessToken").value("access")) // 3
                .andExpect(jsonPath("$.result.data.refreshToken").value("refresh"));

        verify(signService).signIn(req);
    }

    @Test
    void ignoreNullValueInJsonResponseTest() throws Exception { // 4
        // given
        SignUpRequest req = new SignUpRequest("id1","01012345678", "name", "password", "email@naver.com");

        // when, then
        mockMvc.perform(
                        post("/api/signup")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(req)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.result").doesNotExist());

    }
}