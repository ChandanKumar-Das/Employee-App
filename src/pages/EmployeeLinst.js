

import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees,deleteEmployee } from '../actions/employeeActions';
import { useNavigate } from 'react-router-dom';
import DeletePopup from '../components/DeleteEmployee';
import FullPageLoader from '../components/FullPageLoader';

const EmployeeList = () => {

    const [deletePopup, setDeletePopup] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState(null);

    const employees = useSelector((state)=> state.employee)
    const   loading = useSelector((state)=> state.loading)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(()=>{
        dispatch(fetchEmployees())
    },[dispatch])


    const handelEditClick = (employee)=>{

         navigate(`/edit/${employee._id}`, {state: employee})
    }

    const handelDeleteClick = (id)=>{
        setSelectedItemId(id)
        setDeletePopup(true)
    }
    const deleteClick = (id) =>{
        setDeletePopup(false)
        dispatch(deleteEmployee(id))
        
    }

    const handleClosePopup = () => {
        setDeletePopup(false); 
        setSelectedItemId(null);
      };

      const handelAddEmployeeClick = () =>{
        navigate("/add-employee")
      }

console.log('EmployeeData:-',employees)

    return (

        <>
        
        <div className="container mx-auto p-4">
            
            <div className='flex justify-between'>
                
            <h1 className="text-2xl font-bold mb-4">Employees List</h1>
            <button onClick={handelAddEmployeeClick} className='flex text-white items-center gap-3 px-4 py-2 bg-green-500 border'>
                <span className='text-xl font-bold '>+</span>
                <h1>add Employee</h1>
            </button>
            </div>

            {loading ? <FullPageLoader/> : employees.length ?
             (
            <table className="min-w-full mt-2 bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border">photo</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Phone</th>
                        <th className="px-4 py-2 border">Salary</th>
                        <th className="px-4 py-2 border">Age</th>
                        <th className="px-4 py-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td className="border px-4 py-2">
                            <img 
                                src={employee.image} 
                                alt={employee.fullName} 
                                className="w-20 h-16 object-cover rounded" 
                            />
                        </td>
                            <td className="border px-4 py-2">{employee.fullName}</td>
                            <td className="border px-4 py-2">{employee.email}</td>
                            <td className="border px-4 py-2">{employee.phone}</td>
                            <td className="border px-4 py-2">{employee.salary}</td>
                            <td className="border px-4 py-2">{employee.age}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={()=>handelEditClick(employee)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={()=>handelDeleteClick(employee._id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           ) :<div className='flex justify-center item-center font-bold'> No data... Add Employee</div> }
            
        </div>

      <DeletePopup show={deletePopup} onClose={handleClosePopup} onDelete={deleteClick} itemId={selectedItemId} />
        </>
        

       
    );
};

export default EmployeeList;
