import { RootState } from '../redux'
import { useSelector } from 'react-redux'
import { IoOpenOutline } from 'react-icons/io5'

export default function Footer() {
  const theme: string = useSelector((state: RootState) => state.theme)
  const orientation: string = useSelector(
    (state: RootState) => state.orientation
  )

  return (
    <div
      className={orientation === 'landscape' ? 'footer' : 'footerMobile'}
      style={{ backgroundColor: theme === 'dark' ? '#282c34' : '#E2E8F5' }}
    >
      <a
        className="link"
        href="https://bank.gov.ua/ua/markets/exchangerates"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p
          className={
            orientation === 'landscape' ? 'linkTitle' : 'linkTitleMobile'
          }
          style={{ color: theme === 'dark' ? '#fff' : '#000' }}
        >
          All data are taken from the official NBU website
        </p>
        <IoOpenOutline
          color={theme === 'dark' ? '#fff' : '#000'}
          size={orientation === 'landscape' ? 24 : 16}
        />
      </a>
    </div>
  )
}
