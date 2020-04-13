import React from "react";
import { useMapState } from "./ClientMapContext";
import styled from "styled-components";

const ClientMailReadReceipt = () => {
    const {
        mapState: { userInbox, idToMailMap },
    } = useMapState();

    const SyledUnreadCount = styled.span`
        padding: 3px;
        font-size: 18px;
    `
    const unreadCount = userInbox?.filter((mailId) => (idToMailMap[mailId].read === 'false'))?.length || 0;
    return unreadCount ? <SyledUnreadCount>({unreadCount})</SyledUnreadCount>: null
}

export default ClientMailReadReceipt