import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
export default function FormStrain({
	strains,
	getStrains,
	getCategories,
	categories,
	filtrarStrain,
	id,
	edit,
}) {
	const [category, setCategory] = useState([]);
	const [inputs, setInputs] = useState({
		name: "",
		categoryId: "",
		nombreBoton: "Agregar",
	});

	// Cuando monta el componente, trae todos los strains.
	useEffect(() => {
		getCategories();
		getStrains(null);
	}, []);

	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		if (edit) setInputs({ ...filtrarStrain(id), nombreBoton: "Actualizar" });
	}, [id]);

	function handleSubmit(e) {
		e.preventDefault();

		if (edit) {
			axios
				.put(`http://localhost:3000/strain/${id}`, inputs)
				.then(() => {
					window.location.href = "/admin/formStrain";
				})
				.catch(err => console.log("error", err));
			return;
		}

		const url = "http://localhost:3000/strain";
		axios
			.post(url, inputs)
			.then(res => alert("Cepa cargada"))
			.catch(e => console.log(e));
		setInputs({
			name: "",
			categoryId: "",
		});
	}

	function eliminar(e, id) {
		e.preventDefault();
		if (window.confirm("Esta cepa será eliminada. ¿Confirma?"))
			axios
				.delete(`http://localhost:3000/strain/${id}`)
				.then(() => {
					alert("Cepa actualizada");
				})
				.catch(err => console.log(err));
	}

	return (
		<div>
			<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e)}>
				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Cepa
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
						Categorías
					</Form.Label>
					<Col sm="10">
						<Form.Control
							as="select"
							onChange={e => setInputs({ ...inputs, categoryId: parseInt(e.target.value) })}
						>
							<option>seleccione categoría</option>
							{categories.map(category => (
								<option value={category.id}>{category.name}</option>
							))}
						</Form.Control>
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					{inputs.nombreBoton}
				</Button>
			</Form>
			<Container id="contenedor">
				{strains.map(strain => (
					<Row>
						<Col>{strain.name}</Col>
						<Col>{strain.categoryId}</Col>
						<Col>
							<Link to={`/admin/formStrain/edit/${strain.id}`}>Editar</Link>
						</Col>
						<Col>
							<Form onSubmit={e => eliminar(e, strain.id)}>
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
