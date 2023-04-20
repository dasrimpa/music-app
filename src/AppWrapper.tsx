import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { routes } from "./lib/routes";
import DashboardPage from "Screen/Dashboard/DashboardPage";

const RegisterPage = React.lazy(() => import("Screen/Register/RegisterPage"));
const LoginPage = React.lazy(() => import("Screen/Login/LoginPage"));
const SongList = React.lazy(() => import("Screen/Dashboard/Songs/SongList"));
const AddEditSong = React.lazy(
  () => import("Screen/Dashboard/Songs/AddEditSong")
);

export default function AppWrapper() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<>loading</>}>
          <Routes>
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.register} element={<RegisterPage />} />
            <Route path={routes.dashboard.path} element={<DashboardPage />}>
              <Route
                path={routes.dashboard.SongList.path}
                element={<SongList />}
              />
              <Route
                path={routes.dashboard.addSong.path}
                element={<AddEditSong />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
