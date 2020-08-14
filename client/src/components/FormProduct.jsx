import React, { useState, useEffect } from "react";
import { matchPath } from "react-router-dom";
import "../styles/FormProduct.css";
export default function FormProduct(props = null) {
	const [dates, setDates] = useState({
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
	useEffect(() => {
		if (Object.values(props).length > 0) {
			setInputs({
				name: props.name,
				description: props.description,
				price: props.price,
				stock: props.stock,
				img: props.img,
				categoryId: props.categoryId,
				cellarId: props.cellarId,
				strainId: props.strainId,
				active: props.active,
				nombreBoton: "Actualizar",
			});
		}
	}, []);
	function handleSubmit(e) {
		e.preventDefault();
		//fetch a la api :
	}
	return (
		<form id="formulario" onSubmit={e => handleSubmit(e)}>
			<label for="inputName">Nombre de producto: </label>
			<input id="inputName" value={props.name} type="text" key="name" placeholder="Nombre" onChange={e => setInputs({ ...inputs, name: e.target.value })} />
			<label for="inputPrice">Precio de producto: </label>
			<input id="inputPrice" type="number" step="0.01" key="price" placeholder="Precio" onChange={e => setInputs({ ...inputs, price: e.target.value })} />
			<label for="inputDescription">Descripción del producto: </label>
			<textarea id="inputDescription" key="description" placeholder="Descripción" onChange={e => setInputs({ ...inputs, description: e.target.value })}></textarea>
			<label for="archivo">Imagen</label>
			<input id="archivo" accept="image/x-png,image/gif,image/jpeg" type="file" key="img" onChange={e => setInputs({ ...inputs, img: e.target.value })} />
			<label for="number">Stock del producto: </label>
			<input type="number" key="stock" placeholder="Cantidad" onChange={e => setInputs({ ...inputs, stock: e.target.value })} />
			<label for="category">Categorías: </label>
			<select id="category" onChange={e => setInputs({ ...inputs, category: e.target.value })}>
				{dates.category.map(category => (
					<option value={category}></option>
				))}
			</select>
			<label for="cellar">Bodega: </label>
			<select id="cellar">
				{dates.cellar.map(cellar => (
					<option value={cellar}></option>
				))}
			</select>
			<label for="strain">Bodega: </label>
			<select id="strain">
				{dates.strain.map(strain => (
					<option value={strain}></option>
				))}
			</select>
			<label>Estado de producto de tienda</label>
			<input id="checkbox" type="checkbox" key="active" value="active_checkbox" onChange={e => setInputs({ ...inputs, active: e.target.value })} />
			<p></p>
			<button>{inputs.nombreBoton}</button>
		</form>
	);
}
