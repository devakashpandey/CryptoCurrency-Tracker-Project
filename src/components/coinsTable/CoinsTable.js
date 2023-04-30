import React, { useEffect, useState } from "react";
import "./CoinsTable.css";
import { UseCryptoValue } from "../../context/CryptoContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Pagination } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "../carousel/Carousel";

const CoinsTable = () => {
  const [page, setPage] = useState(1);

  const { symbol, coins, loading } = UseCryptoValue();
  const navigate = useNavigate();

  // --- this for the dark mode ----
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // if (Math.random() > 0.5) {
  //   return new Error("Test Error Boundary");
  // }

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
          <h2 className="coins-title">Cryptocurrency Prices By Market Cap</h2>

          <TableContainer className="table-container">
            {loading ? (
              <LinearProgress className="progress-bar" />
            ) : (
              <Table>
                <TableHead className="table-head">
                  <TableRow>
                    {["Coins", "Price", "24h Change", "Market Cap"].map(
                      (tableHead) => (
                        <TableCell
                          className="table-cell"
                          key={tableHead}
                          //   align={tableHead === "Coins" ? "" : "right"}
                          align="center"
                        >
                          {tableHead}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {/* this handlesearch return all of the filtered coins */}
                  {coins
                    .slice((page - 1) * 10, (page - 1) * 10 + 10) // FOR ONLY SHOW 10 COMPONENTS IN 1 PAGE
                    .map((row) => {
                      let profit = row.price_change_percentage_24h > 0;

                      return (
                        <TableRow
                          onClick={() => navigate(`/coins/${row.id}`)}
                          key={row.name}
                          className="table-row"
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ display: "flex", gap: 15 }}
                          >
                            <img src={row?.image} alt={row.name} height="50" />

                            <div className="coin-detail">
                              <span className="coin-symbol">{row.symbol}</span>
                              <span style={{ color: "darkgrey" }}>
                                {row.name}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell
                            align="right"
                            style={{ fontWeight: 400, fontSize: 17 }}
                          >
                            {symbol}{" "}
                            {numberWithCommas(row?.current_price.toFixed(2))}
                          </TableCell>

                          <TableCell
                            align="right"
                            style={{
                              color: profit > 0 ? "rgba(14,203,129)" : "red",
                              fontWeight: 400,
                              fontSize: 17,
                            }}
                          >
                            {profit && "+"}
                            {row?.price_change_percentage_24h?.toFixed(2)}%
                          </TableCell>

                          <TableCell className="market-cap" align="right">
                            {symbol}{" "}
                            {numberWithCommas(
                              row.market_cap.toString().slice(0, -6)
                            )}{" "}
                            M
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          <Pagination
            count={coins?.length / 10} // DONT WANT IN DECIMAL SO WE USE toFixed(0)
            className="pagination"
            color="primary"
            onChange={(_, value) => {
              setPage(value);
            }}
          />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default CoinsTable;
