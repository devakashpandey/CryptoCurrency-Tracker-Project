import React, { useState } from "react";
import Box from "@mui/material/Box";
import "./Login.css";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.warn("Please fill all the field", {
        theme: "dark",
      });
    } else {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);

        toast.success(`Log in Successfull. Welcome ${result.user.email}`, {
          theme: "dark",
        });

        handleClose(); // to close the modal
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const googleProvider = new GoogleAuthProvider();

  const signinWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((res) => {
      toast.success(`Sign In Successfull. Welcome ${res.user.email}`, {
        theme: "dark",
      });
    });
  };

  return (
    <>
      <Box className="login-box" p={3}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          style={{ backgroundColor: "rgb(7, 195, 237)" }}
          onClick={handleSubmit}
        >
          LOG IN
        </Button>
      </Box>

      {/* sign with google  */}

      <Box className="google-login">
        <span>OR</span>

        <GoogleButton
          style={{ width: "100%" }}
          onClick={signinWithGoogle}
        ></GoogleButton>
      </Box>
    </>
  );
};

export default Login;
