import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const startSimulation = () => axios.post(`${BASE_URL}/start`);

export const stopSimulation = () => axios.post(`${BASE_URL}/stop`);

export const getTransactions = () => axios.get(`${BASE_URL}/transactions`);