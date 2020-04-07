package com.wh.management.controller;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public abstract class BaseController {

    private static ThreadLocal<HttpServletRequest> THREAD_LOCAL_REQUEST = new ThreadLocal<>();
    private static ThreadLocal<HttpServletResponse> THREAD_LOCAL_RESPONSE = new ThreadLocal<>();

    @ModelAttribute
    public void before(HttpServletRequest request, HttpServletResponse response) {
        THREAD_LOCAL_REQUEST.set(request);
        THREAD_LOCAL_RESPONSE.set(response);
    }

}