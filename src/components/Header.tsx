import { RootState } from '../redux'
import { useDispatch, useSelector } from 'react-redux'
import { updateTheme } from '../redux/theme'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'
import HeaderCurrencyPair from './HeaderCurrencyPair'
import { Currency } from '../constants/interfaces'

interface CurrencyPairProps {
  title: string
  value: number
}

export default function Header() {
  const currency: Currency[] = useSelector((state: RootState) => state.currency)
  const theme: string = useSelector((state: RootState) => state.theme)
  const orientation: string = useSelector(
    (state: RootState) => state.orientation
  )

  const dispatch = useDispatch()

  function ChangeTheme() {
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
    dispatch(updateTheme(theme === 'dark' ? 'light' : 'dark'))
  }

  function GetCurrencyRate(currencyName: string) {
    return currency.find((c: Currency) => c.currency === currencyName)?.rate
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
        <HeaderCurrencyPair
          title="UAH/USD"
          value={GetCurrencyRate('USD') || 0}
        />
        <HeaderCurrencyPair
          title="UAH/EUR"
          value={GetCurrencyRate('EUR') || 0}
        />

        <button
          className={
            theme === 'dark'
              ? 'themeButton themeButtonDark'
              : 'themeButton themeButtonLight'
          }
          onClick={(event: React.MouseEvent<HTMLElement>) => {
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
