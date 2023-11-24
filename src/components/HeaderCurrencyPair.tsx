import { useSelector } from 'react-redux'
import { RootState } from '../redux'

interface CurrencyPairProps {
  title: string
  value: number
}

export default function HeaderCurrencyPair({
  title,
  value,
}: CurrencyPairProps) {
  const theme = useSelector((state: RootState) => state.theme)

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
