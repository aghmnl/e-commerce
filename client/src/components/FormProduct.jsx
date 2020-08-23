import React, { useState, useEffect } from "react";
import "../styles/FormProduct.css";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProduct, getStrainsBy, getProducts, getCategories, getCellars, cleanProduct } from "../store/actions/index";
import axios from "axios";
function FormProduct({
	productDetail,
	products,
	categories,
	cellars,
	strains_by,
	id,
	getProducts,
	getProduct,
	getStrainsBy,
	getCategories,
	getCellars,
	cleanProduct,
}) {
	const [handle, setHandle] = useState("add");
	const [deleted, setDelete] = useState({
		show : false,
		confirmed : false,
		msg: "",
		deleteId : ""
	});
	const [warning, setWarninig] = useState({
		show : false,
		msg : ""
	});
	const [inputs, setInputs] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		img: "",
		categoryId: "",
		cellarId: "",
		strainId: "",
		active: true,
		nombreBoton: "Agregar",
	});
	// var nombreBoton = "Agregar";

	// Esto se ejecuta cuando se selecciona una categoría
	function handleStrains(catid) {
		setInputs({ ...inputs, categoryId: catid });
		getStrainsBy(catid);
	}
	useEffect(() => {
		if (!!inputs.categoryId) getStrainsBy(inputs.categoryId);
	}, [inputs]);
	useEffect(() => {
		async function fetchData() {
			await getProducts();
			await getCategories();
			await getCellars();
		}
		fetchData();
		return () => {
			cleanProduct();
		};
	}, []);
	useEffect(() => {
		if (!id) return;
		getProduct(id).then(() => {
			setHandle("edit");
		});
	}, [id]);

	useEffect(() => {
		let nombreBoton = "";
		let values = inputs;
		if (handle === "edit") nombreBoton = "Actualizar";
		else {
			nombreBoton = "Agregar";
		}
		if(Object.values(productDetail).length) values = productDetail;
		setInputs({ ...values, nombreBoton });
	}, [handle, productDetail]);
	useEffect(()=>{
		if (deleted.confirmed && deleted.deleteId)
			axios
				.delete(`http://localhost:3000/product/${deleted.deleteId}`)
				.then(() => {
					getProducts();
				})
				.catch(err => console.log(err));
	},[deleted.confirmed, deleted.deleteId])
	function handleSubmit(e, id) {
		e.preventDefault();
		// Acá manda mensaje del dato que falta y hace foco en el mismo (sitúa el cursor en ese campo)
		for (let prop in inputs) {
			if (!inputs[prop] && prop !== "active") {
				document.querySelector(`#${prop}`).focus();
				setWarninig({show:true,msg: `${prop} is require`});
				return;
			}
		}
		if (!!id) {
			axios
				.put(`http://localhost:3000/product/${id}`, inputs)
				.then(() => {
					getProducts();
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3000/product";
		axios
			.post(url, inputs)
			.then(() => {
				getProducts();
			})
			.catch(err => console.log("error", err));
	}
	function eliminar(e, id) {
		e.preventDefault();
		setDelete({
			...deleted, 
			msg:"Este producto sera eliminado. ¿Está seguro?", 
			show:true,
			deleteId : id
		})
			
	}
	return (
		<div id="main">
			<Alert className="alert" variant="warning" show={warning.show} 
				onClose={()=>setWarninig({...warning, show: false})} 
				dismissible
			>
				<Alert.Heading>
					Dato requerido!
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
			<Form style={{ width: "60rem", margin: "1rem" }} id="formulario" onSubmit={e => handleSubmit(e, id)}>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Nombre de producto:{" "}
					</Form.Label>
					<Col sm="8">
						<Form.Control
							value={inputs.name}
							id="name"
							placeholder="Nombre"
							onChange={e => setInputs({ ...inputs, name: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Precio de producto:{" "}
					</Form.Label>

					<Col sm="8">
						<Form.Control
							type="number"
							value={inputs.price}
							id="price"
							step="0.01"
							placeholder="Precio"
							onChange={e => setInputs({ ...inputs, price: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Descripción del producto:
					</Form.Label>
					<Col sm="8">
						<Form.Control
							as="textarea"
							value={inputs.description}
							id="descripcion"
							placeholder="Descripción"
							onChange={e => setInputs({ ...inputs, description: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Imagen:
					</Form.Label>
					<Col sm="8">
						<Form.Control
							placeholder="Link a Imagen"
							value={inputs.img}
							id="img"
							onChange={e => setInputs({ ...inputs, img: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Stock del producto:{" "}
					</Form.Label>
					<Col sm="8">
						<Form.Control
							placeholder="Cantidad"
							id="stock"
							value={inputs.stock}
							onChange={e => setInputs({ ...inputs, stock: e.target.value })}
						/>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Categorías
					</Form.Label>
					<Col sm="8">
						<Form.Control
							as="select"
							id="categoryId"
							onChange={e => setInputs({ ...inputs, categoryId: parseInt(e.target.value) })}
						>
							<option>seleccione categoria</option>
							{categories.map(category => (
								<option value={category.id} selected={category.id === inputs.categoryId ? "selected" : ""}>
									{category.name}
								</option>
							))}
						</Form.Control>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Bodega
					</Form.Label>
					<Col sm="8">
						<Form.Control
							as="select"
							id="cellarId"
							onChange={e => setInputs({ ...inputs, cellarId: parseInt(e.target.value) })}
						>
							<option>seleccione bodega</option>
							{cellars.map(cellar => (
								<option value={cellar.id} selected={cellar.id === inputs.cellarId ? "selected" : ""}>
									{cellar.name}
								</option>
							))}
						</Form.Control>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Cepa
					</Form.Label>
					<Col sm="8">
						<Form.Control
							as="select"
							id="strainId"
							onChange={e => setInputs({ ...inputs, strainId: parseInt(e.target.value) })}
						>
							<option>seleccione cepa</option>
							{(() => {
								if (!strains_by) return <option>seleccione categoria</option>;
								return strains_by.map(strain => (
									<option value={strain.id} selected={strain.id === inputs.strainId ? "selected" : ""}>
										{strain.name}
									</option>
								));
							})()}
						</Form.Control>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Estado de producto de tienda
					</Form.Label>
					<Col sm="8">
						<Form.Check
							type="checkbox"
							checked={inputs.active}
							onChange={e => setInputs({ ...inputs, active: !inputs.active })}
						/>
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					{inputs.nombreBoton}
				</Button>
			</Form>
			<Container id="contenedor">
				{products.map(product => (
					<Row>
						<Col>{product.name}</Col>
						<Col>
							<Link to={`/admin/formProduct/edit/${product.id}`}>Editar</Link>
						</Col>
						<Col>
							<Form onSubmit={e => eliminar(e, product.id)}>
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
	({ productDetail, products, categories, cellars, strains, strains_by }) => {
		return {
			productDetail,
			products,
			categories,
			cellars,
			strains,
			strains_by,
		};
	},
	{ getProduct, getStrainsBy, getProducts, getCategories, getCellars, cleanProduct }
)(FormProduct);
