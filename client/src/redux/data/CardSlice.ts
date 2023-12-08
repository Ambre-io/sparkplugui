import {CardType} from "../../utils/types";
import {constants} from "../../utils/constants";
import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";


export let initCardSlice: CardType = {
    // [constants.cards.softCard]: true,
    [constants.cards.informationCard]: true,
    [constants.cards.messagesCard]: true,
    [constants.cards.treeCard]: true,
    [constants.cards.lastMessagesCard]: true,
};

const cardSlice = createSlice({
    name: constants.cardSlice,
    initialState: initCardSlice,
    reducers: {
        setCard: (state: any, action: PayloadAction<CardType>) => {
            Object.assign(state, action.payload);
        },
    },
});

// Export action
export const {setCard} = cardSlice.actions;

// Export value access (useSelector)
export const getCard = (state: RootState): CardType => state.cardSlice;

// Export reducer as default for the store
export default cardSlice.reducer;
