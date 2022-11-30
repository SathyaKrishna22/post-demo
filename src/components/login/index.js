import React, { useState, useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { loginStatus, userData } from "../../atoms";
import { gapi } from "gapi-script";
import { useRecoilState } from "recoil";
import { message } from "antd";
const clientId =
  "181328786141-u72bfcaunbch91in7mfno6vm2cg9bdiv.apps.googleusercontent.com";

function Login() {
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const [_loginStatus, setLoginStatus] = useRecoilState(loginStatus);
  const [userDataState, setUserDataState] = useRecoilState(userData);

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "email",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const onLoginSuccess = (res) => {
    setShowLoginButton(false);
    setUserDataState(res.profileObj);
    setShowLogoutButton(true);
    setLoginStatus(true);
    let accessToken = gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
    localStorage.setItem("loginStatus", "true");
    localStorage.setItem("access_token", accessToken);
    message.success("Logged in Successfully");
  };

  const onLoginFailure = (res) => {
    localStorage.setItem("access_token", "");
    setLoginStatus(false);
    setUserDataState();
  };

  const onSignoutSuccess = () => {
    // console.clear();
    setUserDataState();
    setShowLoginButton(true);
    setShowLogoutButton(false);
    setLoginStatus(false);
    localStorage.setItem("access_token", "");
    message.success("Logged out Successfully");
  };

  return (
    <div>
      {showLoginButton ? (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          theme={"dark"}
        />
      ) : null}

      {showLogoutButton ? (
        <GoogleLogout
          clientId={clientId}
          buttonText="Sign Out"
          onLogoutSuccess={onSignoutSuccess}
          theme={"dark"}
        ></GoogleLogout>
      ) : null}
    </div>
  );
}
export default Login;
