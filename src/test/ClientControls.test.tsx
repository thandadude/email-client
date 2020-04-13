import React from 'react';
import { mount } from 'enzyme';
import ClientControls from '../components/ClientControls';
import { initialState } from '../components/ClientMailMapState';
import { OutlookFolderFilters } from '../components/exports';
import * as ClientMapProvider from '../components/ClientMapContext'

describe("mail controlstesting ", () => {
    it("disable delete button trash folder", () => {
        const contextValues = {
            mapState: {
                ...initialState,
                selectedFolder: OutlookFolderFilters.eTrash
            },
            setMapState: () => { }
        };
        jest.spyOn(ClientMapProvider, "useMapState").mockImplementation(() => (contextValues));

        mount(<ClientControls />).contains(`button#delete-button[disabled]`);
    })
})