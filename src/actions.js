export const ADD_WALLET = 'ADD_WALLET';
export const VERIFY_WALLET = 'VERIFY_WALLET';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addWallet(address, message, type) {
    return {
        type: ADD_WALLET,
        payload: {
            address: address,
            message: message,
            type: type
        }
    }
}

export function setVisibilityFilter(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        payload: {
            filter: filter
        }
    }
}