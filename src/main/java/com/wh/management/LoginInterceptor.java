package com.wh.management;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.common.collect.Sets;
import com.wh.management.bean.User;
import com.wh.management.support.Token;
import com.wh.management.support.utils.CookieUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;
import java.util.Optional;
import java.util.Set;



@Component
public class LoginInterceptor implements HandlerInterceptor {

    private Set<String> ignores = Sets.newHashSet(
            "user/login"
    );

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        try {
            if(ignores.stream()
                    .anyMatch(ignore -> request.getRequestURI().indexOf(ignore)>0)){
                return true;
            }
            // get token
            String token = Optional
                    .ofNullable(CookieUtil.getString(request, "token"))
                    .orElse(Optional.ofNullable(request.getHeader("token"))
                            .orElse(request.getParameter("token")));

            if (StringUtils.isBlank(token)) {
                throw new IllegalArgumentException("token not be null.");
            }

            request.getSession().setAttribute("user", Token.verify(token, User.class));
            return true;
        } catch (Exception e) {
            try {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "something error!");
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
    }

}