import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8081",
});


export const createSession = async (usuario, senha) => {
    return api.post('/login', { usuario, senha }).catch(function (error) {
        if (error.response) {
          // A requisição foi feita e o servidor respondeu com um código de status
          // que sai do alcance de 2xx
          //console.error(error.response.data);
          return error.response.data;
         /*  console.error(error.response.status);
          console.error(error.response.headers); */
        } else if (error.request) {
          // A requisição foi feita mas nenhuma resposta foi recebida
          // `error.request` é uma instância do XMLHttpRequest no navegador e uma instância de
          // http.ClientRequest no node.js
          //console.error(error.request);
        } else {
          // Alguma coisa acontenceu ao configurar a requisição que acionou este erro.
          //console.error('Error', error.message);
        }
        //console.error(error.config);
      });
};

 export const getNow = async (equipamento) => {
    return api.get('/getAll/' + equipamento);
};

export const getCad = async (equipamento) => {
    return api.get('/getCad/'+ equipamento);
}; 

export const getTec = async (equipamento) => {
    return api.get('/getTec/'+ equipamento);
};