import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
  Selected: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function removeGame(id) {
    dispatch({
      type: 'REMOVE_GAME',
      payload: id
    });
  }

  function addGame(game) {
    dispatch({
      type: 'ADD_GAME',
      payload: game
    });
  }

  return (<GlobalContext.Provider value={{
    Selected: state.Selected,
    removeGame,
    addGame,
  }}>
    {children}
  </GlobalContext.Provider>);
}