export const cashDrawer = 240

export type CashierSubscriptionMonths = 6 | 12
export function cashierSubscriptionPrice (months: CashierSubscriptionMonths) {
  switch (months) {
    case 6: return 540
    case 12: return 900
  }
}

export const implementation = 450
