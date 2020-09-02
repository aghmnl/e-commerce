import React from "react";
import { Nav, Button } from "react-bootstrap";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { isAuth, isAdmin } from "../store/actions/index";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
export default function Admin() {
	const dispatch = useDispatch();
	const history = useHistory();
	return (
		<Nav id="navegacion">
			<Nav.Item style={{ marginLeft: "auto", paddingRight: "1rem", paddingTop: "0.2rem" }}>
				<Button
					variant="primary"
					onClick={() => {
						axios
							.get(`http://localhost:3001/auth/logout`, { withCredentials: true })
							.then(() => {
								history.replace("/");
								dispatch(isAuth());
								dispatch(isAdmin());
							})
							.catch(err => console.log("error", err));
						return;
					}}
				>
					<RiLogoutBoxRLine style={{ transform: "scale(1.4)", marginBottom: "0.3rem" }}></RiLogoutBoxRLine>
				</Button>
			</Nav.Item>
		</Nav>
	);
}
