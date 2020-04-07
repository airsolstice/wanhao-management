package com.wh.management.support.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Map;

import static java.util.stream.Collectors.toMap;


@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CookieUtil {

    /**
     * write cookie.
     *
     * @param response
     * @param key
     * @param value
     * @param expire
     * @return
     */
    public static HttpServletResponse put(HttpServletResponse response, String key, String value, int expire) {
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(expire);
        response.addCookie(cookie);
        return response;
    }

    /**
     * write cookie.
     *
     * @param response
     * @param key
     * @param value
     * @return
     */
    public static HttpServletResponse put(HttpServletResponse response, String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(30 * 60);
        response.addCookie(cookie);
        return response;
    }

    public static void remove(HttpServletResponse response, String key) {
        Cookie cookie = new Cookie(key, null);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    /**
     * get cookie.
     *
     * @param request
     * @param key
     * @return
     */
    public static Cookie getCookie(HttpServletRequest request, String key) {
        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(key))
                .findAny().orElse(null);
    }

    /**
     * get cookie.
     *
     * @param request
     * @param key
     * @return
     */
    public static String getString(HttpServletRequest request, String key) {
        if (request.getCookies() == null) {
            return null;
        }
        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(key))
                .findAny()
                .map(Cookie::getValue)
                .orElse(null);
    }

    /**
     * get cookie with map.
     *
     * @param request
     * @return
     */
    public static Map<String, String> asMap(HttpServletRequest request) {
        return Arrays.stream(request.getCookies())
                .collect(toMap(Cookie::getName, Cookie::getValue));
    }
}