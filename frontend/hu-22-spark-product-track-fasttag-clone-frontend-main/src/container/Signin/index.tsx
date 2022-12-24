import { Button, TextField, IconButton, InputAdornment, Grid, Box } from "@mui/material";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState, useEffect } from "react";
import "./index.css";
import {login} from "../../api.service"
import { Link, useHistory } from "react-router-dom"
import {ILogin, ILoginError} from "../../model"

const validate = (values: ILogin) => {
    
  const errors: ILoginError = {};

  if (!values.username) {
    errors.username = "Username is required!";
  } 

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters";
  } else if (values.password.length > 10) {
    errors.password = "Password cannot exceed more than 10 characters";
  }

  return errors;
};


const SignIn = () => {

  const history = useHistory();
  
  const defaultValues: ILogin = {
    username: "",
    password: "",
  };

  const defaultErrorMessage: ILoginError = {};

  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(defaultErrorMessage);
  const [isSubmit, setIsSubmit] = useState(false);


  const [accessErrorMessage, setaccessErrorMessage] = useState("");
  const [accessError, setaccessError] = useState(false);

 
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    console.log("Hnalde Sumbit");
    setIsSubmit(true);
  };

  useEffect( () =>  {
    
    if (Object.keys(formErrors).length === 0 && isSubmit) {

      login(formValues).then((res:any) => {

        console.log(res);

        if(res && res.status.statusCode=== 200) {
          // if(res && res.status === 200) {


          localStorage.setItem('token', res.body.jwtToken);
          //hould we need to save the username for the logged in user???
          console.log("getting the response from the backend is ",res);

          setaccessError(false);

          // window.location.href = "/dashboard";
          history.push("/dashboard");
        }
        else {
          setaccessError(true);
          setaccessErrorMessage("Access Denied!");
        }
      });
    }
  }, [formErrors, accessError]);


  return (
    <>
      <div className="signin-main">
        
        <form onSubmit={handleSubmit} className="signin-form">

          <img className="fastag-logo" src="images/fastTag.png"></img>
          
          <h3 className="signin-head" data-testid="header">Login</h3>

          <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2}>
            
              <Grid item xs={12}>
            
                <TextField
                  id="username-input"
                  name="username"
                  label="Username"
                  type="text"
                  data-testid="username"
                  onChange={handleInputChange}
                  className="signin-textField"
                  InputProps={{ style: { fontSize: 13 } }}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                />
                <p className="errors-login">{formErrors.username}</p>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="password-input"
                  name="password"
                  label="Password"
                  data-testid="password"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange}
                  className="signin-textField"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    style: { fontSize: 13 }
                  }}
                  InputLabelProps={{ style: { fontSize: 13 } }}
                />
                <p className="errors-login" >{formErrors.password}</p>
              </Grid>

              <Grid item xs={12}>
                <Button id="signin-submitButton" variant="contained" type="submit" data-testid="login">
                  Log In
                </Button>
                <br />
                <p className="signin-register">Don't have an account?</p>
                <Link to="/signup"  className="signin-login">
                    Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>

          {Object.keys(formErrors).length === 0 && accessError && (
            <div className="ui message success">{accessErrorMessage}</div>
          )}
        </form>
      </div>
    </>
  );
};

export default SignIn;