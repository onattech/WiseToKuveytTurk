import { useEffect, useState } from 'react'

type exRateType = {
    buy: number | ''
    sell: number | ''
}

export default function useGetExRate() {
    const [currentExRate, setCurrentExRate] = useState<exRateType>({ buy: '', sell: '' })
    const [isLive, setLive] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('https://go-proxy-kuveyt.herokuapp.com/')
                // fetch('http://localho.st:40741/')
                .then((result) => result.json())
                .then((content) => {
                    setLive(true)
                    setCurrentExRate(content)
                    console.log(content)
                    // console.log('🚀 ~ file: useGetExRate.tsx ~ line 37 ~ useGetExRate ~ currentExRate', extractUSD(content))
                })
                .catch((err) => {
                    setLive(false)
                    console.log(err)
                })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return { currentExRate, isLive }
}

// Utility function
function extractUSD(text: string) {
    const idx = text.indexOf('USD (Amerikan Doları)')
    const section = text.substring(idx, idx + 800)
    const rate = section.match(/\d\d,\d\d\d\d/g)
    if (rate) {
        const rateClean = rate.map((a) => Number(a.replace(',', '.')).toFixed(4))
        return { buy: rateClean[0], sell: rateClean[1] }
    }
    return { buy: '', sell: '' }
}
