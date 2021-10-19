import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { apiSupportedLanguages } from './features/search-box/wizkidsAPI';
interface IThemeContext {
  dark: boolean;
  lang: string;
}

const defaultState = {
  dark: false,
  lang: apiSupportedLanguages.dk
};

export const ThemeContext = React.createContext<IThemeContext>(defaultState);

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider value={defaultState}>
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);