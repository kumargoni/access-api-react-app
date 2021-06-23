function reducer(state = { beers: [] }, action) {
    switch (action.type) {
        case "FETCH_BEERS":
            return {
                ...state,
                beers: action.data
            };
        default:
            return state;
    }
}
export default reducer;