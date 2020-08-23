import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Alert } from "react-bootstrap";
import "../styles/FormCategory.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCategories, getCategory, cleanCategory } from "../store/actions/index";
function FormCategory({ categories, category, getCategory, getCategories, id, cleanCategory }) {
	const [deleted, setDelete] = useState({
		show : false,
		confirmed : false,
		msg: "",
		deleteId : null
	});
	const [warning, setWarninig] = useState({
		show : false,
		msg : ""
	});
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
		return() =>{
			cleanCategory()
		}
	}, []);
	useEffect(() => {
		let values = inputs
		let nombreBoton = handle==="edit" ? "Actualizar" : "Agregar";
		if(!!category) values = category;
		setInputs({ ...values, nombreBoton });
	}, [handle, category]);
	useEffect(()=>{
		if (deleted.confirmed && deleted.deleteId)
			axios
				.delete(`http://localhost:3000/category/${deleted.deleteId}`)
				.then(() => {
					getCategories();
				})
				.catch(err => {
					console.log(err);
					setWarninig({
						show: true,
						msg: "No se puede eliminar"
					});
				});
	},[deleted.confirmed, deleted.deleteId])
	function handleSubmit(e, id) {
		e.preventDefault();
		if (!inputs.name) {
			setWarninig({show:true,msg: `name is require`});
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
		setDelete({
			msg: "Esta categoria sera eliminada, ¿Está seguro?",
			show: true,
			deleteId : id
		});
	}
	return (
		<div id="main">
			<Alert className="alert" variant="warning" show={warning.show} 
				onClose={()=>setWarninig({...warning, show: false})} 
				dismissible
			>
				<Alert.Heading>
					Advertencia!
				</Alert.Heading>
				<p>
					{warning.msg}
				</p>
			</Alert>
			<Alert className="alert" variant="danger" show={deleted.show} 
				onClose={()=>setDelete({...deleted, show:false})} 
				dismissible
			>
				<Alert.Heading>
					Eliminar
				</Alert.Heading>
				<p>
					{deleted.msg}
				</p>
				<div className="d-flex justify-content-end">
          			<Button onClick={() => setDelete({
						  ...deleted,
						  show:false,
						  confirmed :true
					  })} variant="danger">
           				 Eliminar
         			</Button>
        		</div>
			</Alert>
			<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e, id)}>
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
	{ getCategories, getCategory, cleanCategory }
)(FormCategory);
