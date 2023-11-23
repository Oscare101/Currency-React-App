import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
import { IoCaretDownSharp } from 'react-icons/io5'

const currencies = ['UAH', 'USD', 'EUR']

export default function CurrencyBlock(props: any) {
  const theme = useSelector((state: RootState) => state.theme)
  const [dropDown, setDropDown] = useState<boolean>(false)

  function CurrencyDropDownItem({ currency }: { currency: string }) {
    return (
      <div
        className="CurrencyDropDownButton"
        onClick={() => {
          setDropDown(false)
          props.setCurrency(currency)
        }}
      >
        <p
          className="CurrencyDropDownTitle"
          style={{ color: theme === 'dark' ? '#fff' : '#000' }}
        >
          {currency}
        </p>
      </div>
    )
  }

  return (
    <button
      className="currencyButton"
      onClick={() => {
        setDropDown(true)
      }}
    >
      <p
        className="headerTitle"
        style={{ color: theme === 'dark' ? '#fff' : '#000' }}
      >
        {props.currency}
      </p>
      <IoCaretDownSharp size={30} color={theme === 'dark' ? '#fff' : '#000'} />
      {dropDown ? (
        <div
          className={
            theme === 'dark'
              ? 'dropDownCurrency dropDownDark'
              : 'dropDownCurrency dropDownLight'
          }
        >
          {currencies
            .filter((i: string) => i !== props.currency)
            .map((cur: string) => (
              <CurrencyDropDownItem key={cur} currency={cur} />
            ))}
        </div>
      ) : (
        <></>
      )}
    </button>
  )
}
