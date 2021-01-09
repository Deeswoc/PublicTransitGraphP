import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';

function Login(props) {
  useEffect(() => {}, []);

  return (
    <>
      <GoogleButton type="light" onClick={gotoLogin}></GoogleButton>
    </>
  );
}

function gotoLogin() {
  window.location.href = 'http://localhost:3000/authenticate/google';
}
export default Login;
