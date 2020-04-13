import React from 'react';
import { useMapState } from './ClientMapContext';
import { Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { IoMdStarOutline } from "react-icons/io";
import ClientDate from './ClientDate';
import { colors } from './background';
const styles = {
    mailDetailsContainer: {
        background: colors.mailListBackground
    },
    mailDetailsRow: {
        padding: '10px'
    }
}

const StyledMailDetails = styled.div`
    flex-grow: 1;

`
const StyledNames = styled.div`
`

const StyledNameLabels = styled.label`
    color: gray;
    padding-right: 10px;
`
const ClientDetails: React.FC = () => {
    const { mapState: { selectedMailIdDisplay, idToMailMap, selectedAccount },
    } = useMapState();
    const selectedMail = selectedMailIdDisplay ? idToMailMap[selectedMailIdDisplay] : undefined;

    if(selectedMail?.folder === "Inbox"){
        return (<Container fluid style={styles.mailDetailsContainer}>
            <Row style={styles.mailDetailsRow}>
                <StyledMailDetails>
                    <StyledNames><StyledNameLabels>From:</StyledNameLabels>{selectedMail?.senderName}</StyledNames>
                    <StyledNames><StyledNameLabels>To:</StyledNameLabels>{selectedAccount?.name}</StyledNames>
    
                </StyledMailDetails>
                {selectedMail && <ClientDate dateStamp={selectedMail.date} showAgo={true} />}
                <IoMdStarOutline size={20}/>
            </Row>
        </Container>);
    }
    else {
        return (<Container fluid style={styles.mailDetailsContainer}>
            <Row style={styles.mailDetailsRow}>
                <StyledMailDetails>
                    <StyledNames><StyledNameLabels>From:</StyledNameLabels>{selectedMail?.senderName}</StyledNames>
                    <StyledNames><StyledNameLabels>To:</StyledNameLabels>{selectedMail?.receiverEmail}</StyledNames>
    
                </StyledMailDetails>
                {selectedMail && <ClientDate dateStamp={selectedMail.date} showAgo={true} />}
                <IoMdStarOutline size={20}/>
            </Row>
        </Container>);
    }

    
}

export default ClientDetails;