package com.productmonth.fasttag.Controller;

import com.productmonth.fasttag.Dto.UserDto;
import com.productmonth.fasttag.Entity.User;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import com.productmonth.fasttag.Service.UserService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.annotation.PostConstruct;
import java.util.List;

@RestController
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public Response<String> initRoleAndUser() {
        log.info("Adding admin and roles into DB");
        String message = userService.initRoleAndUser();
        Response<String> response = new Response<>();
        response.setBody(message);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @PostMapping(value = "/register")
    @ApiOperation(value = "Create New User", notes = "No Authentication Required")
    public Response<User> registerNewUser(@RequestBody UserDto userDto) {
        log.info("Creating new User");
        User createdUser = userService.registerNewUser(userDto);
        Response<User> response = new Response<>();
        response.setBody(createdUser);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @GetMapping(value = "/user/{userName}")
    @PreAuthorize("hasRole('Admin')")
    @ApiOperation(value = "Get User", notes = "Authentication & Admin Role Required")
    public Response<User> getUser(@PathVariable String userName) {
        log.info("Fetching User");
        User user = userService.getUserByName(userName);
        Response<User> response = new Response<>();
        response.setBody(user);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @GetMapping(value = "/user")
    @ApiOperation(value = "Get User", notes = "Authentication & Admin Role Required")
    public Response<User> getLoggedUser() {
        User user = userService.getUser();
        Response<User> response = new Response<>();
        response.setBody(user);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @GetMapping(value = "/users")
    @PreAuthorize("hasRole('Admin')")
    @ApiOperation(value = "Get All Users", notes = "Authentication & Admin Role Required")
    public Response<List<User>> getUsers() {
        log.info("Fetching All User");
        List<User> users = userService.getAllUsers();
        Response<List<User>> response = new Response<>();
        response.setBody(users);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/user/{userName}", method = RequestMethod.PUT)
    @PreAuthorize("hasRole('Admin')")
    @ApiOperation(value = "Update User", notes = "Authentication & Admin Role Required")
    public Response<User> updateUser(@PathVariable String userName, @RequestBody User user) {
        log.info("Updating User");
        User updatedUser = userService.updateUser(userName, user);
        Response<User>response = new Response<>();
        response.setBody(updatedUser);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value = "/user/{userName}", method = RequestMethod.PATCH)
    @PreAuthorize("hasRole('Admin')")
    @ApiOperation(value = "Update User By Patch", notes = "Authentication & Admin Role Required")
    public Response<User> updateUserByPatch(@PathVariable String userName, @RequestBody UserDto userDto) {
        log.info("Updating User");
        User updatedUser = userService.updateUserByPatch(userName, userDto);
        Response<User>response = new Response<>();
        response.setBody(updatedUser);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    //this api will be hit from the client-side when we have to do the update
    @RequestMapping(value = "/user", method = RequestMethod.PATCH)
    @ApiOperation(value = "Update User By Patch", notes = "Authentication & Admin Role Required")
    public Response<User> updateLoggedUser(@RequestBody UserDto userDto) {
        User updatedUser = userService.updateLoggedUserByPatch(userDto);
        Response<User>response = new Response<>();
        response.setBody(updatedUser);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @RequestMapping(value = "/user", method = RequestMethod.PUT)
    @ApiOperation(value = "Update User By Put", notes = "Authentication & Admin Role Required")
    public Response<User> updateLoggedUserByPut(@RequestBody UserDto userDto) {
        User updatedUser = userService.updateLoggedUserByPut(userDto);
        Response<User>response = new Response<>();
        response.setBody(updatedUser);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }



    @RequestMapping(value = "/user/{userName}", method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('Admin')")
    @ApiOperation(value = "Delete User", notes = "Authentication & Admin Role Required")
    public Response<String> deleteUser(@PathVariable String userName) {
        log.info("Deleting User");
        String message = userService.deleteUser(userName);
        Response<String>response = new Response<>();
        response.setBody(message);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/user/{userName}/add-role/{roleName}", method = RequestMethod.PATCH)
    @PreAuthorize("hasRole('Admin')")
    @ApiOperation(value = "Add Role For User", notes = "Authentication & Admin Role Required")
    public Response<User> addRole(@PathVariable String userName, @PathVariable String roleName) {
        log.info("Updating User Role");
        User user = userService.addRole(userName, roleName);
        Response<User>response = new Response<>();
        response.setBody(user);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/user/{userName}/remove-role/{roleName}", method = RequestMethod.PATCH)
    @PreAuthorize("hasRole('Admin')")
    @ApiOperation(value = "Remove Role For User", notes = "Authentication & Admin Role Required")
    public Response<User> removeRole(@PathVariable String userName, @PathVariable String roleName) {
        log.info("Updating User Role");
        User user = userService.removeRole(userName, roleName);
        Response<User>response = new Response<>();
        response.setBody(user);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/user/{userName}/add-vehicle/{numberplate}", method = RequestMethod.PATCH)
    @ApiOperation(value = "Add Vehicle For User", notes = "Authentication Required")
    public Response<User> addVehicle(@PathVariable String userName, @PathVariable String numberplate) {
        User user = userService.addVehicle(userName, numberplate);
        Response<User>response = new Response<>();
        response.setBody(user);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/user/{userName}/remove-vehicle/{numberplate}", method = RequestMethod.PATCH)
    @ApiOperation(value = "Add Vehicle For User", notes = "Authentication Required")
    public Response<User> removeVehicle(@PathVariable String userName, @PathVariable String numberplate) {
        User user = userService.removeVehicle(userName, numberplate);
        Response<User>response = new Response<>();
        response.setBody(user);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }
}
