
export const login = (name, token) => (dispatch, getState) => {
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    dispatch({
        type: 'LOGIN',
        payload: {
            name,
            token
        }
    })
}

export const logout = () => (dispatch, getState) => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    return dispatch({
        type: 'LOGOUT'
    })
}