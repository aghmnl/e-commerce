import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { matchPath } from "react-router-dom";
import "../styles/FormProduct.css";
export default function FormProduct(props = null) {
	const [data, setData] = useState({
		cellar :[],
		strain: [],
		category : []
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
	//var nombreBoton = "Agregar";

	// Esto se ejecuta cuando se selecciona una categoría
	useEffect(() =>{
		//setData(/*cepas*/);
	},[inputs.categoryId]);
	useEffect(() => {

		if (Object.values(props).length > 0) {
			setInputs({
				name: props.name,
				description: props.description,
				price: props.price,
				stock: props.stock,
				img: props.img,
				categoryId: parseInt(props.categoryId),
				cellarId: parseInt(props.cellarId),
				strainId: parseInt(props.strainId),
				active: props.active,
				nombreBoton: "Actualizar",
			});
		}
	}, []);
	function handleSubmit(e) {
		e.preventDefault();
		//fetch a la api :
		const url = "http://localhost:3000/products";
		fetch(url,{method:"POST",body:inputs, headers: {"content-type" : "application/json"}})
		.then(r => r.json())
		.then(res => console.log("success",res))
		.catch(err => console.log("error",err));
	}
	return (
		<Form style={{width:'50rem', margin:'auto' }} id="formulario" onSubmit={e => handleSubmit(e)}>
			<Form.Group>
				<Form.Label>Nombre de producto: </Form.Label>
				<Form.Control value={props.name} placeholder="Nombre" onChange={e => setInputs({ ...inputs, name: e.target.value })} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Precio de producto: </Form.Label>
				<Form.Control type="number" step="0.01" placeholder="Precio" onChange={e => setInputs({ ...inputs, price: e.target.value })} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Descripción del producto:</Form.Label>
				<Form.Control as="textarea" placeholder="Descripción" onChange={e => setInputs({ ...inputs, description: e.target.value })}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Imagen</Form.Label>
				<Form.Control placeholder="Link a Imagen" onChange={e => setInputs({ ...inputs, img: e.target.value })} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Stock del producto: </Form.Label>
				<Form.Control placeholder="Cantidad" onChange={e => setInputs({ ...inputs, stock: e.target.value })} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Categorías</Form.Label>
				<Form.Control as="select" onChange={e => setInputs({ ...inputs, category: e.target.value })}>
						{data.category.map(category => (
							<option value={category}></option>
						))}
				</Form.Control>
			</Form.Group>
			<Form.Group>
				<Form.Label>Bodega</Form.Label>
				<Form.Control as="select" onChange={e => setInputs({ ...inputs, cellar: e.target.value })}>
					{data.cellar.map(cellar => (
						<option value={cellar}></option>
					))}
				</Form.Control>
			</Form.Group>
			<Form.Group>
				<Form.Label>Cepa</Form.Label>
				<Form.Control as="select" onChange={e => setInputs({ ...inputs, strain: e.target.value })}>
					{data.strain.map(strain => (
						<option value={strain}></option>
					))}
				</Form.Control>
			</Form.Group>
			<Form.Group>
				<Form.Label>Estado de producto de tienda</Form.Label>
				<Form.Check type="checkbox" value="active_checkbox" onChange={e => setInputs({ ...inputs, active: e.target.value })} />
			</Form.Group>
			<Button variant="primary" type="submit">{inputs.nombreBoton}</Button>
		</Form>
	);
}
