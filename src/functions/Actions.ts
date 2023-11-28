import { Currency } from '../constants/interfaces'

export async function GetCurrency() {
  const response = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  )
  const data = await response.json()

  const currencyArr: Currency[] = []
  data.forEach((cur: any) => {
    currencyArr.push({ currency: cur.cc, rate: cur.rate, text: cur.txt })
  })
  return currencyArr
}

export function CheckInput(input: string) {
  let num = 0
  if (input.replace(',', '.') === '0' || input.replace(',', '.') === '.') {
    num = 0
  } else {
    num = +input.replace(',', '.')
  }
  return num
}

export function GetDimensions() {
  return { width: window.innerWidth }
}
