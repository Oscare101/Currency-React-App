import { RootState } from '../redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { CheckInput } from '../functions/Actions'
import { IoCaretDownSharp } from 'react-icons/io5'

const currencies = ['UAH', 'USD', 'EUR']
const numbers = /^\d{0,10}(\.\d{0,2})?$/

export default function Calcolator() {
  const theme = useSelector((state: RootState) => state.theme)
  const currency = useSelector((state: RootState) => state.currency)
  const [firstCurrency, setFirstCurrency] = useState<string>('UAH') // chosen first currency
  const [secondCurrency, setSecondCurrency] = useState<string>('USD') // chosen second currency
  const [firstCurrencyValue, setFirstCurrencyValue] = useState<any>() // entered value or calculated value for the first one
  const [secondCurrencyValue, setSecondCurrencyValue] = useState<any>() // entered value or calculated value for the second one

  // calculate seccond currency value every time the first one is changed
  function CalculateCurrencyFromFirstValue(
    firstCurrency: string,
    firstCurrencyValue: number
  ) {
    let temporaruSecondCurrency = secondCurrency
    if (secondCurrency === firstCurrency) {
      temporaruSecondCurrency = currencies.filter(
        (i: any) => i !== firstCurrency
      )[0]
      setSecondCurrency(currencies.filter((i: any) => i !== firstCurrency)[0])
    }
    if (firstCurrency !== 'UAH' && secondCurrency !== 'UAH') {
      temporaruSecondCurrency = 'UAH'
      setSecondCurrency('UAH')
    }

    if (firstCurrencyValue) {
      if (currency[temporaruSecondCurrency]) {
        setSecondCurrencyValue(
          (firstCurrencyValue / currency[temporaruSecondCurrency]).toFixed(2)
        )
      } else {
        setSecondCurrencyValue(
          (firstCurrencyValue * currency[firstCurrency]).toFixed(2)
        )
      }
    } else {
      setSecondCurrencyValue(null)
    }
  }

  // calculate fisrt currency value every time the second one is changed
  function CalculateCurrencyFromSecondValue(
    secondCurrency: string,
    secondCurrencyValue: number
  ) {
    let temporaruFirstCurrency = firstCurrency
    if (secondCurrency === firstCurrency) {
      temporaruFirstCurrency = currencies.filter(
        (i: any) => i !== secondCurrency
      )[0]
      setFirstCurrency(currencies.filter((i: any) => i !== secondCurrency)[0])
    }
    if (firstCurrency !== 'UAH' && secondCurrency !== 'UAH') {
      temporaruFirstCurrency = 'UAH'
      setFirstCurrency('UAH')
    }

    if (secondCurrencyValue) {
      if (currency[temporaruFirstCurrency]) {
        setFirstCurrencyValue(
          (secondCurrencyValue / currency[temporaruFirstCurrency]).toFixed(2)
        )
      } else {
        setFirstCurrencyValue(
          (secondCurrencyValue * currency[secondCurrency]).toFixed(2)
        )
      }
    } else {
      setFirstCurrencyValue(null)
    }
  }

  function CurrencyBlock(props: any) {
    const theme = useSelector((state: RootState) => state.theme)
    const [dropDown, setDropDown] = useState<boolean>(false)

    function CurrencyDropDownItem({ currency }: { currency: string }) {
      return (
        <button
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
        </button>
      )
    }

    return (
      <button
        className="currencyButton"
        onClick={() => {
          setDropDown(true)
        }}
      >
        <IoCaretDownSharp
          size={30}
          color={theme === 'dark' ? '#fff' : '#000'}
        />
        <p
          className="headerTitle"
          style={{ color: theme === 'dark' ? '#fff' : '#000', marginRight: 30 }}
        >
          {props.currency}
        </p>

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

  return (
    <div className={theme === 'dark' ? 'flexView darkBG' : 'flexView lightBG'}>
      <div className="calculatorItemBlock">
        <CurrencyBlock
          currency={firstCurrency}
          currencyValue={firstCurrencyValue}
          setCurrency={(newCurrency: string) => {
            setFirstCurrency(newCurrency)
            CalculateCurrencyFromFirstValue(newCurrency, firstCurrencyValue)
          }}
        />
        <input
          type="text"
          className={
            theme === 'dark'
              ? 'inputField inputFieldDark'
              : 'inputField inputFieldLight'
          }
          placeholder={'0'}
          value={firstCurrencyValue || ''}
          onChange={(event: any) => {
            if (numbers.test(event.target.value.replace(',', '.'))) {
              const checkedInput: any = CheckInput(event.target.value)
              setFirstCurrencyValue(checkedInput)
              CalculateCurrencyFromFirstValue(firstCurrency, checkedInput)
            }
          }}
        />
      </div>
      <div className="calculatorItemBlock">
        <CurrencyBlock
          currency={secondCurrency}
          currencyValue={secondCurrencyValue}
          setCurrency={(newCurrency: string) => {
            setSecondCurrency(newCurrency)
            CalculateCurrencyFromSecondValue(newCurrency, secondCurrencyValue)
          }}
        />
        <input
          type="text"
          className={
            theme === 'dark'
              ? 'inputField inputFieldDark'
              : 'inputField inputFieldLight'
          }
          placeholder={'0'}
          value={secondCurrencyValue || ''}
          onChange={(event: any) => {
            if (numbers.test(event.target.value.replace(',', '.'))) {
              const checkedInput: any = CheckInput(event.target.value)
              setSecondCurrencyValue(checkedInput)
              CalculateCurrencyFromSecondValue(secondCurrency, checkedInput)
            }
          }}
        />
      </div>
    </div>
  )
}
