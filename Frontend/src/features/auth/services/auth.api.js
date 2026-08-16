import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export async function register({username, email, password}){
    try{
        const response = await axios.post(`${BASE_URL}/register`,{
            username, email, password
        },{
            withCredentials: true
        })
        return response.data

    }catch(err){
        console.log(err)
        throw err
    }
}

export async function login({email, password}){
    try{
        const response = await axios.post(`${BASE_URL}/login`,{
            email, password
        },{
            withCredentials: true
        })
        return response.data

    }catch(err){
        console.log(err)
        throw err
    }
}

export async function logout(){
    try{
        const response = await axios.post(`${BASE_URL}/logout`, {}, {
            withCredentials: true
        })
        return response.data

    }catch(err){
        console.log(err)
        throw err
    }
}

export async function getMe() {
  const response = await axios.get(`${BASE_URL}/get-me`, {
    withCredentials: true
  });
  return response.data;
}

