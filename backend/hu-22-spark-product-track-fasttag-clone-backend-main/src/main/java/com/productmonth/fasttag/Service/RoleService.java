package com.productmonth.fasttag.Service;

import com.productmonth.fasttag.Entity.Role;
import com.productmonth.fasttag.Exception.NotFoundException;
import com.productmonth.fasttag.Repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public Role getRoleByName(String roleName) {
        if(roleRepository.findById(roleName).isPresent()) {
            return roleRepository.findById(roleName).get();
        }
        throw new NotFoundException("Role not found with given role name " + roleName);
    }

    public Role createNewRole(Role role) {
        return roleRepository.save(role);
    }

    public Role updateRole(Role updatedRole, String roleName) {
        Role role =  getRoleByName(roleName);
        role.setDescription(updatedRole.getDescription());
        return roleRepository.save(role);
    }

    public String deleteRole(String roleName) {
        Role role = getRoleByName(roleName);
        roleRepository.delete(role);
        return "Role is deleted SuccessFully!";
    }

}