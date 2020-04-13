


export enum OutlookFolderFilters {
    eInbox="Inbox",
    eSent="Sent",
    eTrash="Trash"
}

export const OutlookFolderList: OutlookFolderFilters[] = [
    OutlookFolderFilters.eInbox, 
    OutlookFolderFilters.eSent,
    OutlookFolderFilters.eTrash 
]

export const baseUrl = 'http://localhost:8000'

export enum ErrorTypes {
    DATA_ERROR = 'Data recevied error',
    READ_ERROR = "Error marking read",
    DELETE_ERROR = "Error deleting"
}

export enum HttpStatus {
    CLIENT_OK = 200,
    CLIENT_ERROR = 400,
    SERVER_ERROR = 500
}

