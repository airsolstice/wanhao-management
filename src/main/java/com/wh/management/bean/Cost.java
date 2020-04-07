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
@Table(name = "tb_cost")
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
public class Cost {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "type")
    private Integer type;
    @Column(name = "amount")
    private String amount;
    @Column(name = "unit")
    private String unit;
    @Column(name = "operator")
    private String operator;
    @Column(name = "checked")
    private boolean checked;
    @Column(name = "checker")
    private String checker;
    @Column(name="created")
    private Date created;
    @Column(name="modified")
    private Date modified;
    @Column(name="yn")
    private Integer yn;

}
