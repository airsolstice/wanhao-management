package com.wh.management.support;

import com.alibaba.fastjson.JSON;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.wh.management.support.utils.ObjectUtil;
import lombok.*;

import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;


@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Token {

    private static final String SECRET = "secret";
    private static final String ISSUER = "auth0";

    @Data
    @AllArgsConstructor
    private static class Entry{
        private String key;
        private Object val;
    }


    public static <R> R verify(String token,  Class<R> clazz) throws JWTVerificationException {
        return verify(token, SECRET, ISSUER, clazz);
    }

    public static <R> R verify(String token, String secret, String issuer, Class<R> clazz) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(issuer)
                .build();
        Map<String, Object> properties = verifier.verify(token)
                .getClaims().entrySet()
                .stream()
                .map((set) -> new Entry(set.getKey(), set.getValue().as(Object.class)))
                .collect(Collectors.toMap(Entry::getKey, Entry::getVal));

        return JSON.parseObject(JSON.toJSONString(properties), clazz);
    }

    public static String build(Object obj) {
        return build(obj, SECRET, ISSUER);
    }

    public static String build(Object obj, String secret, String issuer) {
        Algorithm algorithm = Algorithm.HMAC256(secret);
        Map<String, Object> properties = ObjectUtil.obj2Map(obj);
        JWTCreator.Builder builder = JWT.create()
                .withIssuer(issuer);

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