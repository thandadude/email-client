import React from 'react';
import ClientControls from './ClientControls';
import ClientDisplay from './ClientDisplay';
import ClientHeader from './ClientHeader';

const styles = {
    containerStyles: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: '100vh'
    }
}

const ClientContainer: React.FC = () => {
    return (<div style={styles.containerStyles}>
        <ClientHeader/>   
        <ClientControls />
        <ClientDisplay />
    </div>
 );
}

export default ClientContainer;
