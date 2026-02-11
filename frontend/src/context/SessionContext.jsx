import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    // Session state is NOT persisted to storage, ensuring reset on reload
    const [sessionActive, setSessionActive] = useState(false);
    const [graphData, setGraphData] = useState(null); // Placeholder for future graph data

    const startSession = () => {
        setSessionActive(true);
    };

    const resetSession = () => {
        setSessionActive(false);
        setGraphData(null);
    };

    return (
        <SessionContext.Provider value={{ sessionActive, startSession, resetSession, graphData, setGraphData }}>
            {children}
        </SessionContext.Provider>
    );
};
