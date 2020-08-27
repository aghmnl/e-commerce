import React, { useState, useEffect, useRef } from "react";
import "../styles/FormProduct.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { ImBin2, ImPencil } from "react-icons/im";
import { connect } from "react-redux";
import UDTable from "./UDTable";
import ModalDelete from "./ModalDelete";
import { getProduct, getStrainsBy, getProducts, getCategories, getCellars, cleanProduct } from "../store/actions/index";
import axios from "axios";
import { useFormik } from "formik";
function FormProduct({
	productDetail,
	products,
	categories,
	cellars,
	strains_by,
	id,
	getProducts,
	getProduct,
	getStrainsBy,
	getCategories,
	getCellars,
	cleanProduct,
}) {
	const history = useHistory();
	const [handle, setHandle] = useState("add");
	const [modalDelete, throwModal] = useState({
		show:false,
		dialog:"",
	})
	const initialInputs = {
		name: "",
		description: "",
		price: "",
		stock: "",
		img: "",
		categoryId: "",
		cellarId: "",
		strainId: "",
		active: true,
	}
	const formik = useFormik({
		initialValues : initialInputs,
		validate : values =>{
			const errors={};
			for(let value in values){
				if(value !== "active" && !values[value]) errors[value] = "se requiere este campo";
			}
			return errors;
		},
		onSubmit : values => handleSubmit(values),
	})

	// Este useEffect se ejecuta cuando se selecciona una categoría
	useEffect(() => {
		formik.values.categoryId &&
			getStrainsBy(formik.values.categoryId);
		
	}, [formik.values]);
	useEffect(() => {
		getProducts();
		getCategories();
		getCellars();
		return () => {
			cleanProduct();
		};
	}, []);
	useEffect(() => {
		if (!id) return;
		getProduct(id).then(() => {
			setHandle("edit");
		});
	}, [id]);

	useEffect(() => {
		let values = initialInputs;
		if (Object.values(productDetail).length) values = productDetail;
		formik.setValues(values, false);
	}, [handle, productDetail]);
	function handleSubmit(values) {
		// Acá manda mensaje del dato que falta y hace foco en el mismo (sitúa el cursor en ese campo)
		if (!!id) {
			axios
				.put(`http://localhost:3001/product/${id}`, values)
				.then(() => {
					getProducts();
					formik.resetForm(initialInputs);
				})
				.catch(err => console.log("error", err));
			return;
		}
		const url = "http://localhost:3001/product";
		axios
			.post(url, values)
			.then(() => {
				getProducts();
				formik.resetForm(initialInputs);
			})
			.catch(err => console.log("error", err));
	}
	function eliminar(id) {
		axios
			.delete(`http://localhost:3001/product/${id}`)
			.then(() => {
				getProducts();
				throwModal({...modalDelete, show:false});
			})
			.catch(err => console.log(err));
	}
	return (
		<div style={{ marginTop: "6rem" }}>
			<ModalDelete 
				show={modalDelete.show} 
				dialog={modalDelete.dialog}
				header={modalDelete.header}
				pk={modalDelete.pk}
				cancel={()=>throwModal({...modalDelete, show:false})}
				commit={eliminar}
			/>
			<Container id="form1" style={{ width: "60rem", marginBottom: "2rem" }}>
				<Form onSubmit={formik.handleSubmit}>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label> Nombre de producto: </Form.Label>
							<Form.Control
								value={formik.values.name}
								placeholder="Nombre"
								onChange={e => formik.setFieldValue("name", e.target.value)}
								isInvalid={!!formik.errors.name}
							/>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.name && formik.errors.name}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Precio de producto</Form.Label>
							<Form.Control
								type="number"
								value={formik.values.price}
								id="price"
								step="0.01"
								placeholder="Precio"
								onChange={e => formik.setFieldValue("price", e.target.value)}
								isInvalid={!!formik.errors.price}
							/>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.price && formik.errors.price}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Descripción del producto</Form.Label>
							<Form.Control
								as="textarea"
								value={formik.values.description}
								placeholder="Descripción"
								onChange={e => formik.setFieldValue("description", e.target.value)}
								isInvalid={!!formik.errors.description}
							/>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.description && formik.errors.description}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Imagen</Form.Label>
							<Form.File custom>
								<Form.File.Input
									onChange={e => {
										const input = e.target;
										const reader = new FileReader();
										reader.onloadend = () => {
											formik.setFieldValue("img", reader.result );
										};
										reader.readAsDataURL(input.files[0]);
									}}
									isInvalid={!!formik.errors.img} 
									accept="image/png, image/jpeg, image/gif"
								/>
								<Form.File.Label>
									Seleccione Imagen
								</Form.File.Label>
								<Form.Control.Feedback type="invalid" tooltip>
									{formik.errors.img && formik.errors.img}
								</Form.Control.Feedback>
							</Form.File>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Stock del producto</Form.Label>
							<Form.Control
								placeholder="Cantidad"
								value={formik.values.stock}
								onChange={e => formik.setFieldValue("stock", e.target.value)}
								isInvalid={!!formik.errors.stock}
							/>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.stock && formik.errors.stock}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Categorías</Form.Label>
							<Form.Control
								as="select"
								onChange={e => formik.setFieldValue("categoryId", parseInt(e.target.value))}
								isInvalid={!!formik.errors.categoryId}
								custom
							>
								<option>seleccione categoría</option>
								{categories.map(category => (
									<option value={category.id} selected={category.id === formik.values.categoryId ? "selected" : ""}>
										{category.name}
									</option>
								))}
							</Form.Control>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.categoryId && formik.errors.categoryId}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Bodega</Form.Label>
							<Form.Control
								as="select"
								onChange={e => formik.setFieldValue("cellarId", parseInt(e.target.value))}
								isInvalid={!!formik.errors.cellarId}
								custom
							>
								<option>seleccione bodega</option>
								{cellars.map(cellar => (
									<option value={cellar.id} selected={cellar.id === formik.values.cellarId ? "selected" : ""}>
										{cellar.name}
									</option>
								))}
							</Form.Control>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.cellarId && formik.errors.cellarId}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group as={Col}>
							<Form.Label>Cepa</Form.Label>
							<Form.Control
								as="select"
								onChange={e => formik.setFieldValue("strainId", parseInt(e.target.value))}
								isInvalid={!!formik.errors.strainId}
								custom
							>
								<option>seleccione cepa</option>
								{(() => {
									if (!strains_by) return <option>seleccione categoria</option>;
									return strains_by.map(strain => (
										<option value={strain.id} selected={strain.id === formik.values.strainId ? "selected" : ""}>
											{strain.name}
										</option>
									));
								})()}
							</Form.Control>
							<Form.Control.Feedback type="invalid" tooltip>
								{formik.errors.strainId && formik.errors.strainId}
							</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>
					<Form.Group>
					<Form.Check
						checked={formik.values.active}
						label="Disponible en tienda"
						onChange={() =>formik.setFieldValue("active", !formik.values.active)}
					/>
					</Form.Group>
					<Button variant="primary" type="submit">
						{handle === "add"?"Agregar":"Actualizar"}
					</Button>
					{handle === "edit" && (
						<Button variant="primary" onClick={() =>history.replace("/admin/formProduct")}>
							Cancelar
						</Button>
					)}
				</Form>
			</Container>
			<UDTable headers={[
				"#",
				"Nombre",
				"Precio",
				"Stock",
				"Bodega",
				"Categoria",
				"Cepa"
				]}
				rows={products}
				attributes={["id","name","price","stock"]}
				joins={["cellar","category","strain"]}
				joinAttr={["name"]}
				deletePk="id"
				handleDelete={(id)=>throwModal({
					show: true,
					dialog: "El producto con Pk "+id+" será eliminado.\n¿Desea continuar?",
					header: "Eliminar Producto",
					pk: id
				})}
				updatePk="id"
				updateURL="/admin/formProduct/edit"
			/>
		</div>
	);
}
export default connect(
	({ productDetail, products, categories, cellars, strains, strains_by }) => {
		return {
			productDetail,
			products,
			categories,
			cellars,
			strains,
			strains_by,
		};
	},
	{ getProduct, getStrainsBy, getProducts, getCategories, getCellars, cleanProduct }
)(FormProduct);
