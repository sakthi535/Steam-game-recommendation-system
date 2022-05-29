import React from 'react';

import { Header } from './components/Header';
import { Description } from './components/Description';
import { GetGame } from './components/GetGame';
import { SelectedGames } from './components/SelectedGames';
import { GlobalProvider } from './context/GlobalState';


import './App.css';


function App() {
  return (
    <GlobalProvider >
      <Header />
      <div className="container">
        <Description />
        <GetGame />
        <SelectedGames />
      </div>

    </GlobalProvider>
  );
}

export default App;
