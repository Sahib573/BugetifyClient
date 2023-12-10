"use strict";
import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Loader from "./common/Loader";
import routes from "./routes";

const DefaultLayout = lazy(() => import("./layout/DefaultLayout"));

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  let usr = "";
  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);
  const getUser = localStorage.getItem("user");
  if (getUser) {
     usr = JSON.parse(getUser);
  }
  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster position="top-right" containerClassName="overflow-auto" />

      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/" element={ (usr)?(<DefaultLayout />):(<SignIn/>)}>
          {/* <Route index element={<Dashboard />} /> */}
          {routes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                // (usr)?(
                <Suspense fallback={<Loader />}>
                  <Component />
                </Suspense>
                // ):(<SignIn/>)
              }
            />
          ))}
        </Route>
      </Routes>
    </>
  );
}

export default App;
