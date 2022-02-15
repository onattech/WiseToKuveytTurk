import { useEffect, useState } from 'react'

type exRateType = {
    buy: number
    sell: number
}

export default function useGetExRate() {
    const [kuveytExRateUSD, setCurrentExRate] = useState<exRateType>({ buy: 0, sell: 0 })
    const [kuveytIsLive, setLive] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('https://go-proxy-kuveyt.herokuapp.com/')
                .then((result) => result.json())
                .then((content) => {
                    setLive(true)
                    setCurrentExRate(content)
                    console.log(content)
                })
                .catch((err) => {
                    setLive(false)
                    console.log(err)
                })
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return { kuveytExRateUSD, kuveytIsLive }
}
