import React from 'react';
import { useMapState } from './ClientMapContext';
import { Container, Col } from 'react-bootstrap';
import styled from 'styled-components';

const StyledPara = styled.p`
 white-space: pre;
`
const ClientContent: React.FC = () => {
    const styles = {
        mailContentContainer: {
            overflow: 'auto',
            maxHeight: '100%'
        }
    }
    const { mapState: { selectedMailIdDisplay, idToMailMap },
    } = useMapState();

    console.log("ClientContent")
    console.log(selectedMailIdDisplay ? idToMailMap[selectedMailIdDisplay].content : null)
    return (
        <Container style={styles.mailContentContainer} >
            <Col> 
                {selectedMailIdDisplay ? idToMailMap[selectedMailIdDisplay].content.split(('\n')).map((item, index) => (<StyledPara key={index} className={'mail-content'}>{item}</StyledPara>)) : null}
            </Col>
        </Container>);
}

export default ClientContent;