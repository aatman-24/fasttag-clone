package com.productmonth.fasttag.Service;

import com.productmonth.fasttag.Dto.UserDto;
import com.productmonth.fasttag.Entity.*;
import com.productmonth.fasttag.Exception.AlreadyFoundException;
import com.productmonth.fasttag.Exception.NotFoundException;
import com.productmonth.fasttag.Repository.RoleRepository;
import com.productmonth.fasttag.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private VehicleServices vehicleServices;

    /*Q->How we can ensure that only one admin will be their??
    And->We are creating the admin user everytime but the username is same and we are using the save
    method to save inside the db and what does this save method do if the username(id of entity) is not their
    it will save inside the db and if it is their it will do the update so the first time the admin
    user is created and for the next time it is updated with the same field and hence we are not
    able to see any-change inside the DB.*/
    //Q->Like everytime we start the system one admin will be created??
    public String initRoleAndUser() {
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setDescription("Admin role");
        roleRepository.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setDescription("Default role for newly created record");
        roleRepository.save(userRole);

        User adminUser = new User();
        adminUser.setUsername("admin");
        adminUser.setPassword(getEncodedPassword("pass123"));
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRoles(adminRoles);
        adminUser.setEmail("admin@gmail.com");
        adminUser.setFirstName("Raj");
        adminUser.setLastName("Patel");
        adminUser.setMobileNumber("1234567890");
        userRepository.save(adminUser);
        return "Role and Admin Created!";
    }


    public User getUserByName(String username) {
        if(userRepository.findById(username).isPresent()) {
            return userRepository.findById(username).get();
        }
        throw new NotFoundException("User not found with username " + username);
    }

    public User getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return getUserByName(username);
    }



    public User registerNewUser(UserDto userDto) {
        Role role = roleRepository.findById(userDto.getRole()).get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);

        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setFirstName(userDto.getFirstName());
        user.setPassword(getEncodedPassword(userDto.getPassword()));
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setMobileNumber(userDto.getMobileNumber());
        user.setRoles(userRoles); //how it is possible that a single user can have multiple roles??

        return userRepository.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }


    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }



    public User updateUser(String username, User updatedUser) {
        User user = getUserByName(username);
        if(!user.getUsername().equals(updatedUser.getUsername())) {
            throw new NotFoundException("UserID doesn't match.");
        }
        user.setPassword(getEncodedPassword(updatedUser.getPassword()));
        user.setRoles(updatedUser.getRoles());
        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setEmail(updatedUser.getEmail());
        user.setMobileNumber(updatedUser.getMobileNumber());
        return userRepository.save(user);
    }



    public User updateUserByPatch(String username, UserDto userDto) {

        User user = getUserByName(username);

        if(!user.getUsername().equals(userDto.getUsername())) {
            throw new NotFoundException("Username doesn't match.");
        }

        if(userDto.getPassword() != null) {
            user.setPassword(getEncodedPassword(userDto.getPassword()));
        }

        if(userDto.getEmail() != null) {
           user.setEmail(userDto.getEmail());
        }

        if(userDto.getRole() != null) {
            Role role = roleRepository.findById(userDto.getRole()).get();
            Set<Role> userRoles = new HashSet<>();
            userRoles.add(role);
            user.setRoles(userRoles);
        }

        if(userDto.getFirstName() != null) {
            user.setFirstName(userDto.getFirstName());
        }

        if(userDto.getLastName() != null) {
            user.setLastName((userDto.getLastName()));
        }

        if(userDto.getMobileNumber() != null) {
            user.setMobileNumber(userDto.getMobileNumber());
        }

        return userRepository.save(user);
    }




    public User updateLoggedUserByPatch(UserDto userDto) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = getUserByName(username);

        //it means we are expecting a username from the front-end also then this update will happen
        if(!user.getUsername().equals(userDto.getUsername())) {
            throw new NotFoundException("Username doesn't match.");
        }

        if(userDto.getPassword() != null) {
            user.setPassword(getEncodedPassword(userDto.getPassword()));
        }

        if(userDto.getEmail() != null) {
            user.setEmail(userDto.getEmail());
        }

        if(userDto.getFirstName() != null) {
            user.setFirstName(userDto.getFirstName());
        }

        if(userDto.getLastName() != null) {
            user.setLastName((userDto.getLastName()));
        }

        if(userDto.getMobileNumber() != null) {
            user.setMobileNumber(userDto.getMobileNumber());
        }

        return userRepository.save(user);
    }

    public User updateLoggedUserByPut(UserDto userDto){
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = getUserByName(username);

        //it means we are expecting a username from the front-end also then this update will happen
        if(!user.getUsername().equals(userDto.getUsername())) {
            throw new NotFoundException("Username doesn't match.");
        }

        if(userDto.getPassword() != null) {
            user.setPassword(getEncodedPassword(userDto.getPassword()));
        }

        if(userDto.getEmail() != null) {
            user.setEmail(userDto.getEmail());
        }

        if(userDto.getFirstName() != null) {
            user.setFirstName(userDto.getFirstName());
        }

        if(userDto.getLastName() != null) {
            user.setLastName((userDto.getLastName()));
        }

        if(userDto.getMobileNumber() != null) {
            user.setMobileNumber(userDto.getMobileNumber());
        }

        return userRepository.save(user);
    }

    public String deleteUser(String username) {
        User user = getUserByName(username);
        userRepository.delete(user);
        return "User Deleted SuccessFully!";
    }


    public User removeRole(String username, String roleName) {
        User user = getUserByName(username);
        Role role = roleService.getRoleByName(roleName);

        if(!user.getRoles().contains(role)) {
            throw new NotFoundException("Role " + roleName + " Not found for " + username);
        }

        user.getRoles().remove(role);

        return userRepository.save(user);
    }


    public User addRole(String username, String roleName) {
        User user = getUserByName(username);
        Role role = roleService.getRoleByName(roleName);

        if(user.getRoles().contains(role)) {
            throw new NotFoundException("Role " + roleName + " is already given to " + username);
        }

        user.getRoles().add(role);

        return userRepository.save(user);
    }



    public User addVehicle(String username, String numberPlate) {
        User user = getUserByName(username);
        Vehicle vehicle = vehicleServices.getVehicleByNumberPlate(numberPlate);

        if(user.getVehicles().contains(vehicle)) {
            throw new AlreadyFoundException("Vehicle with " + numberPlate + "number plate already exists.");
        }

        user.addVehicle(vehicle);

        return userRepository.save(user);
    }



    public User removeVehicle(String username, String numberPlate) {
        User user = getUserByName(username);
        Vehicle vehicle = vehicleServices.getVehicleByNumberPlate(numberPlate);

        if(!user.getVehicles().contains(vehicle)) {
            throw new NotFoundException("Vehicle with " + numberPlate + " number plate not found.");
        }

        user.removeVehicle(vehicle);

        return userRepository.save(user);
    }

}
