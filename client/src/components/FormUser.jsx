import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { getUsers, getUser, cleanUser } from "../store/actions/index";
import { connect } from "react-redux";
function FormUser({ users, user, getUsers, getUser, id, cleanUser }) {
	const [deleted, setDelete] = useState({
		show: false,
		confirmed: false,
		msg: "",
		deleteId: null,
	});
	const [warning, setWarninig] = useState({
		show: false,
		msg: "",
	});
	const [handle, setHandle] = useState("add");
	const [inputs, setInputs] = useState({
		name: "",
		last_name: "",
		email: "",
		password: "",
		//password2 : "",
		phone: "",
		admin: false,
		nombreBoton: "Agregar",
	});
	const [inputs2, setInputs2] = useState({
		password: "",
		password2: "",
	});

	// Cuando monta el componente, trae todos los usuarios.
	useEffect(() => {
		if (!id) return;
		getUser(id);
		setHandle("edit");
	}, [id]);
	useEffect(() => {
		async function fetchData() {
			await getUsers();
		}
		fetchData();
		return () => {
			cleanUser();
		};
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		let values = inputs;
		let nombreBoton = handle === "edit" ? "Actualizar" : "Agregar";
		if (user) values = user;
		setInputs({ ...values, nombreBoton });
	}, [handle, user]);
	useEffect(() => {
		if (deleted.confirmed && deleted.deleteId)
			axios
				.delete(`http://localhost:3000/user/${deleted.deleteId}`)
				.then(() => {
					getUsers();
				})
				.catch(err => {
					console.log(err);
				});
	}, [deleted.confirmed, deleted.deleteId]);
	function handleSubmit(e) {
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
			nombreBoton: "Agregar",
		});
	}
	function eliminar(e, id) {
		e.preventDefault();
		setDelete({
			msg: "Este usuario será eliminado. ¿Está seguro?",
			show: true,
			deleteId: id,
		});
	}

	return (
		<div id="main">
			<Alert
				className="alert"
				variant="warning"
				show={warning.show}
				onClose={() => setWarninig({ ...warning, show: false })}
				dismissible
			>
				<Alert.Heading>Dato requerido!</Alert.Heading>
				<p>{warning.msg}</p>
			</Alert>
			<Alert
				className="alert"
				variant="danger"
				show={deleted.show}
				onClose={() => setDelete({ ...deleted, show: false })}
				dismissible
			>
				<Alert.Heading>Eliminar</Alert.Heading>
				<p>{deleted.msg}</p>
				<div className="d-flex justify-content-end">
					<Button
						onClick={() =>
							setDelete({
								...deleted,
								show: false,
								confirmed: true,
							})
						}
						variant="danger"
					>
						Eliminar
					</Button>
				</div>
			</Alert>
			<Form
				style={{ width: "30rem", marginTop: "8rem", marginBottom: "2rem", textAlign: "right" }}
				onSubmit={e => handleSubmit(e)}
			>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Nombre
					</Form.Label>
					<Col>
						<Form.Control
							value={inputs.name}
							id="name"
							onChange={e => setInputs({ ...inputs, name: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Apellido
					</Form.Label>
					<Col>
						<Form.Control
							value={inputs.last_name}
							id="last_name"
							onChange={e => setInputs({ ...inputs, last_name: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						E-Mail
					</Form.Label>
					<Col>
						<Form.Control
							value={inputs.email}
							type="email"
							id="email"
							onChange={e => setInputs({ ...inputs, email: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Contraseña
					</Form.Label>
					<Col>
						<Form.Control
							value={inputs.password}
							type="password"
							id="password"
							onChange={e => setInputs({ ...inputs, password: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Repita contraseña
					</Form.Label>
					<Col>
						<Form.Control
							value={inputs2.password2}
							type="password"
							id="password2"
							onChange={e => setInputs2({ ...inputs2, password2: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Telefono
					</Form.Label>
					<Col>
						<Form.Control
							value={inputs.phone}
							id="phone"
							onChange={e => setInputs({ ...inputs, phone: e.target.value })}
						/>
					</Col>
				</Form.Group>

				<Button variant="primary" type="submit">
					{inputs.nombreBoton}
				</Button>
			</Form>
			<Container id="contenedor">
				{users.map(user => (
					<Row>
						<Col sm="8">
							{user.name} {user.last_name}
						</Col>
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
export default connect(({ user, users }) => ({ user, users }), { getUser, getUsers, cleanUser })(FormUser);
