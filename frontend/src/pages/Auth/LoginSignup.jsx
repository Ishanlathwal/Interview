import React, { useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import { Face, LockOpen, MailOutline } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DisabledVisibleIcon from "@mui/icons-material/DisabledVisible";
import { login, signUp } from "../../redux/USER_REDUCER";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const userInitialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const passwordInitialstate = {
  loginPassword: false,
  signuppassword: false,
  confirm: false,
};

const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(passwordInitialstate);

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  // signup
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [user, setUser] = useState(userInitialState);
  const { name, email, password, confirmPassword } = user;

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));

    setLoginEmail("");
    setLoginPassword("");
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      confirmPassword,
      avatar,
    };

    //TODO send data method create     dispatch(signUp(data));

    dispatch(signUp(data));

    setUser(userInitialState);
    setAvatar("");
    setAvatarPreview("/Profile.png");
  };
  const togglePassword = (e, field) => {
    e.preventDefault();
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/main");
    }
  }, [isAuthenticated, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  if (loading) return <Loader />;
  return (
    <>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpen />
              <input
                type={showPassword.loginPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button onClick={(e) => togglePassword(e, "loginPassword")}>
                {showPassword.loginPassword ? (
                  <VisibilityIcon />
                ) : (
                  <DisabledVisibleIcon />
                )}
              </button>
            </div>
            {/* <Link to="/password/forgot">Forget Password ?</Link> */}
            <input type="submit" value="Login" className="loginBtn" />
          </form>

          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <Face />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpen />
              <input
                type={showPassword.signuppassword ? "text" : "password"}
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
              <button onClick={(e) => togglePassword(e, "signuppassword")}>
                {showPassword.signuppassword ? (
                  <VisibilityIcon />
                ) : (
                  <DisabledVisibleIcon />
                )}
              </button>
            </div>
            <div className="signUpPassword">
              <LockOpen />
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Confirm Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={registerDataChange}
              />
              <button onClick={(e) => togglePassword(e, "confirm")}>
                {showPassword.confirm ? (
                  <VisibilityIcon />
                ) : (
                  <DisabledVisibleIcon />
                )}
              </button>
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
