import { RootState } from '../redux'
import { useDispatch, useSelector } from 'react-redux'
import { updateTheme } from '../redux/theme'
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5'
interface CurrencyPairProps {
  title: string
  value: number
}

export default function Header() {
  const currency = useSelector((state: RootState) => state.currency)
  const theme = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  function ChangeTheme() {
    localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark')
    dispatch(updateTheme(theme === 'dark' ? 'light' : 'dark'))
  }

  function CurrencyPair({ title, value }: CurrencyPairProps) {
    return (
      <div className="headerCurrencyBlock">
        <p
          className="headerCurrencyTitle"
          style={{ color: theme === 'dark' ? '#fff' : '#000' }}
        >
          {title}
        </p>
        <p
          className="headerCurrencyValue"
          style={{ color: theme === 'dark' ? '#fff' : '#000' }}
        >
          {value}
        </p>
      </div>
    )
  }

  return (
    <div
      className="header"
      style={{ backgroundColor: theme === 'dark' ? '#282c34' : '#E2E8F5' }}
    >
      <p
        className="headerTitle"
        style={{ color: theme === 'dark' ? '#fff' : '#000' }}
      >
        Currency calculator
      </p>
      <CurrencyPair title="UAH/USD" value={currency.USD.toFixed(2)} />
      <CurrencyPair title="UAH/EUR" value={currency.EUR.toFixed(2)} />

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
  )
}
