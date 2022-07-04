import React, { useContext, useState } from 'react'

const MainContext = React.createContext();

export function useMainContext() {
    return useContext(MainContext);
}

export function ContextProvider(props) {
    const [messageReset, setMessageReset] = useState(false);
    const [messageUpdate, setMessageUpdate] = useState();
    const [commentIncrement, setMethodIncrement] = useState(3);
    
    const value = {
        messageReset, 
        setMessageReset,
        messageUpdate,
        setMessageUpdate,
        commentIncrement,
        setMethodIncrement
    }

    return (
        <MainContext.Provider value={value}>
            {props.children}
        </MainContext.Provider>
    )
}