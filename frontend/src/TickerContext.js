import { createContext, useState } from 'react';

export const TickerContext = createContext();

export const TickerProvider = props => {
    const [ticker, setTicker] = useState({symbol: 'AAPL', name: 'APPLE'})

    return (
        <TickerContext.Provider value={{ ticker, setTicker }}>
            { props.children }
        </TickerContext.Provider>
    )
}

export default TickerProvider
