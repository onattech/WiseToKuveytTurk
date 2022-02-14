// --------- Utility functions
export function exchangeRateAfterFeeCut(exchange: number, percentage: number, amount: number): number {
    return (exchange * (100 - (percentage / amount) * 100)) / 100
}

export function tryReceivedFn(exchange: number, percentage: number, amount: number): number {
    return exchange * ((100 - (percentage / amount) * 100) / 100) * amount
}
