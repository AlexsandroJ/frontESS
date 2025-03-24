"use client";

import React from 'react';
import './Button.css';

function Button({ label, onClick }) {
    return (
        <button onClick={onClick} className="my-button">
            {label}
        </button>
    );
}

export default Button;