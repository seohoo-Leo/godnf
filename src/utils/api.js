import axios from "axios";

const API_KEY=process.env.REACT_APP_API_KEY;

export const dnfApi= axios.create({
    baseURL:'https://api.neople.co.kr/df',
    params:{
        apikey: API_KEY
    }
})