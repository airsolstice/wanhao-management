package com.wh.management.bean;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Date;


/**
 * TODO jsr check
 *
 */
@Data
@Entity
@Table(name = "tb_user")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Integer id;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "password")
    private String password;
    @Column(name = "name")
    private String name;
    @Column(name = "role")
    private String role;
    @Column(name = "id_card")
    private String idCard;
    @Column(name = "salary")
    private Double salary;
    @Column(name = "status")
    private Integer status;
    @Column(name = "start")
    private Date start;
    @Column(name = "end")
    private Date emd;
    @Column(name="created")
    private Date created;
    @Column(name="modified")
    private Date modified;
    @Column(name="yn")
    private Integer yn;

}
