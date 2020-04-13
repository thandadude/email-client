import React from 'react';
import ClientFolders from '../components/ClientFolders';
import { shallow } from 'enzyme';
import { OutlookFolderList } from '../components/exports';

describe(('renders side bar correctly'), () => {

    it('should render list of folders', () => {
        //const folderList =
        const wrapper = shallow(<div>
            {OutlookFolderList.map((folder) => (<div key={folder}>{folder}</div>))}

        </div>);
        expect(wrapper).toMatchSnapshot();
    });

    it('should have a compose button', () => {

        const wrapper = shallow(<ClientFolders/>)
        //There should be only one button
        expect(wrapper.find('Button')).toHaveLength(1);

        

        //Button should have matching text
        expect(wrapper.find('Button').text()).toEqual('Compose');
    });
})

