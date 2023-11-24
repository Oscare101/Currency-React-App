import { RootState } from '../redux'
import { useDispatch, useSelector } from 'react-redux'
import { updateTheme } from '../redux/theme'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'
import HeaderCurrencyPair from './HeaderCurrencyPair'
interface CurrencyPairProps {
  title: string
  value: number
}

export default function Header() {
  const currency = useSelector((state: RootState) => state.currency)

  const theme = useSelector((state: RootState) => state.theme)
  const orientation = useSelector((state: RootState) => state.orientation)

  const dispatch = useDispatch()

  function ChangeTheme() {
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
    dispatch(updateTheme(theme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div
      className={orientation === 'landscape' ? 'header' : 'headerPortrait'}
      style={{ backgroundColor: theme === 'dark' ? '#282c34' : '#E2E8F5' }}
    >
      <p
        className={
          orientation === 'landscape' ? 'headerTitle' : 'headerTitleMobile'
        }
        style={{ color: theme === 'dark' ? '#fff' : '#000' }}
      >
        Currency calculator
      </p>
      <div
        className={
          orientation === 'landscape'
            ? 'underHeaderBlock'
            : 'underHeaderBlockMobile'
        }
      >
        <HeaderCurrencyPair title="UAH/USD" value={currency.USD.toFixed(2)} />
        <HeaderCurrencyPair title="UAH/EUR" value={currency.EUR.toFixed(2)} />

        <button
          className={
            theme === 'dark'
              ? 'themeButton themeButtonDark'
              : 'themeButton themeButtonLight'
          }
          onClick={(event: any) => {
            ChangeTheme()
            event.stopPropagation()
          }}
        >
          {theme === 'dark' ? (
            <IoMoonOutline size={30} color={'#fff'} />
          ) : (
            <IoSunnyOutline size={30} color={'#000'} />
          )}
        </button>
      </div>
    </div>
  )
}
