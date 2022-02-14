import { useEffect, useState } from 'react';

export default function useGetExRate() {
    const [currentExRate, setCurrentExRate] = useState([]);
    console.log('🚀 ~ file: useGetExRate.jsx ~ line 5 ~ useGetExRate ~ currentExRate', currentExRate);
    const [isLive, setLive] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('https://go-proxy-kuveyt.herokuapp.com/')
                .then((result) => result.text())
                .then((content) => {
                    setLive(true);
                    setCurrentExRate(extractUSD(content));
                })
                .catch((err) => {
                    setLive(false);
                    console.log(err);
                });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return [currentExRate, isLive];
}

function extractUSD(text) {
    const idx = text.indexOf('USD (Amerikan Doları)');
    const section = text.substring(idx, idx + 800);
    const rate = section.match(/\d\d,\d\d\d\d/g);
    const rateClean = rate.map((a) => (a.replace(',', '.') * 1).toFixed(4));

    return rateClean;
}
