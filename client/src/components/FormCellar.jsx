import React, { useState, useEffect, useRef } from "react";
import { Form, Col, Button, Row } from "react-bootstrap";
import axios from "axios";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { getCellars, getCellar, cleanCellar } from "../store/actions/index";
import { connect } from "react-redux";
import UDTable from "./UDTable";
import ModalDelete from "./ModalDelete";
function FormCellar({ cellars, cellar, getCellars, getCellar, id, edit, cleanCellar }) {
	const history = useHistory();
	const [modalDelete, throwModal] = useState({
		show: false,
		dialog: "",
	});
	const [handle, setHandle] = useState("add");
	const formik = useFormik({
		initialValues: { name: "" },
		validate: values => {
			const errors = {};
			!values.name && (errors.name = "se requiere nombre");
			return errors;
		},
		onSubmit: values => handleSubmit(values),
	});
	useEffect(() => {
		if (!id) return;
		getCellar(id);
		setHandle("edit");
	}, [id]);
	// Cuando monta el componente, trae todos los celars.
	useEffect(() => {
		getCellars();
		return () => {
			cleanCellar();
		};
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	useEffect(() => {
		handle === "edit" && cellar && formik.setValues(cellar, false);
	}, [handle, cellar]);
	function handleSubmit(values) {
		if (id) {
			axios
				.put(`http://localhost:3000/cellar/${id}`, values)
				.then(() => {
					getCellars();
					history.replace("/admin/formCellar");
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3000/cellar";
		axios
			.post(url, values)
			.then(res => {
				getCellars();
				formik.resetForm({ name: "" });
			})
			.catch(e => console.log(e));
	}
	function eliminar(id) {
		axios
			.delete(`http://localhost:3000/cellar/${id}`)
			.then(() => {
				getCellars();
				throwModal({ ...modalDelete, show: false });
			})
			.catch(err => {
				console.log(err);
			});
	}

	return (
		<div id="main" style={{ textAlign: "right" }}>
			<ModalDelete
				show={modalDelete.show}
				dialog={modalDelete.dialog}
				header={modalDelete.header}
				pk={modalDelete.pk}
				cancel={() => throwModal({ ...modalDelete, show: false })}
				commit={eliminar}
			/>
			<Form style={{ width: "25rem", marginTop: "8rem", marginBottom: "2rem" }} onSubmit={formik.handleSubmit}>
				<Form.Group as={Row}>
					<Form.Label column sm="2">
						Bodega
					</Form.Label>
					<Col sm="10">
						<Form.Control
							value={formik.values.name}
							placeholder="Bodega"
							onChange={e => formik.setFieldValue("name", e.target.value)}
							isInvalid={!!formik.errors.name}
						/>
						<Form.Control.Feedback type="invalid" tooltip>
							{formik.errors.name && formik.errors.name}
						</Form.Control.Feedback>
					</Col>
				</Form.Group>
				<Button variant="primary" type="submit">
					{handle === "edit" ? "Actualizar" : "Agregar"}
				</Button>
				{handle === "edit" && (
					<Button variant="secondary" onClick={() => history.replace("/admin/formCellar")}>
						Cancelar
					</Button>
				)}
			</Form>
			<UDTable
				headers={["#", "Nombre"]}
				rows={cellars}
				attributes={["id", "name"]}
				updateURL="/admin/formCellar/edit"
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
export default connect(({ cellar, cellars }) => ({ cellar, cellars }), { getCellar, getCellars, cleanCellar })(
	FormCellar
);
