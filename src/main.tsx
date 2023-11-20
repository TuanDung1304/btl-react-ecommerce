import { ThemeProvider, createTheme } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import App from './App.tsx'
import { NotifyContextProvider } from './components/Notify/NotifyContextProvider.tsx'
import './main.css'
import { store } from './store/index.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const theme = createTheme({
  typography: {
    fontFamily: `"Quicksand", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
})

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NotifyContextProvider>
          <App />
        </NotifyContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </Provider>,
)
