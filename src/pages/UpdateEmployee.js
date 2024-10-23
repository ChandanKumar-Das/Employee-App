import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee,updateEmployee, getEmployeeById } from '../actions/employeeActions';

const UpdateEmployee = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        image: "",
        age: "",
        salary: "",   
    });


    const {id} = useParams()

    const dispatch = useDispatch();

    const location = useLocation();

    const [errors, setErrors] = useState({});

    const navigate = useNavigate()


    const employee = useSelector((state) => state.currentEmployee)
    const loading = useSelector((state)=> state.loading)

    useEffect(() => {
        if (id) {
            dispatch(getEmployeeById(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (employee && id) {
        
        
                setFormData({
                    fullName: employee.fullName || "",
                    email: employee.email || "",
                    phone: employee.phone || "",
                    image: employee.image || "",
                    age: employee.age || "",
                    salary: employee.salary || "",
                });
            
        }
    }, [id, employee]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        let errors = {};

        if (!formData.fullName) {
            errors.fullName = "Full Name is required";
        }

        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData.phone) {
            errors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Phone number is invalid";
        }

        if (!formData.age) {
            errors.age = "Age is required";
        } else if (formData.age <= 0) {
            errors.age = "Age must be a positive number";
        }

        if (!formData.salary) {
            errors.salary = "Salary is required";
        } else if (formData.salary <= 0) {
            errors.salary = "Salary must be a positive number";
        }

        if (!formData.image) {
            errors.image = "Image URL is required";
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            //console.log("Form submitted successfully", formData);
            setErrors({});
            
            if(!id){
                dispatch(addEmployee(formData))
                setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    image: "",
                    age: "",
                    salary: "",
            })
            navigate('/')
            }else{
                dispatch(updateEmployee(id,formData))  
                navigate('/')
            }
           
        }
    };

   console.log(loading)



    return (
        <div className="container mx-auto p-4">

          
            <h1 className="text-2xl font-bold mb-4">{location.pathname === "/add-employee" ? 'Add Employee':'Update Employee'}</h1>
            {loading ? (<div className="flex justify-center item-center">Lodaing....</div>):
            (
            <div>
            <div className="text-xl flex justify-center font-bold">{formData.fullName}</div>
            <div className="flex justify-center"> {formData.image ? <img className="w-[100px]" src={formData.image} alt="my_photo"/>:''}</div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder={errors.fullName || "Enter full name"}
                        className={`w-full px-3 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={errors.email || "Enter email"}
                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={errors.phone || "Enter phone number"}
                        className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder={errors.age || "Enter age"}
                        className={`w-full px-3 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Salary</label>
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        placeholder={errors.salary || "Enter salary"}
                        className={`w-full px-3 py-2 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder={errors.image || "Enter image URL"}
                        className={`w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded`}
                    />
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                {location.pathname === "/add-employee" ? 'Add Employee':'Update Employee'}
                </button>
            </form>
            </div>
               
               )}
            
        </div>
    );
};

export default UpdateEmployee;
