package com.productmonth.fasttag.Controller;

import com.productmonth.fasttag.Dto.JwtRequest;
import com.productmonth.fasttag.Dto.JwtResponse;
import com.productmonth.fasttag.Pojo.Response;
import com.productmonth.fasttag.Pojo.Status;
import com.productmonth.fasttag.Service.JwtService;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@Slf4j
public class JwtController {

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    @ApiOperation(value = "Log in the user", notes = "Use jwt token for authorization ")
    public Response<JwtResponse> createJwtToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        log.info("Authenticating...user by creating new token with userDetails");
        JwtResponse createdToken = jwtService.createJwtToken(jwtRequest);
        Response<JwtResponse> response = new Response<>();
        response.setBody(createdToken);
        response.setStatus(new Status(200, "SUCCESS", "SUCCESS"));
        return response;
    }
}
