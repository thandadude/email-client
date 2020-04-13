import { OutlookFolderFilters } from "./exports";
import React from "react";
import { MdMoveToInbox } from "react-icons/md";
import { FiSend } from "react-icons/fi";
//import { TiCancel } from "react-icons/ti";
import { AiOutlineDelete } from 'react-icons/ai';
import styled from 'styled-components';

interface Props {
    folder: OutlookFolderFilters
}

const StyledIconContainer = styled.span`
    padding: 10px
`;

const MailClientIcons = ({ folder }: Props) => {
    const iconProps = {
        size: 30
    }
    const folderIcon = () => {
        switch (folder) {
            case OutlookFolderFilters.eInbox:
                return <MdMoveToInbox { ...iconProps } />
            case OutlookFolderFilters.eSent:
                return <FiSend {...iconProps} />
            case OutlookFolderFilters.eTrash:
                return <AiOutlineDelete {...iconProps} />
            default:
                return <MdMoveToInbox {...iconProps} />
        }
    }
   
    return <StyledIconContainer>{folderIcon()}</StyledIconContainer>
}

export default MailClientIcons;