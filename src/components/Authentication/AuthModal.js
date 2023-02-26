import React from 'react';
import "./AuthModal.css";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Login from './Login';
import Signup from './Signup';


const style = {
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 400,
                      bgcolor: 'background.paper',
                      boxShadow: 24,
                      color:"white",
                      borderRadius:2
              };

                    

const AuthModal = () => {

 const [open, setOpen] = React.useState(false);
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 const [value, setValue] = React.useState(0);

 const handleChange = (event, newValue) => {
   setValue(newValue);
 };


  return (
     <>
     
     <button className='modal-btn' onClick={handleOpen}>Log in</button>
     
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>

            {/* <AppBar position='static' style={{backgroundColor: "transparent", color: "white"}}> */}
            
              <Tabs variant='fullWidth' 
              value={value} 
              onChange={handleChange} 
              >
              
               <Tab label="Log In"  />
               <Tab label="Sign Up" />
          
              </Tabs>

            {/* </AppBar> */}

            { value === 0 && <Login handleClose={handleClose} />  }
            { value === 1 && <Signup handleClose={handleClose}/>  }
              
          </Box>
        </Fade>
      </Modal>

     </>
  )
}

export default AuthModal;
