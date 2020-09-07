import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import Rating from "react-rating";
import { connect } from "react-redux";
import { FaStar, FaRegStar } from "react-icons/fa";
import { getProduct } from "../store/actions/index";
import { Form, Card, Col, Button, Container, Row, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
function FormReview({ id, productDetail, getProduct }) {
	useEffect(() => {
		getProduct(id);
	}, []);
	const history = useHistory();
	const [edit, setEdit] = useState(false);
	const [inputs, setInputs] = useState({
		stars: 0,
		description: "",
	});
	const formik = useFormik({
		initialValues: inputs,
		initialErrors: {
			stars: "Por Favor Asigne una valoración",
		},
		validateOnMount: true,
		validates: values => {
			const errors = {};
			!values.stars && (errors.stars = "Por Favor Asigne una valoración");
			return errors;
		},
		onSubmit: values => {
			if (!values.stars) return alert(formik.initialErrors.stars);
			if (edit) {
				axios
					.put(
						"http://localhost:3001/review/" + id,
						{
							...values,
							productId: id,
							date: Date.now(),
						},
						{ withCredentials: true }
					)
					.then(() => history.replace("/product/" + id))
					.catch(err => console.log(err));
				return;
			}
			axios
				.post(
					"http://localhost:3001/review",
					{
						...values,
						productId: id,
						date: Date.now(),
					},
					{ withCredentials: true }
				)
				.then(() => history.replace("/product/" + id))
				.catch(err => console.log(err));
		},
	});
	function goBack() {
		window.history.back();
	}
	useEffect(() => {
		axios
			.get("http://localhost:3001/review/" + id, { withCredentials: true })
			.then(({ data }) => {
				if (data !== null) {
					setEdit(true);
					setInputs({
						stars: data.stars,
						description: data.description,
					});
				}
			})
			.catch(err => console.log(err));
	}, []);
	useEffect(() => {
		formik.resetForm(inputs);
	}, [inputs]);
	return (
		<div>
			<Card style={{ margin: "5rem auto", width: "55rem" }}>
				<Container>
					<Row>
						<Col style={{ alignSelf: "center" }}>
							<Card.Img src={productDetail.img} />
						</Col>
						<Col>
							<Card.Body>
								<Card.Title>
									<h1>{productDetail.name}</h1>
								</Card.Title>
							</Card.Body>
							<Form onSubmit={formik.handleSubmit}>
								<Form.Group as={Col}>
									<Form.Label>Valoración</Form.Label>
									<h2>
										<Rating
											initialRating={formik.values.stars}
											emptySymbol={<FaRegStar />}
											fullSymbol={<FaStar />}
											onChange={value => formik.setFieldValue("stars", value)}
										/>
									</h2>
									<Form.Control.Feedback type="invalid">
										{!!formik.errors.stars && formik.errors.stars}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>Comentario</Form.Label>
									<Form.Control
										as="textarea"
										value={formik.values.description}
										onChange={e => formik.setFieldValue("description", e.target.value)}
									/>
								</Form.Group>
								<Button style={{ marginBottom: "2rem" }} onClick={() => goBack()}>
									Volver
								</Button>
								<Button style={{ marginBottom: "2rem" }} variant="success" type="submit">
									Enviar Review
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</Card>
		</div>
	);
}

export default connect(
	function ({ productDetail }) {
		return {
			productDetail,
		};
	},
	{ getProduct }
)(FormReview);
