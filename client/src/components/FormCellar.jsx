import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
export default function FormCellar({ cellars, getCellars, filtrarCellar, id, edit }) {
	const [inputs, setInputs] = useState({
		name: "",
		nombreBoton: "Agregar",
	});

	// Cuando monta el componente, trae todos los celars.
	useEffect(() => {
		getCellars();
	}, []);

	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		if (edit) setInputs({ ...filtrarCellar(id), nombreBoton: "Actualizar" });
	}, [id]);

	function handleSubmit(e, edit, id) {
		e.preventDefault();
		if (edit) {
			axios
				.put(`http://localhost:3000/cellar/${id}`, inputs)
				.then(() => {
					window.location.href = "/admin/formCellar";
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3000/cellar";
		axios
			.post(url, inputs)
			.then(res => (window.location.href = "/admin/formCellar"))
			.catch(e => console.log(e));
		setInputs({
			name: "",
			nombreBoton: "Agregar",
		});
	}

	function eliminar(e, id) {
		e.preventDefault();
		if (window.confirm("Esta bodega será eliminada. ¿Confirma?"))
			axios
				.delete(`http://localhost:3000/cellar/${id}`)
				.then(() => {
					window.location.href = "/admin/formCellar";
				})
				.catch(err => console.log(err));
		setInputs({
			name: "",
			nombreBoton: "Agregar",
		});
	}

	return (
		<div>
			<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e, edit, id)}>
				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Bodega
					</Form.Label>
					<Col sm="10">
						<Form.Control
							value={inputs.name}
							onChange={e => setInputs({ ...inputs, name: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					{inputs.nombreBoton}
				</Button>
			</Form>
			<Container id="contenedor">
				{cellars.map(cellar => (
					<Row>
						<Col>{cellar.name}</Col>
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
