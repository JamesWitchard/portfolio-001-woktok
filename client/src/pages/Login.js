import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import style from '../styles/components/Form.module.css'
import {AuthContext} from "../helpers/AuthContext";


const Login = () => {
	const [errors, setErrors] = useState("")
	const {setAuthState} = useContext(AuthContext);
	const navigator = useNavigate();

	const initialValues = {
		username: "",
		password: ""
	}

	const validationSchema = Yup.object().shape({
		username: Yup.string().required(),
		password: Yup.string().required()
	});

	const onSubmit = (data) => {
		axios.post("http://localhost:3001/auth/login", data).then((res) => {
			if (res.data.error) {
				setErrors(res.data.error);
				return;
			}
			localStorage.setItem("accessToken", res.data.token);
			setAuthState({
				username: res.data.username,
				id: res.data.id,
				status: true
			});
			navigator("/");
		});
	};

	return (
		<div className={style.container}>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form className={style.form}>
					{errors && <span>{errors}</span>}
					<label className={style.required}>Username:</label>
					<ErrorMessage name="username" component="span"/>
					<Field id="inputUsername" name="username" placeholder="Username..."/>
					<label className={style.required}>Password:</label>
					<ErrorMessage name="password" component="span"/>
					<Field id="inputPassword" name="password"
					       placeholder="Password..." type="password"
					/>
					<button className={style.btn} type="submit">Log In</button>
				</Form>
			</Formik>
		</div>
	);
};

export default Login;