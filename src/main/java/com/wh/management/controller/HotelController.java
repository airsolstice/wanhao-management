package com.wh.management.controller;

import com.wh.management.bean.User;
import com.wh.management.support.Result;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("hotel")
public class HotelController extends BaseController {

    @GetMapping("/list")
    public Result<?> list(){
        return Result.err();
    }

    @PutMapping("/add")
    public Result<?> add(@RequestBody User user){
        return Result.err();
    }

    @DeleteMapping("/del")
    public Result<?> del(@RequestParam Integer id){
        return Result.err();
    }
}
