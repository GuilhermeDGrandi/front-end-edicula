const inicialState={
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null,
    isLoggedIn: !!localStorage.getItem('token')
}


export default function auth(state = inicialState, action){
    switch(action.type){
        case "LOGUIN_REQUEST":
            return{
                ...state,
                loading:true,
                error: null,
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoggedIn:true,
                token:action.payload.token,
                user:action.payload.user,
                error: null,
            };
        case "LOGIN_FAILURE":
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        
        case "LOGOUT":
            return {
                ...state, 
                isLoggedIn:false,
                error: action.payload.error,
            }
        
        default:
            return state;
    }
}