import { useDispatch } from 'react-redux'
import DefineRouter from './components/Routes/Router'
import { AppDispatch } from './store'
import { useEffect, useState } from 'react'
import { getUser } from './store/useSlice'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(getUser()).then(() => setLoading(false))
  }, [dispatch])

  return !loading && <DefineRouter />
}

export default App
