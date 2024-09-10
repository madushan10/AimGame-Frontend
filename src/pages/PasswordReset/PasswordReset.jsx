import React, { useState } from 'react';
import GuestLayout from '../../layouts/GuestLayout'
import MainPasswordInput from '../../components/MainPasswordInput'
import MainButton from '../../components/MainButton'
import { useNavigate } from 'react-router-dom';
const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL;

export default function PasswordReset({ title }) {
    document.title = title
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const email = localStorage.otpEmail;
            const otp = localStorage.otp;
            const password = e.target.password.value;
            const confirm_password = e.target.confirm_password.value;

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

            if(password != confirm_password){
                setError("Passwords dose not match");
            }

            else if (!passwordRegex.test(password)) {
                setError("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.");
                return;
            }

            else{
            console.log(JSON.stringify({email, otp, password}));
            
            const response = await fetch(`${base_url}/api-v1/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.accessToken}`,
                },
                
                body: JSON.stringify({email, otp, password}),
            });

            if (!response.ok) {
                document.getElementById("page-loader").style.display = 'none';
                const errorData = await response.json();
                setError(errorData.errors);
            } else {
                document.getElementById("page-loader").style.display = 'none';
                setSuccess("Password reset successful");
            }
        }
        } catch (error) {
            document.getElementById("page-loader").style.display = 'none';
            console.error('Error occurred:', error);
            setError(error.message);
        }
    };
    return (
        <GuestLayout
            headerText={"Reset Password"}
            secondaryHeaderText={"Enter your new password"}
        >
            <form className='flex flex-col gap-5 w-[90%] lg:w-[400px] mt-10' onSubmit={handleFormSubmit} >
                <MainPasswordInput
                    name="password"
                    label={"Password"}
                    placeholder={"Enter Password"}
                />
                <MainPasswordInput
                    name="confirm_password"
                    label={"Confirm Password"}
                    placeholder={"Enter Confirm Password"}
                />
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <MainButton
                    className="mt-5"
                >{"Reset Password"}</MainButton>
            </form>
        </GuestLayout>
    )
}
