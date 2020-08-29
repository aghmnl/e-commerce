import React, { useState, useEffect } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import { useDispatch, useSelector, connect } from "react-redux";
import { isAuth, isAdmin } from "../store/actions/index";
function Login() {
	const dispatch = useDispatch();
	const { logged, Admin } = useSelector(state => state);
	var history = useHistory();
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const [warning, setWarninig] = useState({
		show: false,
		msg: "",
	});
	function handleSubmit(e) {
		e.preventDefault();
		if (!inputs.email) {
			setWarninig({ show: true, msg: `Se requiere email` });
			document.querySelector("#email").focus();
			return;
		}
		if (!inputs.password) {
			setWarninig({ show: true, msg: `Se requiere contraseña` });
			document.querySelector("#password").focus();
			return;
		}
		const url = "http://localhost:3001/auth/login";
		axios
			.post(url, inputs, {
				withCredentials: true,
			})
			.then(res => {
				console.log({ res });
				history.replace("/user");
				dispatch(isAuth());
				dispatch(isAdmin());
			})
			.catch(e => console.log(e));
	}

	if (Admin) {
		return <Redirect to="/admin" />;
	} else {
		if (logged) return <Redirect to="/user" />;
	}
	return (
		<div className=" row contenedor">
			<form className="col-4 login" onSubmit={e => handleSubmit(e)}>
				<h2>INICIAR SESIÓN</h2>

				<div className="form-group">
					<label>Email</label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={inputs.email}
						onChange={e => setInputs({ ...inputs, email: e.target.value })}
						placeholder="Ingrese email"
					/>
				</div>

				<div className="form-group">
					<label>Contraseña</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={inputs.password}
						onChange={e => setInputs({ ...inputs, password: e.target.value })}
						placeholder="Ingrese contraseña"
					/>
				</div>

				<button type="submit" className="btn btn-primary btn-block">
					Iniciar Sesión
				</button>
				<p className="forgot-password text-center mt-2">
					<Link to="/reset">¿Olvidó su contraseña? </Link>
					&nbsp; &nbsp; &nbsp;
					<Link to="/register"> Registrar nuevo usuario</Link>
				</p>
			</form>
		</div>
	);
}

export default connect(({ logged, Admin }) => {
	return {
		logged,
		Admin,
	};
})(Login);
