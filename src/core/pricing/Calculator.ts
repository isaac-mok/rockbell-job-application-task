import { cashDrawer, CashierSubscriptionMonths, cashierSubscriptionPrices, implementation } from "./AddOns";
import { Hardware, hardwarePrices } from "./Hardware";
import { InstallmentMonths, adminFeesPercentage } from "./Installment";

export interface Prices {
  basePrice: number,
  installment: {
    total: number,
    monthly: number,
  },
  monthlyPrice: number | undefined
  finalPrice: number
}

export function calculator (hardware: Hardware, addOns: AddOns, installmentMonths?: InstallmentMonths): Prices {
  const hardwarePrice = hardwarePrices[hardware]
  const addOnsPrice = calculateAddOnsPrice(addOns)

  const basePrice = hardwarePrice + addOnsPrice

  const installment = calculateInstallment(basePrice, installmentMonths)

  const finalPrice = basePrice + installment.total

  const monthlyPrice = installmentMonths !== undefined
    ? finalPrice / installmentMonths
    : undefined

  return {
    basePrice,
    installment,
    monthlyPrice,
    finalPrice
  }
}

function calculateAddOnsPrice (addOns: AddOns) {
  const cashDrawerPrice = addOns.cashDrawer !== undefined && addOns.cashDrawer
    ? cashDrawer
    : 0
  
  const cashierSubscriptionPrice = addOns.cashierSubscriptionMonths !== undefined
    ? cashierSubscriptionPrices[addOns.cashierSubscriptionMonths]
    : 0

  const implementationPrice = addOns.implementation !== undefined && addOns.implementation
    ? implementation
    : 0

  return cashDrawerPrice + cashierSubscriptionPrice + implementationPrice
}

function calculateInstallment (basePrice: number, installmentMonths?: InstallmentMonths) {
  if (installmentMonths === undefined) {
    return {
      total: 0,
      monthly: 0
    }
  }

  const total = basePrice * adminFeesPercentage / 100
  const monthly = total / installmentMonths
  
  return {
    total,
    monthly
  }
}

type AddOns = Partial<{
  cashDrawer: boolean,
  cashierSubscriptionMonths: CashierSubscriptionMonths,
  implementation: boolean,
}>
