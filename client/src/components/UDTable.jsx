import React from "react";
import {Table, Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import { ImBin2, ImPencil } from "react-icons/im";
export default function UDTable({
    headers, rows, attributes, joins, joinAttr, updateURL, updatePk, handleDelete, deletePk
}){
    const history = useHistory();
    return(
        <div>
            <Table variant="light">
                <tr>
                    {headers.map(header => (<th>{header}</th>))}
                    <th>Editar</th>
                    {handleDelete && deletePk &&(<th>Eliminar</th>)}
                </tr>
                {rows.map(row => (
                    <tr>
                        {attributes.map(attr => (<td>{JSON.stringify(row[attr])}</td>))}
                        {joins && joins.map(join => joinAttr.map(attr => (<td>{row[join][attr]}</td>)))}
                        <td>
                            <Button variant="success" onClick={()=>
                                history.replace(`${updateURL}/${row[updatePk]}`)}
                            >
                                <ImPencil/>
                            </Button>
                        </td>
                        {handleDelete && deletePk && (
                            <td>
                                <Button variant="danger" onClick={()=>handleDelete(row[deletePk])}>
                                    <ImBin2/>
                                </Button>
                            </td>
                        )}
                    </tr>
                ))}
            </Table>
        </div>
    );
}