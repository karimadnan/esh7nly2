const initialState = {
    loggedState: '',
    userName: '',
    token: '',
    session: ''
}

export default function(state = initialState, action){
    
    switch(action.type){
        case 'USR_LOGIN':
        return { 
            loggedState: true,
            userName: action.payload.Name,
            token: action.payload._token,
            session: action.payload.Access
        }

        case 'USR_LOGOUT':
        return {
            loggedState: false,
            userName: null,
            token: null,
            session: null
        }
        break;
        }
    return state;
}