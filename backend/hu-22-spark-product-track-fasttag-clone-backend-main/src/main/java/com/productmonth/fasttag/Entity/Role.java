package com.productmonth.fasttag.Entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@ApiModel(description = "Each User can have multiple Role")
public class Role {

    @Id
    @ApiModelProperty(notes="Role Name required field")
    private String roleName;

    @ApiModelProperty(notes="Role details required field")
    private String description;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isAdminRole() {
        return roleName.equals("Admin");
    }
}
