import React, { useState, useEffect } from "react";
import { Form, Col, Button, Row, Container, Modal } from "react-bootstrap";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { getUsers, getUser, cleanUser } from "../store/actions/index";
import { connect } from "react-redux";
import { FaUserCog } from "react-icons/fa";
import UDTable from "./UDTable";
function FormUser({ users, user, getUsers, getUser, isAdmin}) {
	const history = useHistory();
	const [modal, throwModal] = useState({
		show: false
	});
	// Cuando monta el componente, trae todos los usuarios.
	useEffect(() => {
		getUsers();
		return () => {
			cleanUser();
		};
	}, []);
	// Si recibe id, se fija si edit es true, y cambia el nombre del botón
	function promote(id){
		axios.put("http://localhost:3001/auth/promote/"+id,null,{withCredentials:true})
			.then(res => alert(JSON.stringify(res)))
			.catch(err => console.log(err));
	}
	if(!isAdmin) return <Redirect to="login"/>
	return (
		<div id="main" style={{marginTop: "8rem"}}>
			<Modal show={modal.show} centered>
            <Modal.Header>
                {!!user && user.admin?"Quitar privilegios":"Hacer Admin"}
            </Modal.Header>
				<Modal.Body>{!!user && `El usuario ${user.email} ${user.admin?"ya no tendrá":"tendrá"} pivilegios de admin`}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() =>{throwModal({...modal, show:false})}}>Cancelar</Button>
                <Button variant={!!user && user.admin?"danger":"success"} onClick={() => promote(user.id)}>
					{!!user && user.admin?"Reasignar":"Asignar"}
				</Button>
            </Modal.Footer>
        </Modal>
			<UDTable
				headers={["#","Nombre","Apellido","Email","Telefono","Admin"]}
				rows={users}
				attributes={["id","first_name","last_name","email","phone","admin"]}
				update={
					(id) =>{
						getUser(id);
						throwModal({
							show:true,
						})
					}
				}
				updateIcon={<FaUserCog/>}
				updatePk="id"
			/>
		</div>
	);
}
export default connect(({ user, users, isAdmin }) => ({ user, users, isAdmin }), { getUser, getUsers, cleanUser })(FormUser);
