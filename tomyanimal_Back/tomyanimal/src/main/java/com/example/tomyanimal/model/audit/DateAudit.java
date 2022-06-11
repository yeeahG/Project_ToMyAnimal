package com.example.tomyanimal.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.time.Instant;

//데이터의 Create,Update를 감시하고 이벤트를 감지하기 위해 작성 해 줄 클래스
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updateAt"}, allowGetters = true)
@Getter
@Setter
public class DateAudit implements Serializable {
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private Instant createAt;

    @LastModifiedDate
    @Column(nullable = false, updatable = false)
    private Instant updateAt;

}