import { RootState } from '../redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { CheckInput } from '../functions/Actions'
import { IoCaretDownSharp } from 'react-icons/io5'
import { Currency } from '../constants/interfaces'

const numbers = /^\d{0,10}(\.\d{0,2})?$/

export default function Calculator() {
  const theme = useSelector((state: RootState) => state.theme)
  const currency: any = useSelector((state: RootState) => state.currency)
  const orientation = useSelector((state: RootState) => state.orientation)

  const [firstCurrency, setFirstCurrency] = useState<string>('UAH') // chosen first currency
  const [secondCurrency, setSecondCurrency] = useState<string>('USD') // chosen second currency
  const [firstCurrencyValue, setFirstCurrencyValue] = useState<number>(0) // entered value or calculated value for the first one
  const [secondCurrencyValue, setSecondCurrencyValue] = useState<number>(0) // entered value or calculated value for the second one

  // calculate seccond currency value every time the first one is changed
  function CalculateCurrencyFromFirstValue(
    firstCurrency: string,
    firstCurrencyValue: number
  ) {
    let temporarySecondCurrency = secondCurrency
    if (secondCurrency === firstCurrency) {
      temporarySecondCurrency = currency.filter(
        (i: any) => i.currency !== firstCurrency
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
          +(
            firstCurrencyValue /
            currency.find(
              (c: Currency) => c.currency === temporarySecondCurrency
            )?.rate
          ).toFixed(2)
        )
      } else {
        setSecondCurrencyValue(
          +(
            firstCurrencyValue *
            currency.find((c: Currency) => c.currency === firstCurrency)?.rate
          ).toFixed(2)
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
        (i: any) => i.currency !== secondCurrency
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
          +(
            secondCurrencyValue /
            currency.find(
              (c: Currency) => c.currency === temporaryFirstCurrency
            )?.rate
          ).toFixed(2)
        )
      } else {
        setFirstCurrencyValue(
          +(
            secondCurrencyValue *
            currency.find((c: Currency) => c.currency === secondCurrency)?.rate
          ).toFixed(2)
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

    console.log(currency.find((c: Currency) => c.currency === currency))

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
            {[{ currency: 'UAH' }, ...currency]
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
          currencyValue={firstCurrencyValue}
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
          className={` ${
            theme === 'dark' ? 'inputFieldDark' : 'inputFieldLight'
          } ${orientation === 'landscape' ? 'inputField' : 'inputFieldMobile'}`}
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
