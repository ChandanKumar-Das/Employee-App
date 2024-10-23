import axios from 'axios';

export const GET_EMPLOYEES_DATA = 'GET_EMPLOYEES_DATA';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const DELETE_EMPLOYEE_DATA = 'DELETE_EMPLOYEE_DATA';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const GET_EMPLOYEE_BY_ID = 'GET_EMPLOYEE_BY_ID';

export const SET_LOADING = 'SET_LOADING';
export const STOP_LOADING = 'STOP_LOADING';


const API_URL = 'https://interviewtesting.onrender.com/v1/users'; 

export const fetchEmployees = () => async (dispatch) => {
    //console.log('fetchdata')
    dispatch(setLoading());
    try {
        const response = await axios.get(API_URL+'/employee/list');
        //console.log('data', response.data.data)
        let employeeData = response.data.data
        dispatch({ type: GET_EMPLOYEES_DATA, payload: employeeData  });
    } catch (error) {
        console.error('Error fetching employees', error);
    }finally {
    dispatch(stopLoading());  
}


};

export const addEmployee = (employee) => async (dispatch)=> {

    try{
        //console.log(employee)
        const response = await axios.post(API_URL+'/employee/create', employee)
        console.log(response)
        let addEmployeeData = response.data
        dispatch({ type:ADD_EMPLOYEE, payload: addEmployeeData})
        //dispatch(fetchEmployees())
        //return addEmployeeData
    }catch(error){
        console.log(error)
        alert('Email alredy exist')
    }
}

export const updateEmployee = (id,employee) => async (dispatch) =>{
    try{
        const response = await axios.put(API_URL+`/employee-update/${id}`,employee )
        console.log(response)
        let updateEmployeeData = response.data
        console.log('updateEmployeeData:-' , updateEmployeeData)
        dispatch({ type:ADD_EMPLOYEE,  payload: updateEmployeeData,})
        //dispatch(fetchEmployees())
        //return updateEmployeeData;
    }catch(error){
        console.log(error)
        alert('Email alredy exist')
    }
}

export const getEmployeeById = (id) => async (dispatch)=>{
    dispatch(setLoading());
    try{
        const response = await axios.get(API_URL+`/employee/${id}`)
        console.log(response)
        let showEmployee = response.data
        dispatch({ type:GET_EMPLOYEE_BY_ID, payload: showEmployee})

    }catch(error){
        console.log(error)
    }
    finally{
       dispatch(stopLoading());
    }
}

export const deleteEmployee = (id) => async (dispatch) =>{
    try {
        const response = await axios.delete(API_URL+"/employee-remove/"+id );
        //console.log('data', response.data.data)
        let deleteEmployeeData = response.data.data
        dispatch({ type: DELETE_EMPLOYEE_DATA, payload: deleteEmployeeData  });
        dispatch(fetchEmployees())
    } catch (error) {
        console.error('Error fetching employees', error);
    }
}

export const setLoading = () => ({ type: SET_LOADING });
export const stopLoading = () => ({ type: STOP_LOADING });










