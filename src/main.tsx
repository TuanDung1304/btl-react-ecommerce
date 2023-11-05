import { ThemeProvider, createTheme } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import App from './App.tsx'
import './main.css'
import { store } from './store/index.ts'
import { NotifyContextProvider } from './components/Notify/NotifyContextProvider.tsx'

const theme = createTheme({
  typography: {
    fontFamily: `"Quicksand", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    // primary: {},
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NotifyContextProvider>
          <App />
        </NotifyContextProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
