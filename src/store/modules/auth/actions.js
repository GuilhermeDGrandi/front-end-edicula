export const loginRequest = (email, password) =>({
    type: 'LOGIN_REQUEST',
    payload:{email, password}
})

export const loginSuccess = (token, user) => ({
    type: 'LOGIN_SUCCESS',
    payload: {token, user},
})

export const loginFailure = (error) => ({
    type:'LOGIN_FAILURE',
    payload: {error}
})