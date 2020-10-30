import React, { useContext } from 'react';

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

// export const withTheme = (Component) => (
//   (props) => (
//     <ThemeContext.Consumer>
//       {(contextProps) => <Component {...props} {...contextProps} />}
//     </ThemeContext.Consumer>
//   )
// );

// 用 hook useContext 也能实现
export const withTheme = (Component) => (props) => {
  const contextProps = useContext(ThemeContext);
  return <Component {...props} {...contextProps} />;
};

export const ThemeToggleButton = withTheme(({ theme, toggleTheme }) => (
  <button type="button" onClick={toggleTheme}>
    {theme.mode === 'light' ? '暗黑' : '高亮'}主题
  </button>
));
