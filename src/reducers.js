import { VisibilityFilters, SET_VISIBILITY_FILTER, ADD_WALLET } from './actions';

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  wallets: []
};

export default function walletOwnershipValidatorApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.payload.filter
      }

    case ADD_WALLET:
      return {
        ...state,
        wallets: [
          ...state.wallets,
          { ...action.payload, validated: false }
        ]
      }

    default:
      return state;
  }
};

