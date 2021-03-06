import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import netflixLogo from "../../images/netflix-logo.png";
import Button from "../../UI/Button";

import classes from "./Header.module.css";
import { UserContext } from "../../store/user-context";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [emailInput, setEmailInput] = useContext(UserContext);

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   window.localStorage.removeItem("email");
  //   window.localStorage.setItem("email", email);
  // };

  const emailHandler = () => {
    let regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    let result = regex.test(email);

    setIsValidEmail(result);
  };

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <img src={netflixLogo} />
        <NavLink to="/login">
          <Button>Log In</Button>
        </NavLink>
      </header>
      <form>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <h3>
          Ready to watch? Enter your email to create or restart your membership.
        </h3>
        <input
          type="text"
          placeholder="Email address"
          onBlur={emailHandler}
          onChange={(e) => {
            setEmail(e.target.value)
            setEmailInput(e.target.value)
          }}
          value={email}
          // style={!isValidEmail && {borderBottom:"yellow"}}
          style={
            isValidEmail
              ? { marginBottom: "16px" }
              : {
                  border: "0",
                  borderBottom: "4px solid #ffa00a",
                  marginBottom: "4px",
                }
          }
        />
        {!isValidEmail && <p>Please enter a valid email address</p>}
        <NavLink to="/signup">
          <Button className={classes.header__button}>
            Get Started
          </Button>
        </NavLink>
      </form>
    </main>
  );
};

export default Header;
