export type ReducerProps = {
    tryReceived?: number | ''
    usdSent?: number | ''
    exRateAfterFees?: number | ''
}

export type StreamType = {
    buy: number | ''
    sell: number | ''
    date: string
    count: number
}[]

export type CurrentExRateType = { buy: number | ''; sell: number | '' }
