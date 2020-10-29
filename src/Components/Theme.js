import React from 'react';

export const themes = {
  light: {
    mode: 'light',
    background: '#eee'
  },
  dark: {
    mode: 'dark',
    background: '#222'
  }
};

export const ThemeContext = React.createContext({
  theme: themes.light,
  toggleTheme: () => null
});

export const ThemeToggleButton = () => (
  <ThemeContext.Consumer>
    {({ theme, toggleTheme }) => (
      <button type="button" onClick={toggleTheme}>
        {theme.mode === 'light' ? '暗黑' : '高亮'}主题
      </button>
    )}
  </ThemeContext.Consumer>
);
