const inicialState={
    isLoggedIn: false,
}

export default function auth(state = inicialState, action){
    switch(action.type){
        case "LOGIN_SUCCESS":
            return {...state, isLoggedIn:true};
        
        case "LOGOUT":
            return {...state, isLoggedIn:false}
        
        default:
            return state;
    }
}