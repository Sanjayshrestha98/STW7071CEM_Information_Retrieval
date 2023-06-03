import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the state
interface SearchState {
    keyword: string;
}

// Define the initial state
const initialState: SearchState = {
    keyword: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setKeyword(state, action: PayloadAction<string>) {
            state.keyword = action.payload;
        },
    },
})

// Export the action
export const { setKeyword } = searchSlice.actions;
export default searchSlice.reducer;
