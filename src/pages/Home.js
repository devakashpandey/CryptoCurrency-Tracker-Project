import { LinearProgress } from "@mui/material";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Banner from "../components/Banner";
import ErrorFallback from "../components/ErrorBoundary";
const CoinsTable = React.lazy(() => import("../components/CoinsTable"));

const Home = () => {
  return (
    <>
      <div>
        <Banner />
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
          <Suspense fallback={<LinearProgress />}>
            <CoinsTable />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Home;
