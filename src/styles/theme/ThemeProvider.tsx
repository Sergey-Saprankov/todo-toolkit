import React, { FC, ReactNode, useMemo, useState } from 'react'

import { Theme, ThemeContext } from './ThemeContext'

export const LOCAL_STORAGE_THEME_KEY = 'theme'

const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.DARK

type ThemeProviderType = {
  children: ReactNode
}

export const ThemeProvider: FC<ThemeProviderType> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const defaultObj = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={defaultObj}>{children}</ThemeContext.Provider>
}
