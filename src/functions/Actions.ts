export async function GetCurrency() {
  const response = await fetch(
    'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
  )
  const data = await response.json()

  const usdToUahRate = data.find((currency: any) => currency.cc === 'USD').rate
  const eurToUahRate = data.find((currency: any) => currency.cc === 'EUR').rate
  return { USD: usdToUahRate, EUR: eurToUahRate }
}

export function CheckInput(input: string) {
  let num = null
  if (input.replace(',', '.') === '0' || input.replace(',', '.') === '.') {
    num = null
  } else {
    num = input.replace(',', '.')
  }
  return num
}
