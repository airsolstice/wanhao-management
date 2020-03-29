package com.wh.management.controller;

import com.wh.management.support.Result;
import com.wh.management.bean.User;
import com.wh.management.dao.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

    @Resource
    private UserRepository userRepository;

    @GetMapping("/list")
    public Result<?> list(){
        List<User> users = userRepository.findAll();
        return Result.ok(users);
    }

    @PutMapping("add")
    public Result<?> add(@RequestBody User user){
        User ret = userRepository.save(user);
        return Result.ok(ret);
    }

    @DeleteMapping("del")
    public Result<?> del(@RequestParam Integer id){
        if(id == null){
            return Result.err();
        }

        userRepository.delete(new User().setId(id));
        return Result.ok("deleted id: " + id);
    }



}
