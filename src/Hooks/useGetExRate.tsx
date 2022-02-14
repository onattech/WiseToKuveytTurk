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

    return { currentExRate, isLive }
}
