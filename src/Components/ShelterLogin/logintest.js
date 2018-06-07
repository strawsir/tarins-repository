import React from 'react';

export default function Logintest() {
    return (
        <div className='Login'>
            
            <a href={process.env.REACT_APP_LOGIN}>
            <button>LOGIN</button>
            </a>
        </div> 
    )
}