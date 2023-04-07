import { defineStore } from "pinia";
import { ref } from 'vue';
export const useExchangeStore = defineStore('exchange', () => {
  // state
  const loading = ref(false)
  const apiKey = import.meta.env.VITE_APIKEY
  const currencies = ref([])
  const error = ref()
  const data = ref()
  const currencyOne = ref('EUR')
  const currencyTwo = ref('PLN')
  const amountOne = ref(1)
  const amountTwo = ref()
  const rates = ref()

  //actions
  
  const handleCurrencyRates = async (currency) => {
    loading.value = true
    const resp = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}
    `)
    const json = await resp.json()
    rates.value = json.conversion_rates
    loading.value = false
  }
  
  const handleCurrencies = async () => {
    const resp = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes/`)
    const json = await resp.json()
    currencies.value = json.supported_codes
  }

  return { data, loading, currencies, error, handleCurrencies, handleCurrencyRates, currencyOne,currencyTwo,amountOne,amountTwo,rates}

})