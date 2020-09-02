import React, { useState, useEffect, useRef } from "react";
import { Form, Col, Button, Row, Container, Alert, Modal } from "react-bootstrap";
import "../styles/FormCategory.css";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCategories, getCategory, cleanCategory } from "../store/actions/index";
import { useFormik } from "formik";
import UDTable from "./UDTable";
import ModalDelete,{ ErrorModal } from "./ModalDelete";
function FormCategory({ categories, category, getCategory, getCategories, id, cleanCategory, admin }) {
	const history = useHistory();
	const [errModal, throwErrModal] = useState({ show:false });
	const [modalDelete, throwModal] = useState({
		show: false,
	});
	const [handle, setHandle] = useState("add");
	const formik = useFormik({
		initialValues: {
			name: "",
			description: "",
			strainName: "",
		},
		validate: values => {
			const errors = {};
			!values.name && (errors.name = "se requiere nombre");
			!values.description && (errors.description = "se requiere descripción");
			handle === "add" && !values.strainName && (errors.strainName = "se requiere una cepa");
			return errors;
		},
		onSubmit: values => handleSubmit(values),
	});
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		if (!id) return;
		getCategory(id);
		setHandle("edit");
	}, [id]);
	useEffect(() => {
		getCategories();
		document.body.id="bg_form";
		return () => {
			cleanCategory();
		};
	}, []);
	useEffect(() => {
		handle === "edit" && category && formik.setValues(category, false);
	}, [handle, category]);
	function handleSubmit(values) {
		if (!!id) {
			axios
				.put(`http://localhost:3001/category_private/${id}`, values, {withCredentials:true})
				.then(() => {
					getCategories();
					history.replace("/admin/formCategory");
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3001/category_private";
		const urlStrain = "http://localhost:3001/strain_private";
		axios
			.post(url, values, {withCredentials:true})
			.then(res => {
				axios.post(urlStrain, {
					name: values.strainName,
					categoryId: res.data,
				});
				getCategories();
				throwModal({ ...modalDelete, show: false });
			})
			.catch(e => console.log(e));
	}
	function eliminar(id) {
		axios
			.delete(`http://localhost:3001/category_private/${id}`,{withCredentials:true})
			.then(() => {
				getCategories();
				throwModal({ ...modalDelete, show: false });
			})
			.catch(err => {
				throwModal({ ...modalDelete, show: false });
				throwErrModal({ ...errModal, show: true, msg: err.response.data });
			});
	}
	if(!admin) return (<Redirect to="/login"/>)
	return (
		<div id="main" style={{ marginTop: "8rem" }}>
			<ModalDelete
				show={modalDelete.show}
				dialog={modalDelete.dialog}
				header={modalDelete.header}
				pk={modalDelete.pk}
				cancel={() => throwModal({ ...modalDelete, show: false })}
				commit={eliminar}
			/>
			<ErrorModal
				show={errModal.show}
				msg={errModal.msg}
				close={() => throwErrModal({ ...errModal, show:false })}
			/>
			<Form style={{ marginBottom: "2rem", textAlign: "right" }} onSubmit={formik.handleSubmit}>
				<Form.Group as={Row}>
					<Form.Label column sm="3">
						Categoría
					</Form.Label>
					<Col>
						<Form.Control
							value={formik.values.name}
							placeholder="Categoría"
							onChange={e => formik.setFieldValue("name", e.target.value)}
							isInvalid={!!formik.errors.name}
						/>
						<Form.Control.Feedback type="invalid" tooltip>
							{formik.errors.name && formik.errors.name}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					{handle !== "edit" && (
						<Form.Label column sm="3">
							Nueva cepa
						</Form.Label>
					)}
					{handle !== "edit" && (
						<Col>
							<Form.Control
								value={formik.values.strainName}
								placeholder="Cepa"
								onChange={e => {
									formik.setFieldValue("strainName", e.target.value);
								}}
								isInvalid={!!formik.errors.strainName}
							/>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.strainName && formik.errors.strainName}
							</Form.Control.Feedback>
						</Col>
					)}
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="3">
						Descripción
					</Form.Label>
					<Col>
						<Form.Control
							as="textarea"
							placeholder="Descripción"
							rows="3"
							isInvalid={!!formik.errors.description}
							onChange={e => formik.setFieldValue("description", e.target.value)}
							value={formik.values.description}
						/>
						<Form.Control.Feedback type="invalid" tooltip>
							{formik.errors.description && formik.errors.description}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					{handle === "edit" ? "Actualizar" : "Agregar"}
				</Button>
				{handle === "edit" && (
					<Button variant="secondary" onClick={() => history.replace("/admin/formCategory")}>
						Cancelar
					</Button>
				)}
			</Form>
			<UDTable
				headers={["#", "Nombre"]}
				rows={categories}
				attributes={["id", "name"]}
				updatePk="id"
				update="/admin/formCategory/edit"
				deletePk="id"
				handleDelete={id => {
					throwModal({
						show: true,
						dialog: "La categoria con Pk " + id + " será eliminada.\n¿Desea continuar?",
						header: "Eliminar Categoria",
						pk: id,
					});
				}}
			/>
		</div>
	);
}
export default connect(
	({ category, categories, admin }) => {
		return {
			categories,
			category,
			admin
		};
	},
	{ getCategories, getCategory, cleanCategory }
)(FormCategory);
