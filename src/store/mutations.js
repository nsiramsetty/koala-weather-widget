import {initialState} from "./initial-state";

export const ADD_MESSAGE = (state, message) => {
    state.messages.push(message);
};

export const CLEAR_ALL_DATA = (state) => {
    state.messages = initialState.messages;
};
