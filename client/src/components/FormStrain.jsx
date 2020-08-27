import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { getStrains, getStrain, getCategories, cleanStrain } from "../store/actions/index";
import { connect } from "react-redux";
import UDTable from "./UDTable";
import ModalDelete from "./ModalDelete";
function FormStrain({ strain, strains, getStrains, getStrain, getCategories, categories, id, cleanStrain }) {
	const history = useHistory();
	const [modalDelete, throwModal] = useState({
		show: false,
		dialog: "",
	});
	const formik = useFormik({
		initialValues: { name: "", categoryId: null },
		validate: values => {
			const errors = {};
			!values.name && (errors.name = "se requiere nombre");
			!values.categoryId && (errors.categoryId = "se requiere una categoria");
			return errors;
		},
		onSubmit: values => handleSubmit(values),
	});
	const [handle, setHandle] = useState("add");
	// Cuando monta el componente, trae todos los strains.
	useEffect(() => {
		if (!id) return;
		getStrain(id);
		setHandle("edit");
	}, [id]);
	useEffect(() => {
		getCategories();
		getStrains();
		return () => {
			cleanStrain();
		};
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		handle === "edit" && strain && formik.setValues(strain, true);
	}, [handle, strain]);
	function handleSubmit(values) {
		if (!!id) {
			axios
				.put(`http://localhost:3001/strain/${id}`, values)
				.then(() => {
					getStrains();
					history.replace("/admin/formStrain");
				})
				.catch(err => console.log("error", err));
			return;
		}

		const url = "http://localhost:3001/strain";
		axios
			.post(url, values)
			.then(res => getStrains())
			.catch(e => console.log(e));
	}

	function eliminar(id) {
		axios
			.delete(`http://localhost:3001/strain/${id}`)
			.then(() => {
				getStrains();
			})
			.catch(err => {
				console.log(err);
			});
		throwModal({ ...modalDelete, show: false });
	}

	return (
		<div id="main">
			<ModalDelete
				show={modalDelete.show}
				dialog={modalDelete.dialog}
				header={modalDelete.header}
				pk={modalDelete.pk}
				cancel={() => throwModal({ ...modalDelete, show: false })}
				commit={eliminar}
			/>
			<Form
				style={{ width: "25rem", marginTop: "8rem", textAlign: "right", marginBottom: "2rem" }}
				onSubmit={formik.handleSubmit}
			>
				<Form.Group as={Row}>
					<Form.Label column sm="3">
						Cepa
					</Form.Label>
					<Col>
						<Form.Control
							value={formik.values.name}
							id="name"
							placeholder="Cepa"
							onChange={e => formik.setFieldValue("name", e.target.value)}
							isInvalid={!!formik.errors.name}
						/>
						<Form.Control.Feedback type="invalid" tooltip>
							{formik.errors.name && formik.errors.name}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Form.Group as={Row}>
					<Form.Label column sm="3">
						Categoría
					</Form.Label>
					<Col>
						<Form.Control
							as="select"
							id="categoryId"
							onChange={e => formik.setFieldValue("categoryId", e.target.value)}
							isInvalid={!!formik.errors.categoryId}
						>
							<option>seleccione categoría</option>
							{categories.map(category => (
								<option
									value={category.id}
									selected={(() => {
										if (formik.values.categoryId === category.id) return "selected";
									})()}
								>
									{category.name}
								</option>
							))}
						</Form.Control>
						<Form.Control.Feedback type="invalid" tooltip>
							{formik.errors.categoryId && formik.errors.categoryId}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					{handle === "edit" ? "Actualizar" : "Agregar"}
				</Button>
				{handle === "edit" && (
					<Button variant="secondary" onClick={() => history.replace("/admin/formStrain")}>
						Cancelar
					</Button>
				)}
			</Form>
			<UDTable
				headers={["#", "Nombre", "Categoria"]}
				rows={strains}
				attributes={["id", "name"]}
				joins={["category"]}
				joinAttr={["name"]}
				updateURL="/admin/formStrain/edit"
				updatePk="id"
				deletePk="id"
				handleDelete={id => {
					throwModal({
						show: true,
						dialog: "La bodega con Pk " + id + " será eliminada.\n¿Desea continuar?",
						header: "Eliminar Bodega",
						pk: id,
					});
				}}
			/>
		</div>
	);
}
export default connect(({ strains, strain, categories }) => ({ strains, strain, categories }), {
	getStrains,
	getStrain,
	getCategories,
	cleanStrain,
})(FormStrain);
