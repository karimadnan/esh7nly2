const initialState = {
    loggedState: false,
    userName: '',
    token: '',
    session: ''
}

export default function(state = initialState, action){
    
    switch(action.type){
        case 'USR_LOGIN':
        return {
            ...state,
            loggedState: true,
            userName: action.payload.Name,
            photo: action.payload.Photo,
            token: action.payload._token,
            session: action.payload.Access,
            isAdmin: action.payload.isAdmin
        }
        case 'USR_LOGOUT':
        return {
            ...state,
            loggedState: false,
            userName: '',
            photo: '',
            token: '',
            session: 0
        }
        default: 
            return state;
        }
        
    return state;
}