import { useEffect, useState } from "react"
import { cashDrawer as cashDrawerPrice, CashierSubscriptionMonths, cashierSubscriptionPrices, implementation as implementationPrice } from "./core/pricing/AddOns"
import { calculator, Prices } from "./core/pricing/Calculator"
import { Hardware, hardwarePrices } from "./core/pricing/Hardware"
import { InstallmentMonths } from "./core/pricing/Installment"

export default function App() {
  const [hardware, setHardware] = useState<Hardware>('M2Max')
  const [cashDrawer, setCashDrawer] = useState<boolean>(false)
  const [cashierSubscriptionMonths, setCashierSubscriptionMonths] = useState<CashierSubscriptionMonths | undefined>()
  const [implementation, setImplementation] = useState<boolean>(false)
  const [installmentMonths, setInstallmentMonths] = useState<InstallmentMonths | undefined>()
  const [prices, setPrices] = useState<Prices>({
    basePrice: 0,
    installment: {
      total: 0,
      monthly: 0,
    },
    monthlyPrice: undefined,
    finalPrice: 0
  })

  useEffect(() => {
    setPrices(calculator(
      hardware,
      {
        cashDrawer,
        cashierSubscriptionMonths,
        implementation
      },
      installmentMonths
    ))
  }, [hardware, cashDrawer, cashierSubscriptionMonths, implementation, installmentMonths])

  function formatPrice (price: number) {
    return `RM${price.toFixed(2)}`
  }

  return (
    <div className="container px-2 mx-auto my-2">
      <h1 className="text-3xl mb-2 font-bold">Pricing Calculator</h1>
      <div className="border-b py-2">
        <p className="text-lg underline">1. Choose a Hardware</p>
        <div className="sm:flex flex-wrap gap-4">
          <label htmlFor="M2-Max" className="flex flex-col flex-1">
            <div>
              <input id="M2-Max" className="mr-2" type="radio" name="hardware" checked={hardware === 'M2Max'} onChange={() => setHardware('M2Max')} />
              M2-Max ({formatPrice(hardwarePrices.M2Max)})
            </div>
            <div className="w-64 flex-1 flex items-center">
              <img src="/M2-Max.png" className="w-full" />
            </div>
          </label>
          <label htmlFor="D1-Desktop" className="flex flex-col flex-1">
            <div>
              <input id="D1-Desktop" className="mr-2" type="radio" name="hardware" checked={hardware === 'D1_Desktop'} onChange={() => setHardware('D1_Desktop')} />
              D1 Desktop ({formatPrice(hardwarePrices.D1_Desktop)})
            </div>
            <div className="w-64 flex-1 flex items-center">
              <img src="/D1 Desktop.png" className="w-full" />
            </div>
          </label>
          <label htmlFor="D4-503" className="flex flex-col flex-1">
            <div>
              <input id="D4-503" className="mr-2" type="radio" name="hardware" checked={hardware === 'D4503'} onChange={() => setHardware('D4503')} />
              D4-503 ({formatPrice(hardwarePrices.D4503)})
            </div>
            <div className="w-40 flex-1 flex items-center">
              <img src="/D4-503.png" className="w-full" />
            </div>
          </label>
        </div>
      </div>

      <div className="border-b py-2">
        <p className="text-lg underline">2. Pick your Add Ons</p>
        <div className="px-2">
          <div className="border-b py-1">
            <input id="cash-drawer" type="checkbox" className="mr-2" checked={cashDrawer} onChange={() => setCashDrawer((cashDrawer) => !cashDrawer)} />
            <label htmlFor="cash-drawer">Cash Drawer ({formatPrice(cashDrawerPrice)})</label>
          </div>
          <div className="border-b py-1">
            <p>Cashier subscription:</p>
            <div>
              <input id="cashier-subscription-none" className="mr-2" type="radio" name="cashier-subscription" checked={cashierSubscriptionMonths === undefined} onChange={() => setCashierSubscriptionMonths(undefined)} />
              <label htmlFor="cashier-subscription-none">None</label>
            </div>
            <div>
              <input id="cashier-subscription-6m" className="mr-2" type="radio" name="cashier-subscription" checked={cashierSubscriptionMonths === 6} onChange={() => setCashierSubscriptionMonths(6)} />
              <label htmlFor="cashier-subscription-6m">6 months ({formatPrice(cashierSubscriptionPrices[6])})</label>
            </div>
            <div>
              <input id="cashier-subscription-12m" className="mr-2" type="radio" name="cashier-subscription" checked={cashierSubscriptionMonths === 12} onChange={() => setCashierSubscriptionMonths(12)} />
              <label htmlFor="cashier-subscription-12m">12 months ({formatPrice(cashierSubscriptionPrices[12])})</label>
            </div>
          </div>
          <div className="py-1">
            <input id="implementation" type="checkbox" className="mr-2" checked={implementation} onChange={() => setImplementation((implementation) => !implementation)} />
            <label htmlFor="implementation">Implementation ({formatPrice(implementationPrice)})</label>
          </div>
        </div>
      </div>

      <p className="my-4 text-xl font-bold">Total amount: {formatPrice(prices.basePrice)}</p>

      <div className="border-y py-2">
        <p className="text-lg underline">3. Installment Options</p>
          <div>
            <input id="installment-none" className="mr-2" type="radio" name="installment" checked={installmentMonths === undefined} onChange={() => setInstallmentMonths(undefined)} />
            <label htmlFor="installment-none">None</label>
          </div>
          <div>
            <input id="installment-3m" className="mr-2" type="radio" name="installment" checked={installmentMonths === 3} onChange={() => setInstallmentMonths(3)} />
            <label htmlFor="installment-3m">3 months</label>
          </div>
          <div>
            <input id="installment-6m" className="mr-2" type="radio" name="installment" checked={installmentMonths === 6} onChange={() => setInstallmentMonths(6)} />
            <label htmlFor="installment-6m">6 months</label>
          </div>
      </div>
      
      <div className="my-4">
        {prices.monthlyPrice !== undefined
          ? <p className="text-lg">Monthly installment: {formatPrice(prices.monthlyPrice)}</p>
          : <></>}
        <p className="text-xl font-bold">Final amount: {formatPrice(prices.finalPrice)}</p>
      </div>
    </div>
  )
}
