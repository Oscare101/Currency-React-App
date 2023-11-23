import React, { useEffect } from 'react'
import '../App.css'
import Header from '../components/Header'
import { GetCurrency } from '../functions/Actions'
import { useDispatch } from 'react-redux'
import { updateCurrency } from '../redux/currency'
import { updateTheme } from '../redux/theme'

export default function MainScreen() {
  const dispatch = useDispatch()

  function GetTheme() {
    const themeStorage = localStorage.getItem('theme')
    if (themeStorage !== null) {
      dispatch(updateTheme(themeStorage))
    } else {
      localStorage.setItem('theme', 'light')
    }
  }

  useEffect(() => {
    ;(async () => {
      GetTheme()

      const currency = await GetCurrency()
      dispatch(updateCurrency(currency))
    })()

    return () => {}
  }, [])

  return (
    <div className="container">
      <Header />
    </div>
  )
}
