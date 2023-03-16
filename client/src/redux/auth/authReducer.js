let token = localStorage.getItem('token') || '';
let name = localStorage.getItem('name') || '';
let isAuth = (token) ? true : false;
let defaultData = {
    isAuth,
    name,
    token
}

const authReducer = (state = defaultData, action) => {
    if(action.type === 'LOGIN'){
        return {
            ...state,
            isAuth: true,
            name: action.payload.name,
            token: action.payload.token
        }
    }else if(action.type === 'LOGOUT'){
        return {
            ...state,
            isAuth: false,
            name: '',
            token: ''
        }
    }
    return state;
}

export default authReducer;