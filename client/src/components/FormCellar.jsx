import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
		<Form style={{ width: "50rem", margin: "auto" }} onSubmit={e => handleSubmit(e)}>
			<Form.Group>
				<Form.Label>Bodega</Form.Label>
				<Form.Control value={inputs.name} onChange={e => setInputs({ ...inputs, name: e.target.value })} />
			</Form.Group>
			<Button variant="primary" type="submit">
				Agregar
			</Button>
		</Form>
	);
}
