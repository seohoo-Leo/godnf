import axios from "axios";

const DNF_API_KEY = process.env.DNF_API_KEY;

export const dnfApi= axios.create({
    
    params: {
      apikey: DNF_API_KEY,
    }
})