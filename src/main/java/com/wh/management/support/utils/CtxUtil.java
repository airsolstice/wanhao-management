package com.wh.management.support.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;

/**
 * @author <a href="mailto:liuhan5@lenovo.com">HanL(liuhan5)</a>
 * @date 2018/12/25 14:00
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class CtxUtil {

    private static ApplicationContext CONTEXT;

    public static void bindContext(ApplicationContext ctx) {
        CONTEXT = ctx;
    }

    public static Environment getEnv() {
        return CONTEXT.getEnvironment();
    }

    public static <T> T getBean(Class<T> type) {
        return CONTEXT.getBean(type);
    }

    public static <T> T getBean(String beanName, Class<T> type) {
        return CONTEXT.getBean(beanName, type);
    }

    public static String getMessage(String strFormatter, Object... objects) {
        return CONTEXT.getMessage(strFormatter, objects, LocaleContextHolder.getLocale());
    }

    public static void publish(Object object) {
        CONTEXT.publishEvent(object);
    }

    public static String getProperty(String name) {
        return getEnv().getProperty(name);
    }

    public static String getProperty(String name, String defaultStr) {
        return getEnv().getProperty(name, defaultStr);
    }

    public static <T> T getProperty(String name, Class<T> type) {
        return getEnv().getProperty(name, type);
    }

    public static <T> T getProperty(String name, Class<T> type, T defaultValue) {
        return getEnv().getProperty(name, type, defaultValue);
    }
}