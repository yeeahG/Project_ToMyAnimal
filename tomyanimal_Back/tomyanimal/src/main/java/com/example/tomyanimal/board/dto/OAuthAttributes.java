package com.example.tomyanimal.board.dto;

import com.example.tomyanimal.model.Member;
//import com.example.tomyanimal.model.RoleName;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String userId;
    private String userPhoneNumber;
    private String userName;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes, String nameAttributeKey, String userId, String userPhoneNumber, String userName) {
        this.attributes = attributes;
        this.nameAttributeKey = nameAttributeKey;
        this.userId = userId;
        this.userPhoneNumber = userPhoneNumber;
        this.userName = userName;
    }

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes) {
        return ofLogin(userNameAttributeName, attributes);
    }

    public static OAuthAttributes ofLogin(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .userId((String) attributes.get("userId"))
                .userPhoneNumber((String) attributes.get("phoneNumber"))
                .userName((String) attributes.get("username"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public Member toEntity() {
        return Member.builder()
                .userId(userId)
                .phoneNumber(userPhoneNumber)
                .username(userName)
//                후에 권한 부여 관련 설정
//                .role(RoleName.ROLE_GUEST)
                .build();
    }
}
