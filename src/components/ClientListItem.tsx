import React from "react";
import { ListGroup, Form, Container, Row } from "react-bootstrap";
import axios from 'axios';
import { baseUrl, HttpStatus as HTTP_STATUS, ErrorTypes } from './exports';
import { useMapState } from "./ClientMapContext";
import { eMailActionTypes } from "./Interface";
import { IoMdStarOutline } from "react-icons/io";
import ClientDate from "./ClientDate";
import styled from "styled-components";
import { colors } from "./background";
interface Props {
    mailId: string;
}
const MailSubject =  styled.div`
    flex-grow: 1
`
const StyledNameLabels = styled.div`
    color: gray;
    font-size: 13px
`

const UnreadItem = styled.div<{ read: boolean }>`
    font-weight: ${ props => props.read ? `normal`: `bold` }  
`

const styles = {
    listItemBackgroundDefault: {
        background: colors.mailListBackground
    },
    selectedMailBackground: {
        background: colors.mailSelected
    }
}

const ClientListItem = ({ mailId }: Props) => {
    const {
        mapState: { idToMailMap, selectedMailIdDisplay, idsToDelete },
        setMapState
    } = useMapState();

    const itemClicked = (mailId: string, read: string) => {
        setMapState({ type: eMailActionTypes.SET_SELECTED_MAIL_DISPLAY, selectedMailToDisplay: mailId });
        if (read === "false") {
            markRead(mailId);
        }
    }

    const checkBoxChange = (e: React.ChangeEvent<HTMLInputElement>, mailId: string) => {
        setMapState({
            type: eMailActionTypes.CHECK_BOX_CHANGE,
            check: e.target.checked, id: mailId
        });
    }

    const markRead = async (mailId: string) => {
        try {
            const data = await axios.post(`${baseUrl}/markRead/${mailId}`)
            if (data.status !== HTTP_STATUS.CLIENT_OK) {
                setMapState({ type: eMailActionTypes.SET_ERROR, error: ErrorTypes.READ_ERROR })
                return;
            }
            setMapState({ type: eMailActionTypes.SET_MAIL_READ, mailId })
        }
        catch (e) {
            setMapState({ type: eMailActionTypes.SET_ERROR, error: ErrorTypes.READ_ERROR })
        }

    }
    const mailItem = idToMailMap[mailId];

    return <ListGroup.Item style={selectedMailIdDisplay === mailId ? styles.selectedMailBackground : styles.listItemBackgroundDefault} key={mailId} onClick={() => { itemClicked(mailId, mailItem.read) }}>
        <Container >
            <Row>
                <Form.Check type="checkbox"
                    checked={idsToDelete.indexOf(mailId) >= 0}
                    onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => { e.stopPropagation() }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { checkBoxChange(e, mailId) }}
                />
                <MailSubject>
                    <UnreadItem read={((mailItem.read === 'true' ? true : false))}>{idToMailMap[mailId].subject}</UnreadItem>
                    <StyledNameLabels>{mailItem.senderName}</StyledNameLabels>
                </MailSubject>
                <UnreadItem read={((mailItem.read === 'true' ? true : false))}><ClientDate dateStamp={mailItem.date} /></UnreadItem>
                <IoMdStarOutline size={20} />
            </Row>
        </Container>
    </ListGroup.Item>
}

export default ClientListItem