import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegisterPage from './Screen/Register/RegisterPage';
import { routes } from './lib/routes';
import LoginPage from './Screen/Login/LoginPage';
import SongList from 'Screen/Songs/SongList';

export default function AppWrapper() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<>loading</>}>
          <Routes>
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.register} element={<RegisterPage />} />
            <Route path={routes.songList} element={<SongList/>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
