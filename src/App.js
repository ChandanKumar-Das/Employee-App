import EmployeeList from "./pages/EmployeeLinst";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateEmployee  from "./pages/UpdateEmployee";
function App() {
  return (
  
<Router>
<Routes>
    <Route path="/" element={<EmployeeList />} />
    <Route path="/edit/:id" element={<UpdateEmployee />} />
    <Route path="/add-employee" element={<UpdateEmployee />} />
</Routes>
</Router>
  );
}

export default App;
