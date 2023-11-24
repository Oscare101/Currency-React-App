import React, { useEffect, useState } from 'react'
import '../App.css'
import Header from '../components/Header'
import { GetCurrency, GetDimensions } from '../functions/Actions'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrency } from '../redux/currency'
import { updateTheme } from '../redux/theme'
import { RootState } from '../redux'
import Footer from '../components/Footer'
import Calcolator from '../components/Calculator'
import { updateOrientation } from '../redux/orientation'

export default function MainScreen() {
  const theme = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  function GetTheme() {
    const themeStorage = localStorage.getItem('theme')
    if (themeStorage !== null) {
      dispatch(updateTheme(themeStorage))
    } else {
      localStorage.setItem('theme', 'light')
    }
  }

  function UpdateDimension() {
    const dimentionValue = GetDimensions()
    dispatch(
      updateOrientation(dimentionValue.width < 700 ? 'portrait' : 'landscape')
    )
  }

  const [screenSize, setScreenSize] = useState(GetDimensions())
  useEffect(() => {
    const updateDimension = () => {
      UpdateDimension()
      setScreenSize(GetDimensions())
    }
    window.addEventListener('resize', updateDimension)
    return () => {
      window.removeEventListener('resize', updateDimension)
    }
  }, [screenSize])

  useEffect(() => {
    ;(async () => {
      GetTheme()
      UpdateDimension()

      const currency = await GetCurrency()
      dispatch(updateCurrency(currency))
    })()

    return () => {}
  }, [])

  return (
    <div
      className={theme === 'dark' ? 'container darkBG' : 'container lightBG'}
    >
      <Header />
      <Calcolator />
      <Footer />
    </div>
  )
}
