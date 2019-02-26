const initialState = {
    Ccode: "None yet"
}

export default function(state = initialState, action){
    
    switch(action.type){
        case 'CODE_SET':
        return { 
            Ccode: action.payload
        }
        }
    return state;
}