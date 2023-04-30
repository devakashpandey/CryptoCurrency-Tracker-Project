import React from "react";
import "./UserSidebar.css";
import Drawer from "@mui/material/Drawer";
import { UseCryptoValue } from "../../../context/CryptoContext";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { numberWithCommas } from "../../carousel/Carousel";
import { MdDelete } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";

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

  const { user, watchlist, coins, symbol } = UseCryptoValue();

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

  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinRef,
        {
          coins: watchlist.filter((item) => item !== coin?.id),
        },
        { merge: "true" }
      );

      toast.success(`${coin.name} Removed from the watchlist`, {
        theme: "dark",
      });
    } catch (error) {
      toast.error(error);
    }
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
                  <p>Watchlist</p>

                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id)) {
                      return (
                        <div className="watchlist-coin">
                          <span>{coin.name}</span>

                          <span style={{ display: "flex", gap: 5 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin?.current_price.toFixed(2))}
                            <MdDelete
                              style={{
                                cursor: "pointer",
                                marginTop: 2,
                                fontSize: 21,
                              }}
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    }
                  })}
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
