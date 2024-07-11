import React from 'react';
import CustomAlert from './CustomAlert';
import useAlert from '../../hooks/useAlert';


const AlertDemo: React.FC = () => {
    const { alert, showAlert } = useAlert();

    const handleShowAlert = () => {
        showAlert('This is an alert message', 'success', 'top-right', 5000);
    };

    return (
        <div>
            <button onClick={handleShowAlert}>Show Alert</button>
            <CustomAlert
                message={alert.message}
                type={alert.type}
                position={alert.position}
                visible={alert.visible}
                onClose={() => showAlert('', '', '', 0)}
            />
        </div>
    );
};

export default AlertDemo;
