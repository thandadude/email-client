import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import ClientFolders from './components/ClientFolders';
import ClientContainer from './components/ClientContainer';
import { useMapState } from './components/ClientMapContext';
import axios from 'axios';
import { baseUrl, ErrorTypes } from './components/exports';
import { eMailActionTypes } from './components/Interface';
import { commonStyles, colors } from './components/background';

const styles = {
  container:{
    padding: '0 15px',
    height: '100%'
  },
  rowStyle:{
    height: '100%'
    },
    sideBarContainer: {
        background: colors.sidebarBackground,
        color: "white"
    }
}

const App: React.FC = () => {
  const { 
    setMapState
    } = useMapState();
  
  useEffect(()=>{
    async function fetchMailsData(){
        try {
            setMapState({ type: eMailActionTypes.SET_LOADING }) 
            const result = await axios.get(`${baseUrl}/getMails`);
            console.log("Calling get mails....OK ''");
            console.log(result.data);
            setMapState({type: eMailActionTypes.SET_MAILS, payload: result.data.text }) 
        }
      catch (e) {
          setMapState({ type: eMailActionTypes.SET_ERROR, error: ErrorTypes.DATA_ERROR }) 
      }
    }
    fetchMailsData();
  },[])

  return (
      <Container fluid style={styles.container}>
          <Row style={commonStyles.heightFull} >
              <Col style={{ ...commonStyles.paddingNone, ...styles.sideBarContainer }} xl={2} lg={2} md={2} sm={3} xs={3}><ClientFolders /></Col>
              <Col style={{...commonStyles.paddingNone}} xl={10} lg={10} md={10} sm={9} xs={9}><ClientContainer/></Col>
        </Row>
      </Container>
    
  );
}

export default App;
