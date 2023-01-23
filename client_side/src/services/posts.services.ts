import Axios from "axios";

export async function getPosts() {
    return Axios.get("http://localhost:3001/getCards").then(res =>res.data) 
      
}