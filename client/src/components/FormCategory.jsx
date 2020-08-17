import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Nav } from "react-bootstrap";
import "../styles/FormCategory.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FormCategory({ categories, getCategories, filtrarCategory, id, edit }) {
	const [inputs, setInputs] = useState({
		name: "",
		description: "",
		nombreBoton: "Agregar",
	});
	// Cuando monta el componente, trae todos las categories.
	useEffect(() => {
		getCategories();
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		if (edit) setInputs({ ...filtrarCategory(id), nombreBoton: "Actualizar" });
	}, [id]);

	function handleSubmit(e, edit, id) {
		e.preventDefault();
		if (edit) {
			axios
				.put(`http://localhost:3000/category/${id}`, inputs)
				.then(() => {
					window.location.href = "/admin/formCategory";
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3000/category";
		axios
			.post(url, inputs)
			.then(() => (window.location.href = "/admin/formCategory"))
			.catch(e => console.log(e));
		setInputs({
			name: "",
			description: "",
		});
	}
	function eliminar(e, id) {
		e.preventDefault();
		if (window.confirm("Esta categoría será eliminada. ¿Confirma?"))
			axios
				.delete(`http://localhost:3000/category/${id}`)
				.then(() => {
					window.location.href = "/admin/formCategory";
				})
				.catch(err => console.log(err));
	}
	return (
		<div>
			<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e, edit, id)}>
				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Categoría
					</Form.Label>
					<Col sm="10">
						<Form.Control
							value={inputs.name}
							onChange={e => setInputs({ ...inputs, name: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Descripción
					</Form.Label>
					<Col sm="10">
						<Form.Control
							as="textarea"
							rows="3"
							value={inputs.description}
							onChange={e => setInputs({ ...inputs, description: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					{inputs.nombreBoton}
				</Button>
			</Form>

			<Container id="contenedor">
				{categories.map(category => (
					<Row>
						<Col>{category.name}</Col>
						<Col>
							<Link to={`/admin/formCategory/edit/${category.id}`}>Editar</Link>
						</Col>
						<Col>
							<Form onSubmit={e => eliminar(e, category.id)}>
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
