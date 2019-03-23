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
            loggedState: true,
            userName: action.payload.Name,
            token: action.payload._token,
            session: action.payload.Access,
            isAdmin: action.payload.isAdmin
        }

        case 'USR_LOGOUT':
        return {
            loggedState: false,
            userName: '',
            token: '',
            session: 0
        }
        }
    return state;
}