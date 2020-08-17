import React, { useState, useEffect } from "react";
import "../styles/FormProduct.css";
import { Nav, Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
export default function FormProduct({ 
	products, 
	getProductos, 
	getCategories, 
	getCellars, 
	getStrains,
	categories,
	cellars,
	strains, 
	filtrarProduct, 
	id, 
	edit
 }) {
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
	useEffect(() => {
		getStrains(inputs.categoryId);
	}, [inputs.categoryId]);
	useEffect(() => {
		getCategories();
		getCellars();
		getProductos(null);
	}, []);
	useEffect(() => {
		if (edit) setInputs({ ...filtrarProduct(id), nombreBoton: "Actualizar" });
	}, [id]);
	function handleSubmit(e, edit, id) {
		e.preventDefault();
		//fetch a la api :
		for (let prop in inputs) {
			if (!inputs[prop] && prop !== "active") {
				document.querySelector(`#${prop}`).focus();
				alert(`${prop} is require`);
				return;
			}
		}
		if (edit) {
			axios
				.put(`http://localhost:3000/products/${id}`, inputs)
				.then(() => {
					window.location.href = "/admin/formProduct";
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3000/products";
		axios
			.post(url, inputs)
			.then(() => {
				window.location.href = "/admin/formProduct";
			})
			.catch(err => console.log("error", err));
	}
	function eliminar(e, id) {
		e.preventDefault();
		if (window.confirm("Este producto será eliminado. ¿Está seguro?"))
			axios
				.delete(`http://localhost:3000/products/${id}`)
				.then(() => {
					window.location.href = "/admin/formProduct";
				})
				.catch(err => console.log(err));
	}
	return (
		<div>
			<Form style={{ width: "60rem", margin: "1rem" }} id="formulario" onSubmit={e => handleSubmit(e, edit, id)}>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Nombre de producto:{" "}
					</Form.Label>
					<Col sm="8">
						<Form.Control value={inputs.name} id="name" placeholder="Nombre" onChange={e => setInputs({ ...inputs, name: e.target.value })} />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Precio de producto:{" "}
					</Form.Label>

					<Col sm="8">
						<Form.Control type="number" value={inputs.price} id="price" step="0.01" placeholder="Precio" onChange={e => setInputs({ ...inputs, price: e.target.value })} />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Descripción del producto:
					</Form.Label>
					<Col sm="8">
						<Form.Control as="textarea" value={inputs.description} id="descripcion" placeholder="Descripción" onChange={e => setInputs({ ...inputs, description: e.target.value })} />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Imagen:
					</Form.Label>
					<Col sm="8">
						<Form.Control placeholder="Link a Imagen" value={inputs.img} id="img" onChange={e => setInputs({ ...inputs, img: e.target.value })} />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Stock del producto:{" "}
					</Form.Label>
					<Col sm="8">
						<Form.Control placeholder="Cantidad" id="stock" value={inputs.stock} onChange={e => setInputs({ ...inputs, stock: e.target.value })} />
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Categorías
					</Form.Label>
					<Col sm="8">
						<Form.Control as="select" id="categoryId" onChange={e => setInputs({ ...inputs, categoryId: parseInt(e.target.value) })}>
							<option>seleccione categoria</option>
							{categories.map(category => (
								<option value={category.id}>
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
						<Form.Control as="select" id="cellarId" onChange={e => setInputs({ ...inputs, cellarId: parseInt(e.target.value) })}>
						<option>seleccione bodega</option>
							{cellars.map(cellar => (
								<option value={cellar.id}>{cellar.name}</option>
							))}
						</Form.Control>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="4">
						Cepa
					</Form.Label>
					<Col sm="8">
						<Form.Control as="select" id="strainId" onChange={e => setInputs({ ...inputs, strainId: parseInt(e.target.value) })}>
						<option>seleccione cepa</option>
							{(() => {
								if (!strains.length) return <option>seleccione categoria</option>;
								return strains.map(strain => (
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
						<Form.Check type="checkbox" checked={inputs.active} onChange={e => setInputs({ ...inputs, active: e.target.value })} />
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
							<Nav.Link href={`/admin/formProduct/edit/${product.id}`}>Editar</Nav.Link>
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
