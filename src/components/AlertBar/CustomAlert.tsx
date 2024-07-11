import React from 'react';
import { FiInfo } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { PiWarning } from "react-icons/pi";
import { GrClose } from "react-icons/gr";
interface CustomAlertProps {
    message: string;
    position: string;
    type: string
    visible: boolean;
    onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, position, type, visible, onClose }) => {


    const iconType = {
        success: <FaCheck />,
        info: <FiInfo />,
        warning: <PiWarning />,
        error: <GrClose />,
    };



    if (!visible) return null;

    return (
        <div className={`alert-section ${position} bg-${type}`}>
            <div>
                {iconType[type]} {message}
            </div>
            <button onClick={onClose}><GrClose /></button>
        </div>
    );
};



export default CustomAlert;
