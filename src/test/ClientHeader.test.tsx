import React from 'react';
import { initialState } from '../components/ClientMailMapState'
import * as ClientMapProvider from '../components/ClientMapContext'
import ClientHeader from '../components/ClientHeader';
import { mount } from 'enzyme';

describe(('it should render header correctly'), () => {
    const accountName = 'Apbs';
    it('should render drop down with selected account', () => {
        const contextValues = {
            mapState: {
                ...initialState,
                selectedAccount: {
                    name: accountName,
                    address: 'apbs@sdf.com'
                }
            },
            setMapState: () => { }
        };
        jest.spyOn(ClientMapProvider, "useMapState").mockImplementation(() => (contextValues));
        const wrapper = mount(<ClientHeader />)
        expect(wrapper.find('button.dropdown-toggle.btn#accountDropDown').text()).toBe(accountName);
    }),
    it("should display No Accounts if there is no selected account", () => {
        const contextValues = {
            mapState: {
                ...initialState,
            },
            setMapState: () => { }
        };
        jest.spyOn(ClientMapProvider, "useMapState").mockImplementation(() => (contextValues));
        const wrapper = mount(<ClientHeader />)
        expect(wrapper.find('button.dropdown-toggle.btn#accountDropDown').text()).toBe('No Accounts');

    })
})