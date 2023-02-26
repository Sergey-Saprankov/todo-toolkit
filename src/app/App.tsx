import React, { useEffect } from 'react'

import '../styles/index.scss'
import { Alert } from 'antd'

import { meTC } from '../BLL/reducers/AuthReducerSlice'
import Loader from '../common/components/Loader/Loader'
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks'
import { useTheme } from '../styles/theme/useTheme'

import { Header } from './pages/Header/Header'
import { Pages } from './pages/Pages'

function App() {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.appData.isInitialized)
  const status = useAppSelector(state => state.appData.status)
  const error = useAppSelector(state => state.appData.appError)

  useEffect(() => {
    dispatch(meTC())
  }, [])

  if (!isInitialized) {
    return <Loader />
  }

  return (
    <div className={`app dark`}>
      <Header />
      <Pages />
      {status === 'loading' && <Loader />}
      {error && <Alert className={'error'} message={error} type={'error'} />}
    </div>
  )
}

export default App
