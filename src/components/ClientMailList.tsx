import React from 'react';
import { useMapState } from "./ClientMapContext";
import { ListGroup } from 'react-bootstrap';
import { ClientMailMapState } from './ClientMailMapState';
import { getMailList } from './ClientFolderFilters';
import styled from 'styled-components';
import ClientListItem from './ClientListItem';

const styles = {
    listItemsContainer: {
        maxHeight: '100%',
        overflow: 'auto'
    }
}

const ClientMailList: React.FC = () => {

    const {
        mapState: { selectedFolder, isLoading }
    } = useMapState();

    const StyledNoMail = styled.div`
        font-size:12px;
        font-weight: bold;
        text-align: center;
        padding: 10px;
    `

    const useSelectedFolderIds = (folderKey: keyof ClientMailMapState ) => {
        const { mapState } = useMapState();
        return mapState[folderKey];
    }
    
    const folderMailIds = (useSelectedFolderIds(getMailList(selectedFolder))as string[])||[]
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (folderMailIds.length === 0) {
        return <StyledNoMail> {selectedFolder} is empty</StyledNoMail>
    }
    return (<ListGroup style={styles.listItemsContainer} data-testid="mail-list-group-container">
        {folderMailIds.map((mailId: string) => {
            return <ClientListItem data-testid={'mail-list-item'}  key={mailId} mailId={mailId} />
        })}
    </ListGroup>)
}

export default ClientMailList;