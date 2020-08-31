import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Modal } from "react-bootstrap";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { getUsers, getUser, cleanUser } from "../store/actions/index";
import { connect } from "react-redux";
import { FaUserCog } from "react-icons/fa";
import UDTable from "./UDTable";
import ModalDelete from "./ModalDelete";
function FormUser({ users, user, getUsers, getUser, admin }) {
	const history = useHistory();
	const [modalDelete, throwModalDelete] = useState({
		show: false,
		dialog: "",
	});
	const [modal, throwModal] = useState({
		show: false,
	});
	// Cuando monta el componente, trae todos los usuarios.
	useEffect(() => {
		getUsers();
		return () => {
			cleanUser();
		};
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	function promote(id) {
		axios
			.put("http://localhost:3001/auth/promote/" + id, null, { withCredentials: true })
			.then(res => {
				getUsers();
				throwModal({...modal,show:false})
			})
			.catch(err => console.log(err));
	}
	function eliminar(id) {
		axios
			.delete(`http://localhost:3001/user_private/${id}`, { withCredentials: true })
			.then(() => {
				getUsers();
				throwModalDelete({ ...modalDelete, show: false });
			})
			.catch(err => {
				console.log(err);
			});
	}

	if (!admin) return <Redirect to="login" />;
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
			<Modal show={modal.show} centered>
				<Modal.Header>{!!user && user.admin ? "Quitar privilegios" : "Hacer Admin"}</Modal.Header>
				<Modal.Body>
					{!!user && `El usuario ${user.email} ${user.admin ? "ya no tendrá" : "tendrá"} pivilegios de admin`}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							throwModal({ ...modal, show: false });
						}}
					>
						Cancelar
					</Button>
					<Button variant={!!user && user.admin ? "danger" : "success"} onClick={() => promote(user.id)}>
						{!!user && user.admin ? "Reasignar" : "Asignar"}
					</Button>
				</Modal.Footer>
			</Modal>
			<UDTable
				headers={["#", "Nombre", "Apellido", "Email", "Teléfono", "Admin"]}
				rows={users}
				attributes={["id", "first_name", "last_name", "email", "phone", "admin"]}
				update={id => {
					getUser(id);
					throwModal({
						show: true,
					});
				}}
				deletePk="id"
				handleDelete={id => {
					throwModalDelete({
						show: true,
						dialog: "El usuario " + id + " será eliminado.\n¿Desea continuar?",
						header: "Eliminar usuario",
						pk: id,
					});
				}}
				updateIcon={<FaUserCog />}
				updatePk="id"
			/>
		</div>
	);
}
export default connect(({ user, users, admin }) => ({ user, users, admin }), { getUser, getUsers, cleanUser })(
	FormUser
);
