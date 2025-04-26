import axios from 'axios';
import { toast } from 'react-hot-toast';
import {create} from 'zustand';


export const useAuthStore = create((set) => ({
    user:null,
    usersigningin:false,
    ischeckingauth:false,
    islogingout:false,
    islogingin:false,
    signup:async(credentional)=>{
        set({usersigningin:true})
        try {
           const responce= await axios.post('/api/v1/auth/signup', credentional)
           set({user:responce.data.user, usersigningin:false})  
           toast.success('User Created Successfully')              
        } catch (error) {
            toast.error(error.response.data.message || "An error occured")
            set({usersigningin:false,user:null })
        }
    },
    login:async(credentional)=>{
        set({islogingin:true})
        try {
            const responce= await axios.post('/api/v1/auth/login', credentional)
            set({user:responce.data.user, islogingin:false})  
            toast.success('Login Successfully')              
         } catch (error) {
             toast.error(error.response.data.message || "An error occured")
             set({islogingin:false,user:null })
         }
    },
    logout:async()=>{
        try {
            set({islogingout:true})
            await axios.post('/api/v1/auth/logout')
            set({user:null, islogingout:false})
            toast.success('Logout Successfully')
        } catch (error) {
            console.log(error)
            set({islogingout:false})
            toast.error(error.response.data.message || "An error occured")
        }
    },
    authcheck:async()=>{
        set({ischeckingauth:true})
        try {
            const responce= await axios.get('/api/v1/auth/authcheck')
            set({user:responce.data.user, ischeckingauth:false})  
        } catch (error) {
            set({ischeckingauth:false,user:null })
            console.log(error)
            // toast.error(error.response.data.message || "An error occured")
        }
    }
}));