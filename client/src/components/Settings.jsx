import React, { useEffect } from "react";
import { Nav, Button, Card, Form, Col, ListGroup } from "react-bootstrap";
import { RiLogoutBoxRLine, RiAdminLine } from "react-icons/ri";
import { isAuth, isAdmin, emptyCart, setIsAdmin } from "../store/actions/index";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useFormik } from "formik";
export default function Settings() {
	const { logged, admin } = useSelector(state => state);
	const dispatch = useDispatch();
	const history = useHistory();
	const changePass = useFormik({
		initialValues: {
			password: "",
			new_password: "",
			re_password: "",
		},
		validate: values => {
			const errors = {};
			!values.password && (errors.password = "Se requiere su contraseña");
			!values.new_password && (errors.new_password = "Se requiere ingrese su nueva contraseña");
			!values.re_password && (errors.re_password = "Se requiere que repita su nueva contraseña");
			values.new_password !== values.re_password && (errors.re_password = "Las contraseñas no coinciden");
			return errors;
		},
		onSubmit: values => ChangePassword(values),
	});
	const changeEmail = useFormik({
		initialValues: {
			email: "",
		},
		validate: values => {
			const errors = {};
			!values.email && (errors.email = "Se requiere su nuevo email");
			return errors;
		},
		onSubmit: values => ChangeEmail(values),
	});
	useEffect(() => {
		document.body.id = "bg_user";
	}, []);
	function ChangeEmail(values) {
		axios
			.put("http://localhost:3001/user/change_email", values, { withCredentials: true })
			.then(() => alert("OK"))
			.catch(err => console.log(err));
	}
	function ChangePassword(values) {
		axios
			.put("http://localhost:3001/user/change_password", values, { withCredentials: true })
			.then(async () => {
				await dispatch(isAuth());
				history.replace("/login");
			})
			.catch(err => {
				console.log(err.response);
				changePass.setFieldError(err.response.data.input, err.response.data.message);
			});
	}
	if (!logged) return <Redirect to="/login" />;
	return (
		<div>
			<Card style={{ margin: "3rem auto", textAlign: "left", width: "30rem" }}>
				<Card.Body>
					<ListGroup>
						<ListGroup.Item>
							<Form onSubmit={changeEmail.handleSubmit} style={{ width: "25rem" }}>
								<Form.Group as={Col}>
									<Form.Label>Nuevo Email</Form.Label>
									<Form.Control
										value={changeEmail.values.email}
										onChange={e => changeEmail.setFieldValue("email", e.target.value)}
										onBlur={() => changeEmail.setFieldTouched("email", true)}
										isInvalid={changeEmail.touched.email && !!changeEmail.errors.email}
									/>
									<Form.Control.Feedback type="invalid" tooltip>
										{changeEmail.errors.email && changeEmail.touched.email && changeEmail.errors.email}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col}>
									<Button type="submit" variant="success">
										Cambiar Email
									</Button>
								</Form.Group>
							</Form>
						</ListGroup.Item>
						<ListGroup.Item>
							<Form onSubmit={changePass.handleSubmit} style={{ width: "25rem" }}>
								<Form.Group as={Col}>
									<Form.Label>Contraseña</Form.Label>
									<Form.Control
										value={changePass.values.password}
										type="password"
										onChange={e => changePass.setFieldValue("password", e.target.value)}
										onBlur={() => changePass.setFieldTouched("password", true)}
										isInvalid={changePass.touched.password && !!changePass.errors.password}
									/>
									<Form.Control.Feedback type="invalid" tooltip>
										{changePass.errors.password && changePass.touched.password && changePass.errors.password}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>Nueva Contraseña</Form.Label>
									<Form.Control
										value={changePass.values.new_password}
										type="password"
										onChange={e => changePass.setFieldValue("new_password", e.target.value)}
										onBlur={() => changePass.setFieldTouched("new_password", true)}
										isInvalid={changePass.touched.new_password && !!changePass.errors.new_password}
									/>
									<Form.Control.Feedback type="invalid" tooltip>
										{changePass.errors.new_password &&
											changePass.touched.new_password &&
											changePass.errors.new_password}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col}>
									<Form.Label>Repita Contraseña</Form.Label>
									<Form.Control
										value={changePass.values.re_password}
										type="password"
										onChange={e => changePass.setFieldValue("re_password", e.target.value)}
										onBlur={() => changePass.setFieldTouched("re_password", true)}
										isInvalid={changePass.touched.re_password && !!changePass.errors.re_password}
									/>
									<Form.Control.Feedback type="invalid" tooltip>
										{changePass.errors.re_password && changePass.touched.re_password && changePass.errors.re_password}
									</Form.Control.Feedback>
								</Form.Group>
								<Form.Group as={Col}>
									<Button type="submit" variant="success">
										Cambiar Contraseña
									</Button>
								</Form.Group>
							</Form>
						</ListGroup.Item>
						<ListGroup.Item>
							<div style={{ display: "flex" }}>
								{/* {admin && (
									<Button variant="primary" onClick={() => history.replace("/admin")}>
										Admin <RiAdminLine style={{ transform: "scale(1.4)", marginBottom: "0.3rem" }} />
									</Button>
								)} */}
								<Button
									style={{ marginLeft: "auto" }}
									variant="primary"
									onClick={() => {
										axios
											.get(`http://localhost:3001/auth/logout`, { withCredentials: true })
											.then(() => {
												history.replace("/");
												dispatch(emptyCart());
												dispatch(isAuth());
												dispatch(isAdmin());
												dispatch(setIsAdmin(false));
											})
											.catch(err => console.log("error", err));
										return;
									}}
								>
									Cerrar Sessión <RiLogoutBoxRLine style={{ transform: "scale(1.4)", marginBottom: "0.3rem" }} />
								</Button>
							</div>
						</ListGroup.Item>
					</ListGroup>
				</Card.Body>
			</Card>
		</div>
	);
}
