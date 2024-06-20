import React from 'react';
import notificationIcon from '../../assets/icons/notificationIcon.svg';
import AbrirModalNotification from '../modals/modalNotification';

function ButtonNotification() {
    return (
        <a onClick={ativarNotificacao} className="cursor-pointer">
            <img className='w-[2.5rem]' src={notificationIcon} alt="Notificação"/>
        </a>
    );
}

function ativarNotificacao() {
    AbrirModalNotification();
}

export default ButtonNotification;
