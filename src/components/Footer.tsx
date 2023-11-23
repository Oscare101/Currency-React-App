import { RootState } from '../redux'
import { useSelector } from 'react-redux'
import { IoOpenOutline } from 'react-icons/io5'

export default function Footer() {
  const theme = useSelector((state: RootState) => state.theme)

  return (
    <div
      className="header"
      style={{ backgroundColor: theme === 'dark' ? '#282c34' : '#E2E8F5' }}
    >
      <a
        className="link"
        href="https://bank.gov.ua/ua/markets/exchangerates"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p
          className="linkTitle"
          style={{ color: theme === 'dark' ? '#fff' : '#000' }}
        >
          All data are taken from the official NBU website
        </p>
        <IoOpenOutline color={theme === 'dark' ? '#fff' : '#000'} size={24} />
      </a>
    </div>
  )
}
