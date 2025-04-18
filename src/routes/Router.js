import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Homepage from "../pages/HomePage";
import Discovery from "../pages/Discovery";
import FormPage from "../pages/Form";
import MovieDetail from "../pages/MovieDetail";
import FavoritePage from "../pages/Favorite";
import NoMatch from "../pages/NoMatch";
import { useAuth } from "../contexts/AuthContext";

function Router() {
  let location = useLocation();
  let state = location.state;
  // Optional authentication wrapper that doesn't block access
  function AuthWrapper({ children }) {
    return children;
  }
  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="discovery/:pageId" element={<Discovery />} />
          <Route path="/movie/:movieId" element={<MovieDetail />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="*" element={<NoMatch />} />
          <Route
            path="/favorite"
            element={
              <AuthWrapper>
                <FavoritePage />
              </AuthWrapper>
            }
          />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/form" element={<FormPage />} />
        </Routes>
      )}
    </>
  );
}

export default Router;
