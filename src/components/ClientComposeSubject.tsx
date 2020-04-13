import React from 'react';
import { useMapState } from './ClientMapContext';
import { Container} from 'react-bootstrap';

const ClientComposeSubject: React.FC = () => {
    const styles = {
        mailContentContainer: {
            overflow: 'auto',
            maxHeight: '100%'
        }
    }
    const { setMapState: { /*composeMail*/ },
    } = useMapState();

    return (
        <Container style={styles.mailContentContainer} >            
        </Container>);
}

export default ClientComposeSubject;
