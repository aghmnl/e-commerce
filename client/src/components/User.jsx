import React, {useEffect} from "react";
import { Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuth, isAdmin, getMyPurchases } from "../store/actions/index";
import axios from "axios";

export default function User() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { logged, myPurchases } = useSelector(state => state);
	useEffect(()=>{
        dispatch(getMyPurchases());
    },[]);
	if (!logged) return <Redirect to="/login" />;
	return (
		<Nav id="navegacion">
			<Nav.Item>
				<Nav.Link>
					<NavLink to="/user/purchases">Compras</NavLink>
				</Nav.Link>
			</Nav.Item>
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
