import { RootState } from '../redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { CheckInput } from '../functions/Actions'
import { IoCaretDownSharp } from 'react-icons/io5'
import { Currency } from '../constants/interfaces'

const numbers = /^\d{0,10}(\.\d{0,2})?$/

export default function Calculator() {
  const theme: string = useSelector((state: RootState) => state.theme)
  const currency: Currency[] = useSelector((state: RootState) => state.currency)
  const orientation: string = useSelector(
    (state: RootState) => state.orientation
  )

  const [firstCurrency, setFirstCurrency] = useState<string>('UAH') // chosen first currency
  const [secondCurrency, setSecondCurrency] = useState<string>('USD') // chosen second currency
  const [firstCurrencyValue, setFirstCurrencyValue] = useState<number>(0) // entered value or calculated value for the first one
  const [secondCurrencyValue, setSecondCurrencyValue] = useState<number>(0) // entered value or calculated value for the second one

  function GetValueFromCurrency(value: number, newCurrency: string) {
    const selectedCurrency = currency?.find(
      (c: Currency) => c.currency === newCurrency
    )?.rate
    let result: number = 0
    if (selectedCurrency) {
      result = value / selectedCurrency
    }

    return +result.toFixed(2)
  }

  // calculate seccond currency value every time the first one is changed
  function CalculateCurrencyFromFirstValue(
    firstCurrency: string,
    firstCurrencyValue: number
  ) {
    let temporarySecondCurrency = secondCurrency
    if (secondCurrency === firstCurrency) {
      temporarySecondCurrency = currency.filter(
        (i: Currency) => i.currency !== firstCurrency
      )[0].currency
      setSecondCurrency(temporarySecondCurrency)
    }
    if (firstCurrency !== 'UAH' && secondCurrency !== 'UAH') {
      temporarySecondCurrency = 'UAH'
      setSecondCurrency('UAH')
    }

    if (firstCurrencyValue) {
      //currency[temporarySecondCurrency]
      if (!currency.find((c: Currency) => c.currency === firstCurrency)) {
        setSecondCurrencyValue(
          GetValueFromCurrency(firstCurrencyValue, temporarySecondCurrency)
        )
      } else {
        setSecondCurrencyValue(
          GetValueFromCurrency(firstCurrencyValue, firstCurrency)
        )
      }
    } else {
      setSecondCurrencyValue(0)
    }
  }

  // calculate fisrt currency value every time the second one is changed
  function CalculateCurrencyFromSecondValue(
    secondCurrency: string,
    secondCurrencyValue: number
  ) {
    let temporaryFirstCurrency = firstCurrency
    if (secondCurrency === firstCurrency) {
      temporaryFirstCurrency = currency.filter(
        (i: Currency) => i.currency !== secondCurrency
      )[0].currency
      setFirstCurrency(temporaryFirstCurrency)
    }
    if (firstCurrency !== 'UAH' && secondCurrency !== 'UAH') {
      temporaryFirstCurrency = 'UAH'
      setFirstCurrency('UAH')
    }

    if (secondCurrencyValue) {
      if (!currency.find((c: Currency) => c.currency === secondCurrency)) {
        setFirstCurrencyValue(
          GetValueFromCurrency(secondCurrencyValue, temporaryFirstCurrency)
        )
      } else {
        setFirstCurrencyValue(
          GetValueFromCurrency(secondCurrencyValue, secondCurrency)
        )
      }
    } else {
      setFirstCurrencyValue(0)
    }
  }

  // dropdown
  function CurrencyBlock(props: any) {
    const theme = useSelector((state: RootState) => state.theme)
    const [dropDown, setDropDown] = useState<boolean>(false)

    function CurrencyDropDownItem({ currency }: { currency: Currency }) {
      return (
        <button
          className="CurrencyDropDownButton"
          onClick={() => {
            setDropDown(false)
            props.setCurrency(currency.currency)
          }}
        >
          <p
            className="CurrencyDropDownTitle"
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            {currency.currency}
          </p>
          <p style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
            {currency.text}
          </p>
        </button>
      )
    }

    return (
      <div className="currencyButtonBlock">
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
            style={{
              color: theme === 'dark' ? '#fff' : '#000',
              marginRight: 30,
            }}
          >
            {props.currency}
          </p>
        </button>
        {dropDown ? (
          <div
            className={
              theme === 'dark'
                ? 'dropDownCurrency dropDownDark'
                : 'dropDownCurrency dropDownLight'
            }
            style={{
              backgroundColor: theme === 'dark' ? '#282c34' : '#E2E8F5',
            }}
          >
            {[{ currency: 'UAH', text: 'Гривня', rate: 0 }, ...currency]
              .filter((i: Currency) => i.currency !== props.currency)
              .map((cur: Currency) => (
                <CurrencyDropDownItem key={cur.currency} currency={cur} />
              ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    )
  }

  return (
    <div className={theme === 'dark' ? 'flexView darkBG' : 'flexView lightBG'}>
      <div className="calculatorItemBlock">
        <CurrencyBlock
          currency={firstCurrency}
          setCurrency={(newCurrency: string) => {
            setFirstCurrency(newCurrency)
            CalculateCurrencyFromFirstValue(newCurrency, firstCurrencyValue)
          }}
        />
        <input
          type="text"
          className={` ${
            theme === 'dark' ? 'inputFieldDark' : 'inputFieldLight'
          } ${orientation === 'landscape' ? 'inputField' : 'inputFieldMobile'}`}
          placeholder={'0'}
          value={firstCurrencyValue || ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (numbers.test(event.target.value.replace(',', '.'))) {
              const checkedInput: number = CheckInput(event.target.value)
              setFirstCurrencyValue(checkedInput)
              CalculateCurrencyFromFirstValue(firstCurrency, checkedInput)
            }
          }}
        />
      </div>
      <div className="calculatorItemBlock">
        <CurrencyBlock
          currency={secondCurrency}
          setCurrency={(newCurrency: string) => {
            setSecondCurrency(newCurrency)
            CalculateCurrencyFromSecondValue(newCurrency, secondCurrencyValue)
          }}
        />
        <input
          type="text"
          className={` ${
            theme === 'dark' ? 'inputFieldDark' : 'inputFieldLight'
          } ${orientation === 'landscape' ? 'inputField' : 'inputFieldMobile'}`}
          placeholder={'0'}
          value={secondCurrencyValue || ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (numbers.test(event.target.value.replace(',', '.'))) {
              const checkedInput: number = CheckInput(event.target.value)
              setSecondCurrencyValue(checkedInput)
              CalculateCurrencyFromSecondValue(secondCurrency, checkedInput)
            }
          }}
        />
      </div>
    </div>
  )
}
