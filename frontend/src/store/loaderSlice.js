import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name : 'loader',
    initialState : {  loading : false },
    reducers : {
        setLoading(state,action){
            state.loading = action.payload
        },
    }
});

export const loaderAction = loaderSlice.actions;
export default loaderSlice.reducer;