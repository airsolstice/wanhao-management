package com.wh.management.support;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Result<T> {

    private static final int OK = 200;
    private static final String SUCCESS = "success.";

    private static final int ERR = 500;
    private static final String FAILED = "failed.";


    private int code;
    private String msg;
    private T data;

    @Builder
    public Result(int code, String msg, T data){
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    /**
     * it's ok.
     *
     * @param data
     * @return
     */
    public static  Result<?> ok(Object data) {
        return Result.builder()
                .code(Result.OK)
                .msg(Result.SUCCESS)
                .data(data).build();
    }

    /**
     * it's err, return a common msg, it present that reason is unknown.
     *
     * @return
     */
    public static  Result<?> err() {
        return Result.builder()
                .code(Result.ERR)
                .msg(Result.FAILED).build();
    }

    /**
     * it's a special err, could specify code and msg.
     *
     * @param code
     * @param msg
     * @return
     */
    public static Result<?> get(int code, String msg) {
        return Result.builder()
                .code(code)
                .msg(msg).build();
    }

}
