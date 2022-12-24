package com.productmonth.fasttag.Controller;

import com.productmonth.fasttag.Entity.Role;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import com.productmonth.fasttag.Service.RoleService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping(value = "/role")
    @PreAuthorize("hasRole('Admin')")
    @ApiOperation(value = "Create New Role", notes = "Authentication & Admin Role Required")
    public Response<Role> createNewRole(@RequestBody Role role) {
        log.info("Adding new Role");
        Role createdRole = roleService.createNewRole(role);
        Response<Role> response = new Response<>();
        response.setBody(createdRole);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

    @GetMapping(value = "/role/{roleName}")
    @PreAuthorize("hasRole('Admin')")
    @ApiOperation(value = "Get Specific Role Details", notes = "Authentication & Admin Role Required")
    public Response<Role> getRole(@ApiParam(value = "roleName indicate the role name(Admin, User)", required=true) @PathVariable String roleName) {
        log.info("Fetch the Role " + roleName);
        Role role = roleService.getRoleByName(roleName);
        Response<Role> response = new Response<>();
        response.setBody(role);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/role/{roleName}", method = RequestMethod.PUT)
    @ApiOperation(value = "Update Specific Role", notes = "Authentication & Admin Role Required")
    @PreAuthorize("hasRole('Admin')")
    public Response<Role> updateRole(@ApiParam(value = "roleName indicate the role name(Admin, User)", required=true)  @PathVariable String roleName,
                                     @RequestBody Role role) {
        log.info("Update the Role " + roleName);
        Role updateRole = roleService.updateRole(role, roleName);
        Response<Role> response = new Response<>();
        response.setBody(updateRole);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }


    @RequestMapping(value = "/role/{roleName}", method = RequestMethod.DELETE)
    @ApiOperation(value = "Delete Specific Role", notes = "Authentication & Admin Role Required")
    @PreAuthorize("hasRole('Admin')")
    public Response<String> deleteRole(@ApiParam(value = "roleName indicate the role name(Admin, User)", required=true)  @PathVariable String roleName) {
        log.info("Delete the Role " + roleName);
        String message = roleService.deleteRole(roleName);
        Response<String> response = new Response<>();
        response.setBody(message);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }

}