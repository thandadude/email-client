import ClientLayout from './ClientLayout';
import React from 'react'; 
import ClientDetails from './ClientDetails';
import ClientContent from './ClientContent';

const ClientMail: React.FC = () => {
    return <ClientLayout>
            <ClientDetails/>
            <ClientContent/>
        </ClientLayout>     
}

export default ClientMail;
