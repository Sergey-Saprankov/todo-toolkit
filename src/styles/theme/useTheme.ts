import { useContext } from "react";
import { Theme, ThemeContext } from "./ThemeContext";
import { LOCAL_STORAGE_THEME_KEY } from "./ThemeProvider";

type UseThemeResult = {
  toggleTheme: () => void;
  theme?: Theme;
};

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
    if (setTheme) {
      setTheme(newTheme);
    }

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };
  return { toggleTheme, theme };
};
