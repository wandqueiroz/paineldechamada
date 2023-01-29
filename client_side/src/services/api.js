import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8081",
});


export const createSession = async (usuario, senha) => {
    return api.post('/login', { usuario, senha });
};

 export const getNow = async (equipamento) => {
    return api.get('/getNow/' + equipamento);
};

export const getCad = async (equipamento) => {
    return api.get('/getCad/'+ equipamento);
}; 

export const getTec = async (equipamento) => {
    return api.get('/getTec/'+ equipamento);
};