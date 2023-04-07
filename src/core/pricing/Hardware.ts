export type Hardware = 'M2-Max' | 'D1 Desktop' | 'D4-503'

export function hardwarePrice (hardware: Hardware): number {
  switch (hardware) {
    case 'M2-Max': return 1050
    case 'D1 Desktop': return 1299
    case 'D4-503': return 2199
  }
}
