import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Nav, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { getCellars, getCellar, cleanCellar } from "../store/actions/index";
import { connect } from "react-redux";
function FormCellar({ cellars, cellar, getCellars, getCellar, id, edit, cleanCellar }) {
	const [deleted, setDelete] = useState({
		show: false,
		confirmed: false,
		msg: "",
		deleteId: null,
	});
	const [warning, setWarning] = useState({
		show: false,
		msg: "",
	});
	const [handle, setHandle] = useState("add");
	const [inputs, setInputs] = useState({
		name: "",
		edit: false,
		nombreBoton: "Agregar",
	});

	// Cuando monta el componente, trae todos los celars.
	useEffect(() => {
		if (!id) return;
		getCellar(id);
		setHandle("edit");
	}, [id]);
	useEffect(() => {
		async function fetchData() {
			await getCellars();
		}
		fetchData();
		return () => {
			cleanCellar();
		};
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		let values = inputs;
		let nombreBoton = handle === "edit" ? "Actualizar" : "Agregar";
		if (cellar) values = cellar;
		setInputs({ ...values, nombreBoton });
	}, [handle, cellar]);
	useEffect(() => {
		if (deleted.confirmed && deleted.deleteId)
			axios
				.delete(`http://localhost:3000/cellar/${deleted.deleteId}`)
				.then(() => {
					getCellars();
				})
				.catch(err => {
					console.log(err);
					setWarning({
						show: true,
						msg: "No se puede eliminar",
					});
				});
	}, [deleted.confirmed, deleted.deleteId]);
	function handleSubmit(e) {
		e.preventDefault();
		if (!inputs.name) {

			setWarninig({ show: true, msg: `Se requiere el ingreso de nombre de cepa` });

			document.querySelector("#name").focus();
			return;
		}
		if (edit) {
			axios
				.put(`http://localhost:3000/cellar/${id}`, inputs)
				.then(() => {
					getCellars();
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3000/cellar";
		axios
			.post(url, inputs)
			.then(res => getCellars())
			.catch(e => console.log(e));
		setInputs({
			nombreBoton: "Agregar",
		});
	}
	function eliminar(e, id) {
		e.preventDefault();
		setDelete({
			msg: "Esta bodega será eliminada, ¿Confirma?",
			show: true,
			deleteId: id,
		});
	}

	return (
		<div id="main" style={{ textAlign: "right" }}>
			<Alert
				className="alert"
				variant="warning"
				show={warning.show}
				onClose={() => setWarning({ ...warning, show: false })}
				dismissible
			>
				<Alert.Heading>Advertencia!</Alert.Heading>
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
			<Form style={{ width: "25rem", marginTop: "8rem", marginBottom: "2rem" }} onSubmit={e => handleSubmit(e)}>
				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Bodega
					</Form.Label>
					<Col sm="10">
						<Form.Control
							value={inputs.name}
							placeholder="Bodega"
							id="name"
							onChange={e => setInputs({ ...inputs, name: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					{inputs.nombreBoton}
				</Button>
			</Form>
			<Container id="contenedor" style={{ width: "30rem" }}>
				{cellars.map(cellar => (
					<Row rs="">
						<Col sm="8">{cellar.name}</Col>
						<Col>
							<Link to={`/admin/formCellar/edit/${cellar.id}`}>Editar</Link>
						</Col>
						<Col>
							<Form onSubmit={e => eliminar(e, cellar.id)}>
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
export default connect(({ cellar, cellars }) => ({ cellar, cellars }), { getCellar, getCellars, cleanCellar })(
	FormCellar
);
