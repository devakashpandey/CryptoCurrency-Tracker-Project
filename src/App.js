import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";

const Home = lazy(() => import("./pages/Home"));
const CoinPage = lazy(() => import("./pages/CoinPage"));

function App() {
  return (
    <>
      <div className="main-div">
        <ToastContainer position="top-center" />
        <Header />
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}

export default App;
