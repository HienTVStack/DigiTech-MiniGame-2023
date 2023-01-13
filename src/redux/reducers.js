const initialState = {
    dataList: [],
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_DATA": {
            return {
                ...state,
                dataList: action.payload,
            };
        }
        default:
            return state;
    }
};

export default appReducer;
