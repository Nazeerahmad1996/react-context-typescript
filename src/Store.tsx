import React from 'react'

interface IStore {
    episodes: Array<any>,
    favorites: Array<any>
}
interface IAction {
    type: string,
    payload: any
}
const inittialState: IStore = {
    episodes: [],
    favorites: []
}

export const Store = React.createContext<IStore | any>(inittialState)

function reducer(state: IStore, action: IAction): IStore {
    switch (action.type) {
        case "FETCH_DATA":
            return { ...state, episodes: action.payload }
        case "ADD_FAV":
            return { ...state, favorites: [...state.favorites, action.payload] }
        case "REMOVE_FAV":
            return { ...state, favorites: [...action.payload] }
        default:
            return state
    }
}

export function StoreProvider(props: any): JSX.Element {
    const [state, dispatch] = React.useReducer(reducer, inittialState)
    return <Store.Provider value={{ state, dispatch }}>{props.children}</Store.Provider>
}