//import React from 'react';
import { MapActions, eMailActionTypes, IAccounts, IAccountDetails, IUserToMailMap, IMail, IIDToMailMap  } from './Interface';
import { OutlookFolderFilters, ErrorTypes, baseUrl, HttpStatus as HTTP_STATUS } from './exports';
import { getMailList } from './ClientFolderFilters';
import axios from 'axios';



export type ClientMailMapState = { 
  accountList: IAccountDetails[],
  selectedAccount?: IAccountDetails,
  userToMailMap: IUserToMailMap,
  idToMailMap: IIDToMailMap,
  userInbox: string[],
  userSent: string[],
  userTrash: string[],
  selectedFolder: OutlookFolderFilters,
  selectedMailIdDisplay?: string,
  idsToDelete: string[],
  error?: string,
  isLoading: boolean,
  composeMail: boolean
};



export const initialState: ClientMailMapState = {
    accountList: [],
    selectedAccount: undefined,
    userToMailMap: {},
    idToMailMap: {},
    userInbox: [],
    userSent: [],
    userTrash: [],
    selectedFolder: OutlookFolderFilters.eInbox,
    selectedMailIdDisplay: undefined,
    idsToDelete: [],
    isLoading: false,
    composeMail: false
}

export const reducer = (state: ClientMailMapState, action: MapActions) => {
    switch (action.type) {
        
        case eMailActionTypes.SET_MAILS: {
            var jsonMails = JSON.parse(action.payload);
            const accounts: IAccounts[] = jsonMails['accounts'];   //get all accounts associated with all mails.
            console.log(accounts);
            const selectedAccount = accounts[0];
            if (!selectedAccount || !selectedAccount.address) {
                return {
                    ...state,
                    error: ErrorTypes.DATA_ERROR
                }
            }
            const list_of_all_mails: IMail[] = accounts?.reduce((prev: any[], curr) => (prev.concat((curr.mail.map((m: any) => ({
                ...m,
                receiverEmail: curr.address,
                id: curr.address + m.date + m['sender email'], //receiver+date+sender
                senderEmail: m["sender email"], //easy to access keys without space
                senderName: m["sender name"],
                read: m["read"]
            }))))), []).sort((a: IMail, b: IMail) => (a.date > b.date ? -1 : 1));

            const selectedMailsList = list_of_all_mails.filter((mail) => mail.receiverEmail === selectedAccount.address)

            return {
                ...state,
                accountList: accounts.filter((acc: IAccounts) => (acc.mail)).map((acc: IAccounts) => ({
                    name: `${acc.name} ${acc.surname}`,
                    address: acc.address
                })),
                selectedAccount: {
                    ...state.selectedAccount,
                    name: `${accounts[0]?.name} ${accounts[0]?.surname}`,
                    address: accounts[0].address
                },
                userToMailMap: list_of_all_mails.reduce(function (prev: IUserToMailMap, curr: IMail) {
                    prev[curr.receiverEmail] = (prev[curr.receiverEmail] || []).concat(curr.id);
                    console.log(prev)
                    return prev;
                }, {} as IUserToMailMap), //user wise mail ids
                idToMailMap: list_of_all_mails.reduce((prev: IIDToMailMap, curr: IMail) => {
                    prev[curr.id] = curr;
                    return prev;
                }, {}), //id to email details map
                //below are folderwise mail ids
                userInbox: selectedMailsList.filter((mail) =>
                    (mail.folder === OutlookFolderFilters.eInbox)).map((mail) => (mail.id)),
                userSent: selectedMailsList.filter((mail) =>
                    (mail.folder === OutlookFolderFilters.eSent)).map((mail) => (mail.id)),
                userTrash: selectedMailsList.filter((mail) =>
                    (mail.folder === OutlookFolderFilters.eTrash)).map((mail) => (mail.id)),
                isLoading: false,
                composeMail: false

            };
            
        }
        case eMailActionTypes.SET_SELECTED_FOLDER: {
            return {
                ...state,
                selectedFolder: action.selectedFolder,
                selectedMailIdDisplay: undefined,
                idsToDelete: [],
                composeMail: false
            }
        }
        case eMailActionTypes.SET_SELECTED_ACCOUNT: {
            const { selectedAccountMailId } = action;
            const newSelectedAccountDetails = state.accountList.find((account) => (account.address === selectedAccountMailId))
            const newSelectedUserMail = state.userToMailMap[selectedAccountMailId];
            if (!newSelectedAccountDetails)
                return state;
            return {
                ...state,
                selectedAccount:  {
                    ...state.selectedAccount,
                    name: newSelectedAccountDetails.name,
                    address: newSelectedAccountDetails.address
                },
                userInbox: newSelectedUserMail.filter((mailId) =>
                    (state.idToMailMap[mailId].folder === OutlookFolderFilters.eInbox)),
                userSent: newSelectedUserMail.filter((mailId) =>
                    (state.idToMailMap[mailId].folder === OutlookFolderFilters.eSent)),
                userTrash: newSelectedUserMail.filter((mailId) =>
                    (state.idToMailMap[mailId].folder === OutlookFolderFilters.eTrash)),
                selectedMailIdDisplay: undefined,
                idsToDelete: [],
                composeMail: false

            }
        }
        case eMailActionTypes.SET_COMPOSE_MAIL_DISPLAY:
            console.log("SET_COMPOSE_MAIL_DISPLAY")
            return {
                ...state,
                composeMail: true
            }
        case eMailActionTypes.RESET_COMPOSE_MAIL_DISPLAY:
            console.log("RESET_COMPOSE_MAIL_DISPLAY")
            return {
                ...state,
                composeMail: false
            }
        case eMailActionTypes.SEND_MAIL:
            console.log("SEND MAIL")
            const { mailData } = action;
            
            let body = JSON.stringify({
                "content": mailData.content,
                "date": mailData.date,
                "sender email": state.selectedAccount?.address, //set selected account to load from.
                "sender name": state.selectedAccount?.name,//set selected account name to load from.
                "subject": mailData.subject,
                "folder": "Sent",
                "read": "true",
                "receiverEmail": mailData.receiverEmail,
                "file": mailData.file
            })

            //console.log("sending body '" + body + "'");
            try {
                axios.post(
                    baseUrl + '/sendMail', 
                    body, 
                    {
                        headers: {  //we set our test python server to accept any auth from this axios test setup.
                            //'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
                            'Content-Type': 'application/json'
                        }
                    }
                    ).then(response => {
                        console.log("Done....." + response.status);
                        if (response.status !== HTTP_STATUS.CLIENT_OK) {
                            console.log("HTTP_STATUS !CLIENT_OK")
                            //setMapState({ type: eMailActionTypes.SET_ERROR, error: ErrorTypes.READ_ERROR })
                        }
                    });
            }
            catch (e) {
                console.log("HTTP_STATUS READ ERROR")
            }

            return {
                ...state,
                type: eMailActionTypes.REFRESH,
                composeMail: false
            }
        case eMailActionTypes.SET_SELECTED_MAIL_DISPLAY: 
            console.log("SET_SELECTED_MAIL_DISPLAY")
            return {
                ...state,
                selectedMailIdDisplay: action.selectedMailToDisplay,
                composeMail: false
            }
        case eMailActionTypes.SET_MAIL_READ:
            return {
                ...state,
                idToMailMap: {
                    ...state.idToMailMap,
                    [action.mailId]: {
                        ...state.idToMailMap[action.mailId],
                        read: "true",
                        composeMail: false
                    }
                }
            }
        case eMailActionTypes.CHECK_BOX_CHANGE: {
            return {
                ...state,
                idsToDelete: action.check ? [...state.idsToDelete, action.id] : state.idsToDelete.filter((id) => (id !== action.id)),
                composeMail: false
            }
        }
        case eMailActionTypes.CHECK_BOX_CHANGE_ALL: {
            return {
                ...state,
                idsToDelete: action.deleteMailIds,
                composeMail: false
            }
        }
        case eMailActionTypes.DELETE_SELECTED: {
            const currentFolder = getMailList(state.selectedFolder);
            return {
                ...state,
                [currentFolder]: ((state[currentFolder]||[])as string[]).filter((id: string) => (id !== action.mailId)),
                userTrash: state.userTrash.concat(action.mailId),
                idToMailMap: {
                    ...state.idToMailMap,
                    [action.mailId]: {
                        ...state.idToMailMap[action.mailId],
                        folder: OutlookFolderFilters.eTrash
                    }
                },
                composeMail: false
            }
        }
        case eMailActionTypes.SET_ERROR: {
            return {
                ...state,
                error: action.error,
                composeMail: false
            }
        }
        case eMailActionTypes.SET_LOADING: {
            return {
                ...state,
                isLoading: true,
                composeMail: false
            }
        }
        case eMailActionTypes.CLEAR_ID_DELETE: {
            return {
                ...state,
                idsToDelete: [],
                composeMail: false
            }
        }
        case eMailActionTypes.REFRESH: {

            try {
                //setMapState({ type: eMailActionTypes.SET_LOADING }) 
                const result = axios.get(`${baseUrl}/getMails`);
                console.log("Calling get mails....OK ''");
                console.log(result);
                return {
                    ...state,
                    type: eMailActionTypes.SET_MAILS,
                    payload: result,
                    composeMail: false
                }
            }
            catch (e) {
                //setMapState({ type: eMailActionTypes.SET_ERROR, error: ErrorTypes.DATA_ERROR }) 
                return {
                    ...state,
                    type: eMailActionTypes.SET_ERROR,
                    error: ErrorTypes.DATA_ERROR,
                    composeMail: false
                }
            }
           
            return {
                ...state,
                idsToDelete: [],
                composeMail: false
            }
        }

        default:
            return state;
    }
  };
