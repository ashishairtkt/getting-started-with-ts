import { useState, useCallback } from 'react';

const useAlert = (initialState = { message: '', type: 'success', position: 'top-left' }, timeout = 3000) => {
    const [alert, setAlert] = useState({ ...initialState, visible: false });

    const showAlert = useCallback((message, type = 'success', position = 'top-left', duration = timeout) => {
        setAlert({ message, type, position, visible: true });

        setTimeout(() => {
            setAlert(prev => ({ ...prev, visible: false }));
        }, duration);
    }, [timeout]);

    return { alert, showAlert };
};

export default useAlert;
