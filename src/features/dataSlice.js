import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    objectId: 10245,
    apiData: {}
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        increment: (state) => {
            return {...state, objectId: state.objectId + 1}
        },
        decrement: (state) => {
            return {...state, objectId: state.objectId - 1}
        },
        custom: (state, action) => {
            return {...state, objectId: action.payload}
        },
        clear: () => {
            return initialState
        },
        setData: (state, action) => {
            return {...state, apiData: action.payload}
        }
    }
})

export const {increment, decrement, custom, clear, setData} = dataSlice.actions

export const fetchData = () => {
    const dataThunk = async (dispatch, getState) => {
        let state = getState()
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}
        `);
        const resData = await response.json();
        console.log(resData);
        dispatch(setData(resData));
    }
    return dataThunk
}

export default dataSlice.reducer 

