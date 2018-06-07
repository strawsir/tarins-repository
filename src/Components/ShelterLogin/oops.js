import React from 'react';
import './oops.css'

export default function Oops(){
    return(
        <div className="body">
        <header>shelterhelper</header>
        <div>
           <h1>OOPS!</h1>
            <div className="para">It looks like the information you entered was incorrect. Please go back and try again!</div>
            <div>
            <a href="/">GO BACK</a>
            </div>
        </div>
        </div>
    )
}