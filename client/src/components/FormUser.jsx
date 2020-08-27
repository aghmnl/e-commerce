import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getUsers, getUser, cleanUser } from "../store/actions/index";
import { connect } from "react-redux";
import UDTable from "./UDTable";
function FormUser({ users, user, getUsers, getUser, id, cleanUser }) {
	const history = useHistory();
	const [handle, setHandle] = useState("add");
	const [admin, setAdmin] = useState();
	// Cuando monta el componente, trae todos los usuarios.
	useEffect(() => {
		if (!id) return;
		getUser(id);
		setHandle("edit");
	}, [id]);
	useEffect(() => {
		getUsers();
		return () => {
			cleanUser();
		};
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		user && setAdmin(user.admin);
	}, [user]);
	/* function handleSubmit(e) {
		e.preventDefault();
		if (!inputs.name) {
			setWarninig({ show: true, msg: `Se requiere el ingreso de name` });
			document.querySelector("#name").focus();
			return;
		}
		if (inputs.password != inputs2.password2) {
			setWarninig({ show: true, msg: `Se requiere el ingreso de contraseña` });
			document.querySelector("#password").focus();
			return;
		} else {
			setInputs({ ...user, password: inputs2.password });
		}
		if (!!id) {
			axios
				.put(`http://localhost:3001/user/${id}`, inputs)
				.then(() => {
					getUsers();
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3001/user";
		axios
			.post(url, inputs)
			.then(res => getUsers())
			.catch(e => console.log(e));
		setInputs({
			nombreBoton: "Agregar",
		});
	} */
	return (
		<div id="main" style={{marginTop: "8rem"}}>
			{handle==="edit"? (
				<Form
				style={{ width: "30rem", marginBottom: "2rem", textAlign: "right" }}
				onSubmit={(e) =>{
					e.preventDefault();
					axios
						.put(`http://localhost:3001/user/${id}`, {admin})
						.then(() => {
							getUsers();
						})
						.catch(err => console.log("error", err));
				}}
			>
				<Container>
				<Row>
					<Col>Nombre</Col>
					<Col>Apellido</Col>
					<Col>Email</Col>
					<Col>Teléfono</Col>
				</Row>
				<Row>
					<Col>{user && user.name}</Col>
					<Col>{user && user.last_name}</Col>
					<Col>{user && user.email}</Col>
					<Col>{user && user.phone}</Col>
				</Row>
				</Container>
				<Form.Group >
					<Form.Check
							checked={admin}
							label="Hacer Admin"
							onChange={() =>setAdmin(!admin)}
						/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Asignar
				</Button>
				<Button variant="secondary" onClick={()=>history.replace("/admin/formUser")}>
					Cancelar
				</Button>
				</Form>
			):<div>Seleccione un usuario</div>}
			<UDTable
				headers={["#","Nombre","Apellido","Email","Telefono","Admin"]}
				rows={users}
				attributes={["id","first_name","last_name","email","phone","admin"]}
				updateURL="/admin/formUser/edit" 
				updatePk="id"
			/>
		</div>
	);
}
export default connect(({ user, users }) => ({ user, users }), { getUser, getUsers, cleanUser })(FormUser);
