import React, { useEffect, useState } from "react";
import "./CoinPage.css";
import { useParams } from "react-router-dom";
import { UseCryptoValue } from "../context/CryptoContext";
import axios from "axios";
import { SingleCoin } from "../config/api";
import CoinChart from "../components/CoinChart";
import { numberWithCommas } from "../components/Carousel";
import { Button, LinearProgress } from "@mui/material";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState("");

  const { currency, symbol, user, watchlist } = UseCryptoValue();

  const inWatchlist = watchlist.includes(coin?.id); // to check any coin is added in watchlist or not

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const addToWatchList = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin.id] : [coin?.id], // to adding the coin in watchlist
      });

      toast.success(`${coin.name} Added to the watchlist`, {
        theme: "dark",
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const removeFromWatchlist = async () => {
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

  if (!coin) return <LinearProgress />; // for loading

  return (
    <>
      <div className="container">
        <div className="coin-info">
          <img
            src={coin?.image?.large}
            alt={coin.name}
            height="200"
            style={{ marginBottom: 20 }}
          />

          <h2>{coin.name}</h2>

          <p className="coin-descrip">
            {/* this for redering only html stuffs */}
            <span
              dangerouslySetInnerHTML={{
                __html: coin?.description?.en.split(". ")[0],
              }}
            />
            .
          </p>

          <div className="market-data">
            <span style={{ display: "flex" }}>
              <h3>Rank : &nbsp;</h3>
              <h4>{coin?.market_cap_rank}</h4>
            </span>

            <span style={{ display: "flex", marginTop: 15 }}>
              <h3>Current Price : &nbsp;</h3>
              <h4>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </h4>
            </span>

            <span style={{ display: "flex", marginTop: 15 }}>
              <h3>Market Cap : &nbsp;</h3>
              <h4>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}{" "}
                M
              </h4>
            </span>
          </div>

          {/* add to watchlist button  */}

          {user && (
            <Button
              variant="outlined"
              className="add-to-watchlist"
              onClick={inWatchlist ? removeFromWatchlist : addToWatchList}
              style={{
                backgroundColor: inWatchlist
                  ? "rgba(255, 68, 0, 0.850)"
                  : "rgb(7, 195, 237)",
                color: inWatchlist ? "white" : "black",
              }}
            >
              {inWatchlist ? "Remove From Watchlist" : "Add To Watchlist"}
            </Button>
          )}
        </div>

        <CoinChart coin={coin} />
      </div>
    </>
  );
};

export default CoinPage;
