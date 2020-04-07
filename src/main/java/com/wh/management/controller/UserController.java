package com.wh.management.controller;

import com.wh.management.support.Result;
import com.wh.management.bean.User;
import com.wh.management.dao.UserRepository;
import com.wh.management.support.Token;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@RestController
@RequestMapping("user")
public class UserController extends BaseController{

    @Resource
    private UserRepository userRepository;

    @GetMapping("/login")
    public Result<?> login(User user){
        String token;
        try {
            if (user.getUserId() == null
                    || user.getPassword() == null) {
                throw new IllegalArgumentException("args error!");
            }
            token = Token.build(userRepository.findOne(Example.of(user.setYn(1))).orElseThrow(NullPointerException::new));
        } catch (Exception e) {
           return Result.err();
        }

        return Result.ok(token);
    }

    @GetMapping("/list")
    public Result<?> list(){
        List<User> users = userRepository.findAll();
        return Result.ok(users);
    }

    @PutMapping("/add")
    public Result<?> add(@RequestBody User user){
        User ret = userRepository.save(user);
        return Result.ok(ret);
    }

    @DeleteMapping("/del")
    public Result<?> del(@RequestParam Integer id){
        if(id == null){
            return Result.err();
        }

        userRepository.delete(new User().setId(id));
        return Result.ok("deleted id: " + id);
    }

}
