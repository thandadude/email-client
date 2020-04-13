import React from 'react';
import { useMapState } from './ClientMapContext';
import { useState } from "react";
import { eMailActionTypes, ISendMailData } from './Interface';
import { Container, Col, Row } from 'react-bootstrap';
import { Button, Input, FormGroup, Label } from 'reactstrap';
import { colors } from "./background";
import * as EmailValidator from 'email-validator';
//import { FormWithConstraints /*, FieldFeedbacks, FieldFeedback*/ } from 'react-form-with-constraints'
import styled from 'styled-components';


const StyledLogo = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    align-items: center;
    font-size: 10px
`


const ClientComposeContent: React.FC = () => {
    
    const { 
        setMapState
        } = useMapState();
      
    const styles = {
        selected: {
            background: colors.mailFolderSelected,
            marginLeft: 'auto'
        },
        innerselected: {
            background: colors.mailListBackground,
            marginLeft: 'auto'
        },
        mailContentContainer: {
            overflow: 'auto',
            maxHeight: '100%',
            minHeight: '100%'
            //flex: 2
        },
        rowStyles: {
            padding: '10px',
            paddingLeft: '10px'
        }
    }

    const [recvAddress, handleAddress] = useState("");
    const [subjectMail, handleSubject] = useState("");
    const [emailContent, handleContentData] = useState("");
    //const [selectedFile, handleFileData] = useState();
    let fileBase64Data : any;
    let fileSize: number = 0;

    console.log("ClientComposeContent")

    //base64 encoder.
    const toBase64 = (inputFile: Blob) => {
        const fileReader = new FileReader();
        
        return new Promise((resolve, reject) => {
                fileReader.onerror = () => {
                    fileReader.abort();
                    reject(new DOMException("Problem parsing input file."));
                };
        
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.readAsDataURL(inputFile);
        });
    };
        
    //Filereader is async, handle it like that.
    const handleFileData = async (event: any) => {
        if(event.target.files.length) {
            let file = event.target.files[0];
            fileSize = event.target.files[0].size;

            if(fileSize >= (5000 * 1000)) {
                alert('Verification Failed: This test App does not support file sizes > 5MB as file is transferred in Json Blob.');
                return;
            }
            if(fileSize > 0) {
                console.log("file Size: '" + fileSize + "'");
                try {
                    fileBase64Data = await toBase64(file);
                    console.log("handleFileData Triggerred: '" + fileBase64Data + "'");
                } catch (e) {
                    console.log("Error uploading file '" + e + "'");
                }
            }
        }
        else {
            fileBase64Data = null;
            fileSize = 0;
        }
    }

    //trigger the sendmail option.
    const sendMail = () => {
        console.log("sendMail Button Clicked");

        //validate email.
        if(EmailValidator.validate(recvAddress) !== true) {
            alert('Verification Failed: Please provide a valid email address.');
            console.log("Verification Failed: Please provide a proper email address format.");
            return;
        }
        //validate subject line.
        if(subjectMail.length <= 0) {
            const r = window.confirm("Do you really want to send mail without a subject line?"); 
            if(r === false)  {
                return;
            }
        }
        if(fileSize >= (5000 * 1000)) {
            alert('Verification Failed: This test App does not support file sizes > 5MB as file is transferred in Json Blob.');
            return;
        }

        var tempDate = new Date();
        var todaysDate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate() +' '+ tempDate.getHours()+':'+ tempDate.getMinutes()+':'+ tempDate.getSeconds();
        let sendData: ISendMailData = { 
            content: emailContent,
            file: (fileBase64Data ? fileBase64Data.split(',')[1] : ""),   //json blob with base 64 encoding, strip off the ('data:application/octet-stream;base64')
            date: todaysDate,
            senderEmail: "xxxxxx",  //this will be picked up while sending data to via axios to backend.
            senderName: "xxxxx",
            subject: subjectMail,
            receiverEmail: recvAddress,
            read: "true"
        };
        setMapState({ type: eMailActionTypes.SEND_MAIL, 
            mailData: sendData })
    };
    
    const cancelMail = () => {
        console.log("cancelMail Button Clicked");
        setMapState({ type: eMailActionTypes.RESET_COMPOSE_MAIL_DISPLAY})
    };


    return (
        <Container style={{ ...styles.mailContentContainer }} >  
            <Col> 
            <FormGroup row>
                <Label for="emailAddress" sm={2}>To:</Label>
                <Col sm={10}>
                <Input style={ styles.innerselected } type="email" name="email" id="emailAddress" placeholder="email" value={recvAddress} onChange={e => handleAddress(e.target.value)} />
                </Col>
                <Label for="subject" sm={2}>Subject:</Label>
                <Col sm={10}>
                <Input style={ styles.innerselected } type="text" name="subject" id="subject" placeholder="subject" value={subjectMail} onChange={e => handleSubject(e.target.value)} />
                </Col>
            </FormGroup>
            </Col>          
            <Input type="textarea" name="text" id="emailText" value={emailContent} onChange={e => handleContentData(e.target.value)} rows={20} />
            <Row style={ styles.rowStyles }>
                <Col xs="8"><StyledLogo><Input type="file" name="file" id="exampleFile" onChange={ handleFileData } /></StyledLogo></Col>
                <Col xs="auto"><Button style={ styles.selected }  onClick={cancelMail}>Cancel</Button></Col>
                <Col xs="auto"><Button style={ styles.selected } onClick={sendMail}>Send</Button></Col>
            </Row>
        </Container>);
}

export default ClientComposeContent;
