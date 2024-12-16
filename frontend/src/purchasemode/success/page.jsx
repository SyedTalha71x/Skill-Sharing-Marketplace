/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import { useStateManage } from '../../context/StateContext'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { CheckCircleIcon } from 'lucide-react';

const Page = () => {
    const navigate = useNavigate();
    const { BASE_URL } = useStateManage();
    const [searchParams] = useSearchParams();
    const [sessionId, setSessionId] = useState("");
    const [message, setMessage] = useState(""); 
    const [error, setError] = useState(""); 

    useEffect(() => {
      const id = searchParams.get("session_id")
      if(id){
        setSessionId(id || '')
      }
    }, [searchParams])
    
    useEffect(() => {
        const confirmSubscription = async () => {
          try {
            const token = localStorage.getItem("AuthToken");
            const response = await axios.post(
              `${BASE_URL}/confirm-enrollment`,
              {
                sessionId
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
                }
              }
            );
    
            if (response.status === 200) {
              setMessage("Subscription confirmation is successful!"); 
            } else {
              setError("Subscription confirmation failed");
            }
          } catch (error) {
            setError("Subscription confirmation failed due to an error."); 
            console.log(error);
          }
        };
    
        if (sessionId) {
          confirmSubscription();
        }
      }, [sessionId, BASE_URL]);
    
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex flex-col justify-center items-center text-white">
          <div className="text-center">
            <CheckCircleIcon
              className="h-24 w-24 text-green-600 mx-auto"
              aria-hidden="true"
            />
            <h1 className="text-4xl font-extrabold mt-4">
              {error ? "Subscription Failed" : "Subscription Successful!"}
            </h1>
            <p className="text-lg mt-2">
              {error ? (
                <span className="text-red-400">{error}</span>
              ) : (
                <span>Thank you for subscribing! Your purchase has been successfully completed.</span>
              )}
            </p>
    
            {message && <p className="text-green-300 mt-4">{message}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}
    
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      );
    };
    
    export default Page;