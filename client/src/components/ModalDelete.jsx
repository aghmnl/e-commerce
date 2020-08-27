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