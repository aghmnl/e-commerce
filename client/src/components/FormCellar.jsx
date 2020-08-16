import React, { useState } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import axios from "axios";
export default function FormCellar() {
	const [inputs, setInputs] = useState({
		name: "",
	});
	function handleSubmit(e) {
		e.preventDefault();
		//fetch a la api :
		const url = "http://localhost:3000/cellar";
		axios
			.post(url, inputs)
			.then(res => alert("Bodega cargada"))
			.catch(e => console.log(e));
		setInputs({
			name: "",
		});
	}
	return (
		<Form style={{ width: "30rem", margin: "5rem" }} onSubmit={e => handleSubmit(e)}>
			<Form.Group as={Row}>
				<Form.Label column sm="2">
					Bodega
				</Form.Label>
				<Col sm="10">
					<Form.Control value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} />
				</Col>
			</Form.Group>
			<Button variant="primary" type="submit">
				Agregar
			</Button>
		</Form>
	);
}
