import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import {getStrains, getStrain, getCategories, cleanStrain} from "../store/actions/index";
import {connect} from "react-redux";
function FormStrain({
	strain,
	strains,
	getStrains,
	getStrain,
	getCategories,
	categories,
	id,
	cleanStrain
}) {
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
		categoryId: "",
		edit : false,
		nombreBoton: "Agregar",
	});

	// Cuando monta el componente, trae todos los strains.
	useEffect(() => {
		if(!id) return;
		getStrain(id)
		setHandle("edit");
	}, [id]);
	useEffect(() => {
		async function fetchData(){
			await getCategories();
			await getStrains();
		}
		fetchData();
		return ()=>{
			cleanStrain()
		}
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		let values = inputs
		let nombreBoton = handle==="edit"?"Actualizar":"Agregar";
		if(strain) values = strain;
		setInputs({ ...values, nombreBoton });
	}, [handle, strain]);
	useEffect(()=>{
		if (deleted.confirmed && deleted.deleteId)
			axios
				.delete(`http://localhost:3000/strain/${deleted.deleteId}`)
				.then(() => {
					getStrains();
				})
				.catch(err => {
					console.log(err);
					setWarninig({
						show: true,
						msg: "No se puede eliminar"
					});
				});
	},[deleted.confirmed, deleted.deleteId])
	function handleSubmit(e) {
		e.preventDefault();
		for(let prop in inputs){
			if(!inputs[prop]){
				setWarninig({show:true,msg: `${prop} is require`});
				document.querySelector(`#${prop}`).focus();
				return;
			}
		}
		if (!!id) {
			axios
				.put(`http://localhost:3000/strain/${id}`, inputs)
				.then(() => {
					getStrains();
				})
				.catch(err => console.log("error", err));
			return;
		}

		const url = "http://localhost:3000/strain";
		axios
			.post(url, inputs)
			.then(res => getStrains())
			.catch(e => console.log(e));
		setInputs({
			nombreBoton : "Agregar"
		});
	}

	function eliminar(e, id) {
		e.preventDefault();
		setDelete({
			msg: "Esta cepa sera eliminada, ¿Está seguro?",
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
			<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e)}>
				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Cepa
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
						Categorías
					</Form.Label>
					<Col sm="10">
						<Form.Control
							as="select"
							id="categoryId"
							onChange={e => setInputs({ ...inputs, categoryId: parseInt(e.target.value) })}
						>
							<option>seleccione categoría</option>
							{categories.map(category => (
								<option value={category.id} selected={(()=>{
									if(inputs.categoryId === category.id) return "selected"
								})()}>{category.name}</option>
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
export default connect(({strains, strain, categories}) => ({strains, strain, categories}),
{getStrains, getStrain, getCategories, cleanStrain})(FormStrain);
