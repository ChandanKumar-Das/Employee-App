import {GET_EMPLOYEES_DATA, DELETE_EMPLOYEE_DATA, ADD_EMPLOYEE,GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE, SET_LOADING,STOP_LOADING  } from '../actions/employeeActions'

const initialState = {
    employee: [],
    currentEmployee: [],
    loading: false,
}

const employeeReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_EMPLOYEES_DATA:
            return {
                ...state,
                employee: action.payload,
            };
        
        case ADD_EMPLOYEE:
            return {
                ...state, 
                employee: [...state.employee, action.payload],
                loading: false,
                
            };

        case DELETE_EMPLOYEE_DATA:
        return {
            ...state,
            employee: state.employee.filter((user) => user.id !== action.payload),
            loading: false,
        };

        case GET_EMPLOYEE_BY_ID:   
        return {
            ...state,
            currentEmployee: action.payload.data,
            loading: false,
        };

        case UPDATE_EMPLOYEE:   
        return {
            ...state,
            employee: state.employee.map((user) => user.id === action.payload.userId ? { ...user, ...action.payload.data } : user),
            loading: false,
        };

        case SET_LOADING:
        return {
            ...state,
            loading: true,
        };
        case STOP_LOADING:
        return {
            ...state,
            loading: false,
        };

        default:
            return state;    
    }
}

export default employeeReducer;