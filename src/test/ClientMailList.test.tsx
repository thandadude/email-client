import React from 'react';
import { shallow } from 'enzyme';
import ClientMailList from '../components/ClientMailList';
import { initialState } from '../components/ClientMailMapState';
import { OutlookFolderFilters } from '../components/exports';
import * as MapProvider from '../components/ClientMapContext'

describe("test mail list component", () => {
    it("should display all mails in the selected folder", () => {
        const contextValues = {
            mapState: {
                ...initialState,
                selectedFolder: OutlookFolderFilters.eTrash,
                userSpam: ["test-mail-1", "test-mail-2", "test-mail-3"],
                
            },
            setMapState: () => { }
        };
        jest.spyOn(MapProvider, "useMapState").mockImplementation(() => (contextValues));

        const wrapper = shallow(<ClientMailList />)
        expect(wrapper.find('[data-testid="mail-list-item"]')).toHaveLength(3);
    })
})