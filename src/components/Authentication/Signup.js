import React, { useState } from 'react';
import Box from '@mui/material/Box';
import "./Signup.css";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase"


const Signup = ({ handleClose }) => {

const [ email, setEmail ] = useState("")
const [ password, setPassword ] = useState("")
const [ confirmPass, setconfirmPass ] = useState("")




const handleSubmit = async () => {
    if(password !== confirmPass){
        toast.warn("Password do not match", {
          theme:"dark"
        })

  
    } else{
             if(email && password && confirmPass){
                   
                      try{
                  const result =  await createUserWithEmailAndPassword(
                                              auth, 
                                              email,
                                              password)
                                                                                
                      toast.success(`Sign Up Successfull with ${result.user.email}`, {
                                            theme:"dark"
                                            })
                          handleClose()  // to close the modal

                      }catch(error){
                           toast.error(error.message)                  
                      }
                                          
                      }else{
                            toast.warn("Please fill all the input field",{
                                     theme:"dark"     
                            })
                      }            
    }
}

  return (
    <>
    <Box className="signup-box" p={3}>

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

<TextField  
     label="Confirm Password"
     type="password" 
     value={confirmPass}
     onChange={(e) => setconfirmPass(e.target.value)}
     />

 <Button 
 variant="contained" 
 style={{ backgroundColor: "rgb(7, 195, 237)", fontWeight:"bold" }}
 onClick={handleSubmit}
 > 
 SIGN UP
 </Button>


    </Box>
    </>
  )
}

export default Signup;
