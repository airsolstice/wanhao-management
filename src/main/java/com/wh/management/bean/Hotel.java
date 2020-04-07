package com.wh.management.bean;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.Date;


/**
 * TODO jsr check
 *
 */
@Data
@Entity
@Table(name = "tb_hotel")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "addr")
    private String addr;
    @Column(name = "things")
    private String things;
    @Column(name = "tel")
    private String tel;
    @Column(name = "compensation")
    private String compensation;
    @Column(name = "furl")
    private String furl;
    @Column(name="created")
    private Date created;
    @Column(name="modified")
    private Date modified;
    @Column(name="yn")
    private Integer yn;

}
