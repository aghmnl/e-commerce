import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {getUsers, getUser} from "../store/actions/index";
import {connect} from "react-redux";
function FormUser({
	users,
	user,
	getUsers,
	getUser,
	id,
	edit,
	cleanState
}) {
	const [inputs, setInputs] = useState({
		name: "",
        last_name : "",
        email : "",
		password : "",
		//password2 : "",
        phone : "",
		admin : false,
		nombreBoton: "Agregar"

	});
	const [inputs2, setInputs2] = useState({
		password : "",
		password2 : ""
	});

	// Cuando monta el componente, trae todos los usuarios.
	useEffect(() => {
		if(!id) return;
		getUser(id)
	}, [id]);
	useEffect(() => {
		async function fetchData(){
			await getUsers();
		}
		fetchData();
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		setInputs({ ...user, nombreBoton: "Actualizar"});
	}, [user]);
	function handleSubmit(e) {
		e.preventDefault();
		if(!inputs.name){
			alert("Introduzca un nombre");
			document.querySelector("#name").focus();
			return;
		}
		if(inputs2.password != inputs2.password2){
			alert("Las contraseñas no coinciden");
			document.querySelector("#password").focus();
			return;
		}else{
			setInputs({...user,password:inputs2.password});
		}
		if (edit) {
			axios
				.put(`http://localhost:3000/user/${id}`, inputs)
				.then(() => {
					getUsers();
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3000/user";
		axios
			.post(url, inputs)
			.then(res => getUsers())
			.catch(e => console.log(e));
		setInputs({
			name: "",
		});
	}
	function eliminar(e, id) {
		e.preventDefault();
		if (window.confirm("Este usuario será eliminado. ¿Está seguro?"))
			axios
				.delete(`http://localhost:3000/user/${id}`)
				.then(() => {
					getUsers();
				})
				.catch(err => console.log(err));
	}

	return (
		<div>
		<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e)}>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Nombre
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs.name} id="name" onChange={e => setInputs({ ...inputs, name: e.target.value })} />
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Apellido
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs.last_name} id="last_name" onChange={e => setInputs({ ...inputs, last_name: e.target.value })} />
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					E-Mail
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs.email} type="email" id="email" onChange={e => setInputs({ ...inputs, email: e.target.value })} />
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Contraseña
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs2.password} type="password" id="password" onChange={e => setInputs2({ ...inputs2, password: e.target.value })} />
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Repita contraseña
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs2.password2} type="password" id="password2" onChange={e => setInputs2({ ...inputs2, password2: e.target.value })} />
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Telefono
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs.phone} id="phone" onChange={e => setInputs({ ...inputs, phone: e.target.value })} />
				</Col>
			</Form.Group>

			<Button variant="primary" type="submit">
			{inputs.nombreBoton}
			</Button>
		</Form>
		<Container id="contenedor">
			{users.map(user => (
					<Row>
						<Col>{user.name}</Col>
						<Col>
							<Link to={`/admin/formUser/edit/${user.id}`}>Editar</Link>
						</Col>
						<Col>
							<Form onSubmit={e => eliminar(e, user.id)}>
								<Button variant="danger" type="submit">
									Eliminar
								</Button>
							</Form>
						</Col>
					</Row>
				))}
		</Container>
		</div>
	);
}
export default connect(({user, users}) => ({user, users}),
{getUser, getUsers})(FormUser);
