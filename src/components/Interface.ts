import { OutlookFolderFilters, ErrorTypes } from './exports';

export enum eMailActionTypes {
    SET_MAILS = 'SET_MAILS',
    SET_SELECTED_FOLDER = 'SET_SELECTED_FOLDER',
    SET_SELECTED_ACCOUNT = 'SET_SELECTED_ACCOUNT',
    SET_SELECTED_MAIL_DISPLAY = 'SET_SELECTED_MAIL_DISPLAY',
    SET_MAIL_READ = 'SET_MAIL_READ',
    CHECK_BOX_CHANGE = 'CHECK_BOX_CHANGE',
    CHECK_BOX_CHANGE_ALL = 'CHECK_BOX_CHANGE_ALL',
    DELETE_SELECTED = 'DELETE_SELECTED',
    SET_ERROR = 'SET_ERROR',
    SET_LOADING = 'SET_LOADING',
    CLEAR_ID_DELETE = 'CLEAR_ID_DELETE',
    SET_COMPOSE_MAIL_DISPLAY = 'SET_COMPOSE_MAIL',
    RESET_COMPOSE_MAIL_DISPLAY = 'RESET_COMPOSE_MAIL',
    SEND_MAIL = 'SEND_MAIL',
    REFRESH = 'REFRESH'
}

export interface IAccountDetails{
    name: string,
    address: string
}

export interface IAccounts{
    address: string,
    mail: IMail[],
    name: string,
    surname: string
}

export interface IMail {
    id: string, //receiver+date+sender
    content: string,
    date: number,
    senderEmail: string,
    senderName: string,
    subject: string,
    receiverEmail: string,
    folder: OutlookFolderFilters,
    read: string
}

export interface ISendMailData {
    content: string,
    file: any,
    date: string,
    senderEmail: string,
    senderName: string,
    subject: string,
    receiverEmail: string,
    read: string
}

export interface IUserToMailMap {
    [key: string]: string[]
}

export interface IIDToMailMap {
    [key: string]: IMail
}


//Interfaces of dispatched actions
interface IReceiveMailData {
    type: eMailActionTypes.SET_MAILS,
    payload: string 
}

interface ISetSelectedFolder {
    type: eMailActionTypes.SET_SELECTED_FOLDER,
    selectedFolder: OutlookFolderFilters
}

interface ISetComposeMail {
    type: eMailActionTypes.SET_COMPOSE_MAIL_DISPLAY
}

interface ISendMail {
    type: eMailActionTypes.SEND_MAIL,
    mailData: ISendMailData
}

interface IReSetComposeMail {
    type: eMailActionTypes.RESET_COMPOSE_MAIL_DISPLAY
}

interface ISetSelectedAccount {
    type: eMailActionTypes.SET_SELECTED_ACCOUNT,
    selectedAccountMailId: string
}

interface ISetSelectedMailToDisplay {
    type: eMailActionTypes.SET_SELECTED_MAIL_DISPLAY,
    selectedMailToDisplay: string
}

interface ICheckBoxAction {
    type: eMailActionTypes.CHECK_BOX_CHANGE,
    id: string,
    check: boolean
}

interface ICheckBoxAllAction {
    type: eMailActionTypes.CHECK_BOX_CHANGE_ALL,
    deleteMailIds: string[]
}

interface ISetMailToRead {
    type: eMailActionTypes.SET_MAIL_READ,
    mailId: string
}

interface IDeleteSelected {
    type: eMailActionTypes.DELETE_SELECTED,
    mailId: string
}

interface ISetError {
    type: eMailActionTypes.SET_ERROR,
    error: ErrorTypes
}

interface ISetLoading {
    type: eMailActionTypes.SET_LOADING
}

interface IClearIdDeleteList {
    type: eMailActionTypes.CLEAR_ID_DELETE
}

interface IRefreshMails {
    type: eMailActionTypes.REFRESH
}

export type MapActions = IReceiveMailData
    | ISetSelectedFolder
    | ISetSelectedAccount
    | ISetSelectedMailToDisplay
    | ISetMailToRead
    | ICheckBoxAction
    | ICheckBoxAllAction
    | IDeleteSelected
    | ISetError
    | ISetLoading
    | IClearIdDeleteList
    | ISetComposeMail
    | IReSetComposeMail
    | ISendMail
    | IRefreshMails