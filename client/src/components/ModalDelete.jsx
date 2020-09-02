import React from "react";
import {Modal, Button} from "react-bootstrap";
export default function ModalDelete({show, dialog, header, cancel, commit, pk}){
    return(<div>
        <Modal show={show} centered>
            <Modal.Header>
                {header}
            </Modal.Header>
            <Modal.Body>{dialog}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={cancel}>Cancelar</Button>
                <Button variant="danger" onClick={() => commit(pk)}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    </div>);
}
export function ErrorModal({msg, show, close}){
    return(<div>
        <Modal show={show} centered onHide={close}>
            <Modal.Header closeButton>
                <b>Ha ocurrido un error</b>
            </Modal.Header>
            <Modal.Body>{msg}</Modal.Body>
        </Modal>
    </div>)
}