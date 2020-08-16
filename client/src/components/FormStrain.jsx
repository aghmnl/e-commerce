import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
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
		<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e)}>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Cepa
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} />
				</Col>
			</Form.Group>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Categorías
				</Form.Label>
				<Col sm="10">
					<Form.Control as="select" onChange={e => setInputs({ ...inputs, categoryId: parseInt(e.target.value) })}>
						{category.map(category => (
							<option value={category.id}>{category.name}</option>
						))}
					</Form.Control>
				</Col>
			</Form.Group>
			<Button variant="primary" type="submit">
				Agregar
			</Button>
		</Form>
	);
}
