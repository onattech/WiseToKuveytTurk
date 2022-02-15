export type ReducerProps = {
    wiseTRYsent: number
    wiseUSDsent: number
    wiseExRateAfterFees: number
}

export type StreamType = {
    buy: number
    sell: number
    date: string
    count: number
}[]

export type CurrentExRateType = { buy: number; sell: number }
