import React from 'react';
import App from '../App';
import { shallow } from 'enzyme';
import { Container } from 'react-bootstrap';
import { reducer, initialState } from '../components/ClientMailMapState'
import { eMailActionTypes } from '../components/Interface';

describe('try rendering it without any issues', () => {
    it('try rendering it without any issues', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find(Container).length).toEqual(1);
    }),
    it('should set error if data received does not contains account', () => {
        const state = {
            ...initialState
        }
        const newState = reducer(state, { type: eMailActionTypes.SET_MAILS, payload: { accounts: [] } })
        expect(newState.error).toBeTruthy();
    })
})




