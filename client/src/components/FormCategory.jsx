import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container } from "react-bootstrap";
import "../styles/FormCategory.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategories, getCategory } from "../store/actions/index";
function FormCategory({ categories, category, getCategory, getCategories, id }) {
	const [handle, setHandle] = useState("add");
	const [inputs, setInputs] = useState({
		name: "",
		description: "",
		strainName: "",
		satrinCategoryId: 0,
		edit: false,
		nombreBoton: "Agregar",
	});
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		if (!id) return;
		getCategory(id);
		setHandle("edit");
	}, [id]);
	useEffect(() => {
		async function fetchData() {
			await getCategories();
		}
		fetchData();
	}, []);
	useEffect(() => {
		let nombreBoton = handle === "edit" ? "Actualizar" : "Agregar";
		setInputs({ ...category, nombreBoton });
	}, [handle, category]);
	function handleSubmit(e, id) {
		e.preventDefault();
		if (!inputs.name) {
			alert("name is required !");
			document.querySelector("#name").focus();
			return;
		}
		if (!!id) {
			axios
				.put(`http://localhost:3000/category/${id}`, inputs)
				.then(() => {
					getCategories();
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3000/category";
		const urlStrain = "http://localhost:3000/strain";
		const newCategoryId = categories[categories.length - 1].id + 1;

		const inputStrain = {
			name: inputs.strainName,
			categoryId: newCategoryId,
		};
		axios
			.post(url, inputs)
			.then(() => {
				axios.post(urlStrain, inputStrain);
				getCategories();
			})
			.catch(e => console.log(e));
		setInputs({
			name: "",
			description: "",
			strainName: "",
			strainCategoryId: 0,
			nombreBoton: "Agregar",
		});
	}
	function eliminar(e, id) {
		e.preventDefault();
		if (window.confirm("Esta categoría será eliminada. ¿Confirma?"))
			axios
				.delete(`http://localhost:3000/category/${id}`)
				.then(() => {
					getCategories();
				})
				.catch(err => console.log(err));
	}
	return (
		<div>
			<Form style={{ width: "40rem", margin: "5rem" }} onSubmit={e => handleSubmit(e, id)}>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Categoría
					</Form.Label>
					<Col sm="8">
						<Form.Control
							value={inputs.name}
							id="name"
							onChange={e => setInputs({ ...inputs, name: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					{handle !== "edit" && (
						<Form.Label column sm="4">
							Nueva cepa
						</Form.Label>
					)}
					{handle !== "edit" && (
						<Col sm="8">
							<Form.Control
								value={inputs.strainName}
								id="strain"
								onChange={e => {
									setInputs({ ...inputs, strainName: e.target.value });
								}}
							/>
						</Col>
					)}
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Descripción
					</Form.Label>
					<Col sm="8">
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
export default connect(
	({ category, categories }) => {
		return {
			categories,
			category,
		};
	},
	{ getCategories, getCategory }
)(FormCategory);
