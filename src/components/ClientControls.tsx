import React from 'react';
import { Form, Button, Container, Row, ButtonGroup } from 'react-bootstrap';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEyeSlash } from 'react-icons/fa';
import { TiCancel } from "react-icons/ti";
import { useMapState } from './ClientMapContext';
import { eMailActionTypes } from './Interface';
import { ClientMailMapState } from './ClientMailMapState';
import { getMailList } from './ClientFolderFilters';
import axios from 'axios';
import { baseUrl, HttpStatus as HTTP_STATUS, ErrorTypes, OutlookFolderFilters } from './exports';

const styles = {
    rowStyles: {
        padding: '10px',
        paddingLeft: '21px'
    },
    buttonGroupStyle: {
        paddingLeft: '10px'
    }

}
const ClientControls: React.FC = () => {
    const {
        mapState: { selectedFolder, idsToDelete },
        setMapState } = useMapState();

    const useSelectedFolderIds = (folderKey: keyof ClientMailMapState) => {
        const { mapState } = useMapState();
        return mapState[folderKey];
    }
    const folderMailIds: string[] = (useSelectedFolderIds(getMailList(selectedFolder)) as string[])|| [];

    const selectedAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setMapState({
            type: eMailActionTypes.CHECK_BOX_CHANGE_ALL,
            deleteMailIds: e.target.checked ? folderMailIds: []
        })
    }

    const deleteSelected = async () => {
        try {
            console.log(idsToDelete);
            const result = await axios.delete(`${baseUrl}/deleteMail`, { 
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                    "Authorization": "super secret key"
                  }, 
                data: { delete: idsToDelete } 
            }
                )
            if (result.status !== HTTP_STATUS.CLIENT_OK) {
                setMapState({
                    type: eMailActionTypes.SET_ERROR,
                    error: ErrorTypes.DELETE_ERROR
                })
                return;
            }
            const deleteIds = idsToDelete;
            deleteIds.map((mailId) => (
                setMapState({
                    type: eMailActionTypes.DELETE_SELECTED,
                    mailId: mailId
                })
            ))
            setMapState({
                type: eMailActionTypes.CLEAR_ID_DELETE
            })
        }
        catch (e) {
            setMapState({
                type: eMailActionTypes.SET_ERROR,
                error: ErrorTypes.DELETE_ERROR
            })
        }
        
    }
    return <Container fluid >
        <Row style={styles.rowStyles}>
            <Form.Check type="checkbox"
                checked={folderMailIds.length === idsToDelete.length && folderMailIds.length!==0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    selectedAllChange(e)
                }} />
            <ButtonGroup style={styles.buttonGroupStyle}>
                <Button variant="outline-secondary"><FaRegEyeSlash /></Button>
                <Button id="delete-button" disabled={selectedFolder === OutlookFolderFilters.eTrash} variant="outline-secondary" onClick={() => { deleteSelected() }}><AiOutlineDelete /></Button>
                <Button variant="outline-secondary"><TiCancel /></Button>
            </ButtonGroup>
        </Row>
        </Container>
}
export default ClientControls;