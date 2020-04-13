import React from 'react';
import { OutlookFolderFilters, OutlookFolderList } from './exports';
import { Button } from 'react-bootstrap';
import { useMapState } from './ClientMapContext';
import { eMailActionTypes } from './Interface';
import styled from 'styled-components';
import { GoMail } from "react-icons/go";
import { colors } from "./background";
import MailClientIcons from './Icons';
import ClientMailReadReceipt from './ClientMailReadReceipt';

const styles = {
   
    selected: {
        background: colors.mailFolderSelected
    },
    folderBox: {
        justifyContent: 'center'
    }
}

const StyledText = styled.div`
        padding: 10px 0px;
        padding-left: 40px;
        
    `;

const StyledLogo = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    align-items: center;
    font-size: 20px
`
const StyledLogoItems = styled.div`
    padding: 10px,
    font-size: 24px
`
const StyledName = styled.div`
    padding: 10px;
    font-size: 23px
`
const StyledFolderListContainer = styled.div`
    margin-top: 20px
`
const StyledFolderName = styled.span`
    font-size: 18px
`
const ClientFolders: React.FC = () => {
    const { mapState: { selectedFolder },
        setMapState } = useMapState();
    const selectFolder = (prevSelectedFolder: OutlookFolderFilters, newFolder: OutlookFolderFilters) => {
        if (prevSelectedFolder !== newFolder) {
            setMapState({ type: eMailActionTypes.SET_SELECTED_FOLDER, selectedFolder: newFolder })
        }
    }
    const getStyle = (selectedFolder: OutlookFolderFilters, folder: OutlookFolderFilters) => {
        return selectedFolder === folder ? { ...styles.selected } : {}
    }
    const composeMail = () => {
        console.log("Button Clicked");
        setMapState({ type: eMailActionTypes.SET_COMPOSE_MAIL_DISPLAY})
    };

    

    return (<React.Fragment>
        <StyledLogo>
            <StyledLogoItems><GoMail size={30} /></StyledLogoItems>
            <StyledName>Mail</StyledName>
        </StyledLogo> 
        <StyledLogo><Button onClick={composeMail}>Compose</Button></StyledLogo>
        <StyledFolderListContainer>
            {OutlookFolderList.map((folder) => (<StyledText key={folder}
                style={getStyle(selectedFolder, folder)}
                onClick={() => { 
                    selectFolder(selectedFolder, folder) }}>
                <React.Fragment>
                    <MailClientIcons folder={folder} />
                    <StyledFolderName>{folder}</StyledFolderName>{folder === OutlookFolderFilters.eInbox && <ClientMailReadReceipt/>}
                </React.Fragment>
            </StyledText>))}
        </StyledFolderListContainer>
    </React.Fragment>);
}

export default ClientFolders;
