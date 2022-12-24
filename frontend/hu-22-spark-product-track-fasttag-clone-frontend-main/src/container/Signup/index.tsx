import { Button, TextField, IconButton, InputAdornment, Grid, Box } from "@mui/material";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState, useEffect } from "react";
import { IPerson, IPersonError } from "../../model";
import "./index.css";
import { createUser } from "../../api.service"
import { Link, useHistory } from "react-router-dom";


const validate = (values: IPerson) => {
    
  const errors: IPersonError = {};

  var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if(!values.username) {
      errors.username = "Username is required";
  }

  if (!values.firstName) {
    errors.firstName = "First Name is required!";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name is required!";
  }

  if (!values.email) {
    errors.email = "Email is required!";
  } else if (!regex.test(values.email)) {
    errors.email = "This is not a valid email format!";
  }

  if (values.phoneNumber.length !== 10) {
    errors.email = "Phone number must be 10 digits!";
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


const SignUP = () => {

  const history = useHistory();

  const defaultValues: IPerson = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const defaultErrorMessage: IPersonError = {};

  const [formValues, setFormValues] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState(defaultErrorMessage);
  const [isSubmit, setIsSubmit] = useState(false);

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
    setIsSubmit(true);
  };
  
  //the user is created the moment we hit the submit button then why we are making the call in useEffect
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      createUser(formValues);
      setInterval(() => {
        history.push("/signin");
      }, 1000); 
    }
  }, [formErrors]);


  return (
    <>
      <div className="signup-main">

        <form onSubmit={handleSubmit} className="signup-form">
          
          {/* <h3 className="signup-Head" data-testid="fastTag">Fast Tag</h3> */}
          
          {/* <h1 className="signup-tagline" >Create User</h1> */}
          {/* <h3 className="signup-Head">Fast Tag</h3> */}
          <img className="signup-fastag-logo-1" src="images/fastTag.png"></img>
  
          
          <h1 className="signup-tagline">Create Your Account</h1>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                  <TextField
                    id="firstname-input"
                    name="firstName"
                    label="First Name"
                    type="text"
                    data-testid="firstName"
                    onChange={handleInputChange}
                    className="signup-textField"
                    InputProps={{ style: { fontSize: 13 } }}
                    InputLabelProps={{ style: { fontSize: 13 } }}
                  />
                  <p className="errors-signup">{formErrors.firstName}</p>
              </Grid>
              <Grid item xs={6}>
                  <TextField
                    id="lastname-input"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    onChange={handleInputChange}
                    className="signup-textField"
                    InputProps={{ style: { fontSize: 13 } }}
                    InputLabelProps={{ style: { fontSize: 13 } }}
                  />
                  <p className="errors-signup">{formErrors.lastName}</p>
              </Grid>
              <Grid className="email-box">
                  <TextField
                    id="email-input"
                    name="email"
                    label="Email id"
                    type="email"
                    onChange={handleInputChange}
                    className="signup-textField-email"
                    InputProps={{ style: { fontSize: 13 } }}
                    InputLabelProps={{ style: { fontSize: 13 } }}
                  />
                <p className="errors-signup">{formErrors.email}</p>
              </Grid>
              
              <Grid className="phone-number-box">
                  <TextField
                    id="phone-input"
                    name="phoneNumber"
                    label="Phone Number"
                    type="text"
                    onChange={handleInputChange}
                    className="signup-textField-phone"
                    InputProps={{ style: { fontSize: 13 } }}
                    InputLabelProps={{ style: { fontSize: 13 } }}
                  />
                  <p className="errors-signup">{formErrors.phoneNumber}</p>
              </Grid>


              <Grid item xs={6}>
                  <TextField
                    id="username-input"
                    name="username"
                    label="User Name"
                    type="text"
                    onChange={handleInputChange}
                    className="signup-textField"
                    InputProps={{ style: { fontSize: 13 } }}
                    InputLabelProps={{ style: { fontSize: 13 } }}
                  />
                  <p className="errors-signup">{formErrors.username}</p>
              </Grid>

              <Grid item xs={6}>
                  <TextField
                    id="password-input"
                    name="password"
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    onChange={handleInputChange}
                    className="signup-textField"
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
                      style: { fontSize: 13 },
                    }}

                    InputLabelProps={{ style: { fontSize: 13 } }}

                  />
                  <p className="errors-signup">{formErrors.password}</p>
              </Grid>


              <Grid item xs={12}>
                  <Button id="signup-submitButton" variant="contained" type="submit" data-testid="button">
                    Submit
                  </Button>
                  <br />
                  <p className="signup-register">Already Registered?</p>
                  <Link to="/signin"  className="signup-login">
                    Login
                  </Link>
              </Grid>
            </Grid>
          </Box>

          {Object.keys(formErrors).length === 0 && isSubmit && (
          <div className="ui message success signup-signinSuccess">Signed in successfully</div>
        )}
        </form>

      </div>
    </>
  );
};

export default SignUP;