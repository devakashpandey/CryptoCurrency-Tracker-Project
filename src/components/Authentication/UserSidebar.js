import React from "react";
import "./UserSidebar.css";
import Drawer from "@mui/material/Drawer";
import { UseCryptoValue } from "../../context/CryptoContext";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const UserSidebar = () => {
  const [state, setState] = React.useState({ right: false });

  const { user } = UseCryptoValue();

  console.log(user);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    signOut(auth);
    toast.success("Logout Successfull", {
      theme: "dark",
    });
    toggleDrawer();
  };

  return (
    <>
      {["right"].map((anchor) => (
        <div key={anchor}>
          {/* avtar profile starts ------>> */}

          <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                src={user.photoURL}
                alt={user.displayName || user.email}
                onClick={toggleDrawer(anchor, true)}
                className="avtar"
                style={{ backgroundColor: "rgb(7, 195, 237)" }}
              />
            </StyledBadge>
          </Stack>

          {/* avtar profile ends ------>> */}

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div className="drawer-container">
              <div className="propic">
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                  onClick={toggleDrawer(anchor, true)}
                  className="avtar-pic"
                  style={{ backgroundColor: "rgb(7, 195, 237)" }}
                />

                <span className="userdetail">
                  {user.displayName || user.email}
                </span>

                <div className="watchlist">
                  <p>WatchList</p>
                </div>
              </div>

              <Button
                variant="contained"
                onClick={logout}
                className="logout-btn"
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </div>
      ))}
    </>
  );
};

export default UserSidebar;
