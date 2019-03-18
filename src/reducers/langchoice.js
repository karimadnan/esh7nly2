const initialState = {
    lang: 'EN'
}

export default function(state = initialState, action){
    
    switch(action.type){
            case 'UPDATE_LANG': {
                return {
                      lang: action.payload
                }
            }
        }
                
    return state;
}