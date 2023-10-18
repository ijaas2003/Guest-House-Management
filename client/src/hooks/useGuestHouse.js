import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const useGuestHouse = () => {
    const [iserror, setError] = useState(null);
    const [isloading, setLoading] = useState(null);
    const {  user } = useAuthContext();
    const location = useNavigate();
    const GuestHouse = async ({ OwnerEmail, OwnerName,  MaxGuest, Room, Kitchen, RentAmount, LimitDays, Address, HouseImg }) => {
        setError(null);
        setLoading(true);
        // this is for the limit set to axios for sending the BASE64 to server 
        // the base64 length is too high so to increase the content length to 5000000.
        axios.defaults.maxContentLength = 5000000;
        try {
            //this the api call to backend to send the house data to the endpoint
            await fetch('http://localhost:4000/guesthousedata', {
                method:"POST",
                headers: {
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    OwnerEmail,
                    OwnerName,
                    MaxGuest,
                    Room,
                    Kitchen,
                    RentAmount,
                    LimitDays,
                    Address,
                    HouseImg:HouseImg
                }) 
            }).then((res) => {
                return res.json();
            }).then((data) => {
                if(data.Error){
                    toast.error(data.Error);
                }
                else{
                    location('/ownerhome');
                    toast.success("Successfully Stored in");
                }
            })
        } catch (error) {
            setLoading(false);
            toast.error('An error occurred while saving the data.');
        }
    }
    return { GuestHouse, isloading, iserror };
}

export default useGuestHouse;
