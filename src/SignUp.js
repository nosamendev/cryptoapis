import React, { useState, useRef } from 'react';
import TableRows from './TableRows';
import './SignUp.css';

function SignUp() {

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    terms: false
  });

  const [validation, setValidation] = useState({
    errorFname: "",
    errorLname: "",
    errorEmail: "",
    errorPassword: "",
    errorTerms: ""
  });

  const [profiles, setProfiles] = useState([]);

  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const termsRef = useRef(null);

  const checkValidation = () => {

    let formIsValid = true;

    //remove errors:
    setValidation(prevState => ({...prevState, 
      errorFname: "",
      errorLname: "",
      errorEmail: "",
      errorPassword: "",
      errorTerms: "",
    }));

    fnameRef.current.classList.remove('error');
    lnameRef.current.classList.remove('error');
    emailRef.current.classList.remove('error');
    passwordRef.current.classList.remove('error');
    termsRef.current.classList.remove('error');

    //fname validation:
    if (!formData.fname) {
      formIsValid = false;
      setValidation(prevState => ({...prevState, errorFname: "First Name cannot be empty"}));
      fnameRef.current.classList.add('error');
    }
    else {
      if (!formData.fname.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        setValidation(prevState => ({...prevState, errorFname: "First Name should contain only letters"}));
        fnameRef.current.classList.add('error');
      }
    }
    
    //lname validation:
    if (!formData.lname) {
      formIsValid = false;
      setValidation(prevState => ({...prevState, errorLname: "Last Name cannot be empty"}));
      lnameRef.current.classList.add('error');
    }
    else {
      if (!formData.lname.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        setValidation(prevState => ({...prevState, errorLname: "Last Name should contain only letters"}));
        lnameRef.current.classList.add('error');
      }
    }
  
    //email validation:
    if (!formData.email) {
      formIsValid = false;
      setValidation(prevState => ({...prevState, errorEmail: "Email cannot be empty"}));
      emailRef.current.classList.add('error');
    }
    else {
      const emailCond = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!formData.email.match(emailCond)) {
        formIsValid = false;
        setValidation(prevState => ({...prevState, errorEmail: "Email is not valid"}));
        emailRef.current.classList.add('error');
      }
    }

    //password validation:
    if (!formData.password) {
      formIsValid = false;
      setValidation(prevState => ({...prevState, errorPassword: "Password cannot be empty"}));
      passwordRef.current.classList.add('error');
    }
    else {
      const passwordCond = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
      if (!formData.password.match(passwordCond)) {
        formIsValid = false;
        setValidation(prevState => ({...prevState, errorPassword: "Password must contain at least one lowercase letter, one uppercase letter, one digit and one special symbol"}));
        passwordRef.current.classList.add('error');
      }
    }

    //terms validation:
    if (!formData.terms) {
      formIsValid = false;
      setValidation(prevState => ({...prevState, errorTerms: "You must accept Terms"}));
      termsRef.current.classList.add('error');
    }

    return formIsValid;
  }

 const handleChange = (e) => {
    const target = e.target;
    const name = target.name;

    const value = target.type === "checkbox"? target.checked : target.value;
    setFormData({ ...formData, [name]: value });
  }

  const handleSignUpClick = (e) => {

    if (checkValidation()) {
      //save as an object in 'profiles':
      setProfiles(prevState => [...prevState, {fname: formData.fname, lname: formData.lname, email: formData.email}]);

      //remove the fields:
      setFormData(prevState => ({...prevState, 
        fname: "",
        lname: "",
        email: "",
        password: "",
        terms: false,
      }));
      setValidation(prevState => ({...prevState, formValid: false}));

      //terms checkbox uncheck:
      termsRef.current.classList.remove('checked');
      termsRef.current.classList.add('unchecked');
      setFormData(prevState => ({...prevState, terms: false}));     
    }
  };

  const handleTermsClick = (e) => {
    console.log(e.target.value);
    if (formData.terms === true) {
      setFormData(prevState => ({...prevState, terms: false}));
      e.target.classList.remove('checked');
      e.target.classList.add('unchecked');
    }
    else {
      setFormData(prevState => ({...prevState, terms: true}));
      e.target.classList.add('checked');
      e.target.classList.remove('unchecked');
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="wrapper">
      <div className='signup-container'>
        <div className='signup'>
          <h1>Sign up</h1>
          <form onSubmit={e => handleSubmit(e)}>
            <div className="personal-details">
              <label htmlFor="fname">
                <input ref={fnameRef} type="text" name="fname" placeholder="First Name" value={formData.fname} onChange={(e) => handleChange(e)}></input>
                <i className='fa fa-user'></i>
                <span className="error">{validation.errorFname}</span>
              </label>
              <label htmlFor="lname">
                <input ref={lnameRef} type="text" name="lname" placeholder="Last Name" value={formData.lname} onChange={(e) => handleChange(e)}></input>
                <i className='fa fa-user'></i>
                <span className="error">{validation.errorLname}</span>
              </label>
              <label htmlFor="email">
                <input ref={emailRef} type="text" name="email" placeholder="Email Address" value={formData.email} onChange={(e) => handleChange(e)}></input>
                <i className='fa fa-at'></i>
                <span className="error">{validation.errorEmail}</span>
              </label>
              <label htmlFor="password">
                <input ref={passwordRef} type="password" name="password" placeholder="Password" value={formData.password} onChange={(e) => handleChange(e)}></input>
                <i className='fa fa-key'></i>
                <span className="error">{validation.errorPassword}</span>
              </label>
            </div>
            <div className="terms">
              <label htmlFor="terms" className="input-checkbox">
                <input type="checkbox" ref={termsRef} className="unchecked" name="terms" checked={formData.terms} onChange={(e) => handleChange(e)} onClick={e=> handleTermsClick(e)}></input>
                <span className='text'>I agree with terms and conditions</span>
                <span className="error">{validation.errorTerms}</span>
              </label>
            </div>
            <div className="signup-btn">
              <button type="submit" onClick={(e) => handleSignUpClick(e)}>Sign up</button>
            </div>
          </form>
        </div>

        
      </div>
      <div className='profiles-container'>
        <table className='profiles'>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
            </thead>
          <TableRows profiles={profiles}></TableRows>
        </table>
        </div>
    </div>
  );
}

export default SignUp;
