export const ADD_MESSAGE = ({commit}, message) => {
    commit("ADD_MESSAGE", message);
};

export const CLEAR_ALL_DATA = ({commit}) => {
    commit("CLEAR_ALL_DATA");
};
