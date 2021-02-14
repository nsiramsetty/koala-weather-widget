import {STORAGE_KEY} from "./state";

const localStoragePlugin = store => {
    store.subscribe((mutation, state) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        if (mutation.type === "CLEAR_ALL_DATA") {
            console.log("Clear Data.");
        }
    });
};

export default [localStoragePlugin];
