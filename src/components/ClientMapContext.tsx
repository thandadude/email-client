import React, { createContext, useReducer, useContext } from 'react'
import { ClientMailMapState, initialState, reducer } from './ClientMailMapState'
import {MapActions} from './Interface'
type Props = {
    children: React.ReactNode;
  };
  
const initialMapContext: { mapState: ClientMailMapState; setMapState: React.Dispatch<MapActions> } = {
    mapState: initialState,
    // will update to the reducer we provide in MapProvider
    setMapState: () => {}
  };
  
  // Export for test
 export const ClientMapContext = createContext(initialMapContext);
  

  export function ClientMapProvider({ children }: Props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // rename the useReducer result to something more useful
    const mapState = state;
    const setMapState = dispatch;
  
    // pass the state and reducer to the context, dont forget to wrap the children
    return <ClientMapContext.Provider value={{ mapState, setMapState }}>{children}</ClientMapContext.Provider>;
  }

  export const useMapState = () => useContext(ClientMapContext);