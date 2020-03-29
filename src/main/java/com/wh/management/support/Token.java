package com.wh.management.support;

import com.alibaba.fastjson.JSON;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.wh.management.bean.User;
import com.wh.management.support.utils.CtxUtil;
import com.wh.management.support.utils.ObjectUtil;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;


@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Token {

    private static final String SECRET = "secret";
    private static final String JWT_ISSUER = "jwt.issuer";
    private static final String JWT_ISSUER_DEFAULT = "auth0";

    public static void main(String[] args) {
        String token = Token.build(new User().setId(1).setName("admin"));
        System.out.println(token);
        Token.verify(token, User.class);
    }

    public static <R> R verify(String token, Class<R> clazz) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(JWT_ISSUER_DEFAULT)
                .build();
        Map<String, Object> properties = verifier.verify(token)
                .getClaims().entrySet()
                .stream().map((set) -> {
                    return set;
                }).collect(Collectors.toMap());
        return JSON.parseObject(JSON.toJSONString(properties), clazz);
    }

    public static String build(Object obj) {
        Algorithm algorithm = Algorithm.HMAC256(SECRET);
        Map<String, Object> properties = ObjectUtil.obj2Map(obj);
        JWTCreator.Builder builder = JWT.create()
                .withIssuer(JWT_ISSUER_DEFAULT);

        if(properties.size() == 0){
            return "";
        }
        properties.forEach((key, val) -> {
            if (val == null) {
                return;
            }

            if (val instanceof Date) {
                builder.withClaim(key, (Date) val);
            } else if (val instanceof Double) {
                builder.withClaim(key, (Double) val);
            } else if (val instanceof Boolean) {
                builder.withClaim(key, (Boolean) val);
            } else if (val instanceof Integer) {
                builder.withClaim(key, (Integer) val);
            } else if (val instanceof Long) {
                builder.withClaim(key, (Long) val);
            } else {
                builder.withClaim(key, String.valueOf(val));
            }
        });

        return builder.sign(algorithm);
    }
}