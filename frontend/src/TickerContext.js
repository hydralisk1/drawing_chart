import { createContext, useState } from 'react';

export const TickerContext = createContext();

export const TickerProvider = props => {
    const [ticker, setTicker] = useState('AAPL')

    return (
        <TickerContext.Provider value={{ ticker, setTicker }}>
            { props.children }
        </TickerContext.Provider>
    )
}

export default TickerProvider
