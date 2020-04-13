import { ClientMailMapState } from "./ClientMailMapState";
import { OutlookFolderFilters } from "./exports";

export const getMailList = (selectedFolder: OutlookFolderFilters): keyof ClientMailMapState => {
    switch (selectedFolder) {
        case OutlookFolderFilters.eInbox:
            return 'userInbox';
        case OutlookFolderFilters.eSent:
            return 'userSent';
        case OutlookFolderFilters.eTrash:
            return 'userTrash';
        default:
            return 'userInbox';
    }

}
