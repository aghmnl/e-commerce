import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Nav } from "react-bootstrap";
import "../styles/FormCategory.css";
import axios from "axios";
import { Link } from "react-router-dom";
import {connect} from "react-redux";
import {getCategories, getCategory} from "../store/actions/index";
function FormCategory({ categories, category, getCategory, getCategories, id }) {
	const [inputs, setInputs] = useState({
		name: "",
		description: "",
		nombreBoton: "Agregar",
	});
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		if(!id) return;
		getCategory(id)
	}, [id]);
	useEffect(() => {
		async function fetchData(){
			await getCategories();
		}
		fetchData();
	}, []);
	useEffect(()=>{
		setInputs({...category, nombreBoton:"Actualizar"})
	},[category])
	function handleSubmit(e, id) {
		e.preventDefault();
		if(!inputs.name){
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
		axios
			.post(url, inputs)
			.then(() => getCategories())
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
					getCategories();
				})
				.catch(err => console.log(err));
	}
	return (
		<div>
			<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e, id)}>
				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Categoría
					</Form.Label>
					<Col sm="10">
						<Form.Control
							value={inputs.name}
							id="name"
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
export default connect(({category, categories})=>{
	return{
		categories,
		category 
	}
},{getCategories, getCategory})(FormCategory)
