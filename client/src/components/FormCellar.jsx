import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Nav } from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {getCellars, getCellar} from "../store/actions/index";
import {connect} from "react-redux";
function FormCellar({
	cellars,
	cellar,
	getCellars,
	getCellar,
	id,
	edit,
	cleanState
}) {
	const [inputs, setInputs] = useState({
		name: "",
		nombreBoton : "Agregar"
	});

	// Cuando monta el componente, trae todos los celars.
	useEffect(() => {
		if(!id) return;
		getCellar(id)
	}, [id]);
	useEffect(() => {
		async function fetchData(){
			await getCellars();
		}
		fetchData();
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		setInputs({ ...cellar, nombreBoton: "Actualizar"});
	}, [cellar]);
	function handleSubmit(e) {
		e.preventDefault();
		if(!inputs.name){
			alert("name is required !");
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
			name: "",
		});
	}
	function eliminar(e, id) {
		e.preventDefault();
		if (window.confirm("Este producto será eliminado. ¿Está seguro?"))
			axios
				.delete(`http://localhost:3000/cellar/${id}`)
				.then(() => {
					getCellars();
				})
				.catch(err => console.log(err));
	}

	return (
		<div>
		<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e)}>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Bodega
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs.name} id="name" onChange={e => setInputs({ ...inputs, name: e.target.value })} />
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
export default connect(({cellar, cellars}) => ({cellar, cellars}),
{getCellar, getCellars})(FormCellar);
