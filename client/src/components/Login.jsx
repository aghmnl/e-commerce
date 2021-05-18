import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import axios from 'axios'
import '../styles/Login.css'
import { useDispatch, useSelector, connect } from 'react-redux'
import { useFormik } from 'formik'
import {
	isAuth,
	isAdmin,
	emptyCart,
	setCart,
	getCartItems,
	setIsAdmin,
	setUserInfo,
} from '../store/actions/index'
import { Form, Card, Button, Col } from 'react-bootstrap'
import { FaGoogle, FaSignInAlt } from 'react-icons/fa'
import { ImGithub } from 'react-icons/im'
function Login() {
	const dispatch = useDispatch()
	const { logged, purchased_products } = useSelector((state) => state)
	useEffect(() => {
		document.body.id = 'bg_user'
	}, [])
	const history = useHistory()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validate: (values) => {
			const errors = {}
			!values.email && (errors.email = 'Se requiere un Email')
			!values.password && (errors.password = 'Se requiere una contraseña')
			return errors
		},
		onSubmit: (values) => Login(values),
	})
	async function Login(values) {
		const url = 'http://localhost:3001/auth/login'
		const res = await axios
			.post(url, values, {
				withCredentials: true,
			})
			.catch((err) => {
				console.log(err)
				formik.setFieldError(
					err.response.data.input,
					err.response.data.message
				)
			})
		const is_admin = res.data.user.admin
		await dispatch(isAuth())
		dispatch(setIsAdmin(is_admin))
		const {
			data: { cartId },
		} = await axios.get('http://localhost:3001/purchase_protected/cart_id', {
			withCredentials: true,
		})
		dispatch(setCart(cartId))
		if (purchased_products.length > 0)
			await axios
				.post(
					'http://localhost:3001/purchased_products_protected/add_product',
					{
						cartId: cartId,
						cart_items: purchased_products,
					},
					{
						withCredentials: true,
					}
				)
				.catch((err) => console.log(err))
		await dispatch(getCartItems(cartId))
		axios
			.get('http://localhost:3001/user/me', { withCredentials: true })
			.then((user) => {
				dispatch(setUserInfo(user))
				history.replace('/')
			})
			.catch((err) => console.log(err.response))
	}

	if (logged) {
		return <Redirect to="/settings" />
	}

	return (
		<div>
			<Card
				style={{ width: '30rem', margin: '5rem auto', textAlign: 'left' }}
			>
				<Card.Body>
					<Form onSubmit={formik.handleSubmit}>
						<Form.Group as={Col}>
							<Form.Label>Email</Form.Label>
							<Form.Control
								value={formik.values.email}
								onChange={(e) =>
									formik.setFieldValue('email', e.target.value)
								}
								onBlur={() => formik.setFieldTouched('email', true)}
								isInvalid={
									formik.touched.email && !!formik.errors.email
								}
								id="emailLogin"
							/>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.email &&
									formik.touched.email &&
									formik.errors.email}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Contraseña</Form.Label>
							<Form.Control
								value={formik.values.password}
								type="password"
								id="passwordLogin"
								onChange={(e) =>
									formik.setFieldValue('password', e.target.value)
								}
								onBlur={() => formik.setFieldTouched('password', true)}
								isInvalid={
									formik.touched.password && !!formik.errors.password
								}
							/>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.password &&
									formik.touched.password &&
									formik.errors.password}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group
							as={Col}
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							<Button
								type="submit"
								className="btn-icon"
								variant="success"
								id="iniciarSesion"
							>
								<FaSignInAlt />
								Iniciar Sesión
							</Button>
						</Form.Group>
						<Form.Group
							as={Col}
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							<Button
								variant="primary"
								className="btn-icon"
								onClick={() =>
									(window.location =
										'http://localhost:3001/auth/google/login')
								}
							>
								<FaGoogle />
								Iniciar Sesión con Google
							</Button>
						</Form.Group>
						<Form.Group
							as={Col}
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							<Button
								variant="dark"
								className="btn-icon"
								onClick={() =>
									(window.location =
										'http://localhost:3001/auth/github/login')
								}
							>
								<ImGithub />
								<span>Iniciar Sesión con GitHub</span>
							</Button>
						</Form.Group>
						<Form.Group
							as={Col}
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							<Link to="/register">Registarse</Link>
							<Link to="/reset">Olvidé mi contraseña</Link>
						</Form.Group>
					</Form>
				</Card.Body>
			</Card>
		</div>
	)
}

export default connect(({ logged, admin }) => {
	return {
		logged,
		admin,
	}
})(Login)
