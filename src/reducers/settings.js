const initialState = {
    mode: "dark"
}

export default function(state = initialState, action){
    
    switch(action.type){
        case 'SWT_MODE':
        return {
            ...state,
            mode: action.payload,
        }

        default: 
            return state;
        }
}