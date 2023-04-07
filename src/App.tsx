import { useEffect, useState } from "react"
import { CashierSubscriptionMonths } from "./core/pricing/AddOns"
import { calculator, Prices } from "./core/pricing/Calculator"
import { Hardware } from "./core/pricing/Hardware"
import { InstallmentMonths } from "./core/pricing/Installment"

export default function App() {
  const [hardware, setHardware] = useState<Hardware>('M2-Max')
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


  return (
    <>
      <div>
        <p>Choose hardware</p>
        <div>
          <label htmlFor="M2-Max">M2-Max</label>
          <input id="M2-Max" type="radio" name="hardware" checked={hardware === 'M2-Max'} onChange={() => setHardware('M2-Max')} />
        </div>
        <div>
          <label htmlFor="D1-Desktop">D1 Desktop</label>
          <input id="D1-Desktop" type="radio" name="hardware" checked={hardware === 'D1 Desktop'} onChange={() => setHardware('D1 Desktop')} />
        </div>
        <div>
          <label htmlFor="D4-503">D4-503</label>
          <input id="D4-503" type="radio" name="hardware" checked={hardware === 'D4-503'} onChange={() => setHardware('D4-503')} />
        </div>
      </div>

      <div>
        <p>Add Ons</p>
        <div>
          <p>Cash drawer</p>
          <input type="checkbox" checked={cashDrawer} onChange={() => setCashDrawer((cashDrawer) => !cashDrawer)} />
        </div>
        <div>
          <p>Cashier subscription:</p>
          <div>
            <label htmlFor="cashier-subscription-none">None</label>
            <input id="cashier-subscription-none" type="radio" name="cashier-subscription" checked={cashierSubscriptionMonths === undefined} onChange={() => setCashierSubscriptionMonths(undefined)} />
          </div>
          <div>
            <label htmlFor="cashier-subscription-6m">6 months</label>
            <input id="cashier-subscription-6m" type="radio" name="cashier-subscription" checked={cashierSubscriptionMonths === 6} onChange={() => setCashierSubscriptionMonths(6)} />
          </div>
          <div>
            <label htmlFor="cashier-subscription-12m">12 months</label>
            <input id="cashier-subscription-12m" type="radio" name="cashier-subscription" checked={cashierSubscriptionMonths === 12} onChange={() => setCashierSubscriptionMonths(12)} />
          </div>
        </div>
        <div>
          <p>Implementation:</p>
          <input type="checkbox" checked={implementation} onChange={() => setImplementation((implementation) => !implementation)} />
        </div>
      </div>

      <p>Total amount: {prices.basePrice}</p>

      <div>
        <p>Installment</p>
          <div>
            <label htmlFor="installment-none">None</label>
            <input id="installment-none" type="radio" name="installment" checked={installmentMonths === undefined} onChange={() => setInstallmentMonths(undefined)} />
          </div>
          <div>
            <label htmlFor="installment-3m">3 months</label>
            <input id="installment-3m" type="radio" name="installment" checked={installmentMonths === 3} onChange={() => setInstallmentMonths(3)} />
          </div>
          <div>
            <label htmlFor="installment-6m">6 months</label>
            <input id="installment-6m" type="radio" name="installment" checked={installmentMonths === 6} onChange={() => setInstallmentMonths(6)} />
          </div>
      </div>
      
      {prices.monthlyPrice !== undefined
        ? <p>Monthly installment: {prices.monthlyPrice}</p>
        : <></>}
      <p>Final amount: {prices.finalPrice}</p>
    </>
  )
}
