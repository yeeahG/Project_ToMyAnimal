import React from 'react';
import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_BACK_BASE_URL, 
    headers: {
        'Content-Type': 'application/json;',
        'Authorization': localStorage.getItem('logintoken')
    }
})

export default API;