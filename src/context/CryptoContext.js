import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const CryptoContext = createContext();

const ContextProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR"); // for default currency
  const [symbol, setSymbol] = useState("₹"); // changing the symbol/currency after selecting the option

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser("");
    });
  }, []);

  const [watchlist, setWatchlist] = useState("");

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          toast.error("No items in watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency)); // COIN LIST OF CONIS TABLE

    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        user,
        watchlist,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default ContextProvider;

export const UseCryptoValue = () => useContext(CryptoContext);
