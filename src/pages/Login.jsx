import React, { useState } from 'react';
import GuestLayout from '../layouts/GuestLayout';
import MainButton from '../components/MainButton';
import MainInput from '../components/MainInput';
import MainPasswordInput from '../components/MainPasswordInput';
import Link from '../components/Link';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'

export default function Login({ title }) {
    document.title = title;

    const [error, setError] = useState(null);
    const navigateTo = useNavigate(); // Move useNavigate inside the component

    const handleFormSubmit = async (e) => {
        e.preventDefault();

            // const email = e.target.email.value;
            // const password = e.target.password.value;
        
            // console.log(JSON.stringify({ email, password }));
            // const response = await api.post('/api-v1/auth/login', {
            //     email,
            //     password
            // });
            //  console.log(response);
            // if (response.data.code == 200) {
            //     // console.log(response.data);
            //     console.log('Login successful');
            //     const data = response.data;
            //     localStorage.setItem('accessToken', data.token);
            //     localStorage.setItem('userID', data.userID);
            //     localStorage.setItem('userRole', data.userRole);
            //     navigateTo('/dashboard');
            // } else {
            //     console.log(response.data);
            // }
 
        
        try {
            const email = e.target.email.value;
            const password = e.target.password.value;

            console.log(JSON.stringify({ email, password }));

            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_BASE_URL}/api-v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.msg);
            } else {
                const data = await response.json();
                localStorage.setItem('accessToken', data.token);
                localStorage.setItem('userID', data.userID);
                localStorage.setItem('userRole', data.userRole);
                navigateTo('/dashboard');
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <GuestLayout
            headerText={"Sign In"}
            secondaryHeaderText={"We suggest using the email address you use at work."}
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-10' onSubmit={handleFormSubmit}>
                <MainInput
                    name="email"
                    label={"Email"}
                    placeholder={"Enter Email Address"}
                />
                <MainPasswordInput
                    name="password"
                    label={"Password"}
                    placeholder={"Enter Password"}
                />
                <div className='flex justify-end'>
                    <Link href={"/password-reset/send"}>{"Forget Password?"}</Link>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <MainButton className="mt-5">{"Sign in"}</MainButton>

                <span className='text-sm text-center text-[#77787A]' >Don't have a  account?<a className='text-app-blue ' href={"/register"} > Register</a> </span>
            </form>
        </GuestLayout>
    );
}
