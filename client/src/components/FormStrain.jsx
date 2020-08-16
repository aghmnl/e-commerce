import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
export default function FormStrain() {
	const [category, setCategory] = useState([]);
	useEffect(() => {
		fetch("http://localhost:3000/category")
			.then(r => r.json())
			.then(category => {
				setInputs({ ...inputs, categoryId: category[0].id });
				setCategory(category);
			});
	}, []);
	const [inputs, setInputs] = useState({
		name: "",
		categoryId: "",
	});
	function handleSubmit(e) {
		e.preventDefault();
		//fetch a la api :
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
	return (
		<Form style={{ width: "50rem", margin: "auto" }} onSubmit={e => handleSubmit(e)}>
			<Form.Group>
				<Form.Label>Cepa</Form.Label>
				<Form.Control value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Categorías</Form.Label>
				<Form.Control as="select" onChange={e => setInputs({ ...inputs, categoryId: parseInt(e.target.value) })}>
					{category.map(category => (
						<option value={category.id}>{category.name}</option>
					))}
				</Form.Control>
			</Form.Group>
			<Button variant="primary" type="submit">
				Agregar
			</Button>
		</Form>
	);
}
