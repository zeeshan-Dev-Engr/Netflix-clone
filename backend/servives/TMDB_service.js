import { ENV_VARS } from '../config/env_vars.js';
import axios from 'axios';

export const fetchfromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer '+ ENV_VARS.TMDB_API_KEY
        }
      };

    const response = await axios.get(url, options)

     if (response.status !== 200) {
        throw new Error(`Error fetching data from TMDB: ${response.statusText}`);
     }
    return response.data; 

}