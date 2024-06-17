import React, {useState} from 'react';
import {IAuth} from "../interfaces/authInterface";
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {authService} from "../services/authService";

const RegisterPage = () => {
    const {register, handleSubmit} = useForm<IAuth>();
    const [error, setError] = useState<boolean>(null);
    const navigate = useNavigate();
    const registerUser: SubmitHandler<IAuth> = async (user) => {
        try {
            await authService.register(user)
            setError(false);
            navigate('/login')
        } catch (e) {
            setError(true)
        }
    };

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" placeholder={'username'} {...register('username')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
                <button>register</button>
            {error && <div>Username is already exist</div>}
        </form>
    );
};

export default RegisterPage;