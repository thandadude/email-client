import React from 'react'; 
import { commonStyles } from './background';
import { Container, Col, Row } from 'react-bootstrap';
import ClientLayout from './ClientLayout';
import ClientMailSubject from './ClientMailSubject';
import ClientMail from './ClientMail';
import ClientMailList from './ClientMailList';
import { useMapState } from './ClientMapContext';
import ClientComposeSubject from './ClientComposeSubject';
import ClientComposeContent from './ClientComposeContent';

const styles = {
    mailsDisplay:{
        flex: 1,
        minHeight: 0
        
    },
    colMaxHeight: {
        maxHeight: '100%',
        minHeight: '100%'
    }
}
const ClientDisplay: React.FC = () => {
    const {
        mapState: {  selectedMailIdDisplay, composeMail },
    } = useMapState();

    if (composeMail === false) {
        console.log("ClientDisplay")
        return <Container fluid style={styles.mailsDisplay}>
            <Row style={commonStyles.heightFull}>
                <Col xl={4} lg={4} md={3} sm={3} xs={3} style={{ ...commonStyles.paddingNone, ...styles.colMaxHeight }}>
                <ClientMailList/>
                </Col>
                <Col xl={8} lg={8} md={9} sm={9} xs={9} style={{ ...commonStyles.paddingNone, ...styles.colMaxHeight }}>
                    <ClientLayout>                    
                        {selectedMailIdDisplay && <ClientMailSubject />}
                        {selectedMailIdDisplay && <ClientMail />}
                    </ClientLayout>
                </Col>
            </Row>
        </Container>    
    }
    else {
        console.log("ClientComposeDisplay")
        return <Container fluid style={styles.mailsDisplay}>
            <Row style={commonStyles.heightFull}>
                <Col xl={4} lg={4} md={3} sm={3} xs={3} style={{ ...commonStyles.paddingNone, ...styles.colMaxHeight }}>
                <ClientMailList/>
                </Col>
                <Col xl={8} lg={8} md={9} sm={9} xs={9} style={{ ...commonStyles.paddingNone, ...styles.colMaxHeight }}>
                    <ClientLayout>                    
                        {composeMail && <ClientComposeSubject />}
                        {composeMail && <ClientComposeContent />}
                    </ClientLayout>
                </Col>
            </Row>
        </Container>
    }

    
}

export default ClientDisplay;