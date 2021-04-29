import React, { useState } from "react";
import { Form, Card, Button, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom"
export default function Reset() {
	const [email, setEmail] = useState();
	const [error, setError] = useState(false)
	const [msgError, setMsgError] = useState("Debe ingresar su email");
	const [success, setSuccess] = useState(false);
	const [msg, setMsg] = useState("");
	function validate({ target: { value } }) {
		setEmail(value);
		setError(!email);
	}
	function handleSubmit(e){
		e.preventDefault();
		validate(e);
		console.log("this is the email: " + email)
		if (!email) return;
		axios.post("http://localhost:3001/auth/recovery", { email } )
			.then(({data}) => {
				setSuccess(true);
				setMsg(data)
			})
			.catch((err)=>{
				setError(true);
				setMsgError(err.response.data.message);
			});
	}
	return (
		<Card bg="warning" style={{ width: "18rem", margin: "auto", marginTop: "100px" }}>
			<Card.Body>
				<Card.Title>Reseteo de contraseña</Card.Title>
				<Form onSubmit={handleSubmit}>
					<Form.Group style={{ textAlign: "justify" }} as={Col}>
						<Form.Label>Email</Form.Label>
						<Form.Control type="email"
							 placeholder="Ingrese el email" 
							 onChange={validate} 
							 onBlur={validate} 
							 isInvalid={error}
							 isValid={success}
							 value={email}
						/>
						<Form.Control.Feedback type="invalid" tooltip>{msgError}</Form.Control.Feedback>
						<Form.Control.Feedback type="valid">{msg && (<div>{msg}&nbsp;<Link to="/login">inicio de sesión</Link></div>)}</Form.Control.Feedback>
					</Form.Group>
					<Form.Text className="text-muted">
							En el caso de coincidir con un email registrado, se le enviarán instrucciones para resetear su contraseña.
					</Form.Text>
					<Button variant="primary" type="submit">Recuperar</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
