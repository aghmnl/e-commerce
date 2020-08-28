import React from "react";
import { Form, Card, Button } from "react-bootstrap";

export default function Reset() {
	return (
		<Card bg="warning" style={{ width: "18rem", margin: "auto", marginTop: "100px" }}>
			<Card.Body>
				<Card.Title>Reseteo de contraseña</Card.Title>
				<Form>
					<Form.Group style={{ textAlign: "justify" }}>
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Ingrese el email" />
						<Form.Text className="text-muted">
							En el caso de coincidir con un email registrado, se le enviarán instrucciones para resetear su contraseña.
						</Form.Text>
					</Form.Group>
				</Form>
				<Button variant="primary" type="submit">
					Enviar
				</Button>
			</Card.Body>
		</Card>
	);
}
