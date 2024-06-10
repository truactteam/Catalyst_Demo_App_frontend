import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Reports.css'; // Import CSS file for styling

function Reports() {
    const [fetchState, setFetchState] = useState('init');
    const [array, setArray] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        if (fetchState !== 'fetched') {
            console.log("in Report");
            axios.get('/server/catalyst_demo_app_function/all')
            .then((response) => {
                console.log("recipes1")
                console.log(response.data.data.orders);
                setArray(response.data.data.orders);
                console.log("recipes2")
                setFetchState('fetched');
            })
            .catch((err) => {
                console.log("error")
                console.log(err)
            })
        }
    }, [fetchState])

    // Function to handle edit click
    const handleEdit = (id) => {
        // Navigate to Forms component with parameter
        navigate(`/forms/${id}`);
    }

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg bg-body-tertiary topclass">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            <a className="nav-link" href="#">About Us</a>
                            <a className="nav-link"  onClick={()=>{
                             navigate('/customers')
                          }}>Customers</a>
                           <a className="nav-link"  onClick={()=>{
                                navigate('/items')
                            }}>Item Master</a> 
                          <a className="nav-link"  onClick={()=>{
                         navigate('/signup')
                      }}>SignUp</a>
                      <a className="nav-link"  onClick={()=>{
                         navigate('/login')
                      }}>Log in</a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <h1>Report</h1>
            </div>
            <div className='container-fluid'>
                {array && array.length > 0 ? (
                    <table className="table-custom">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>ID</th>
                                <th>Item</th>
                                <th>Order Date</th>
                                <th>Quantity</th>
                                <th>Weight</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {array.map((item, index) => (
                                <tr key={item.id} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{item.cust}</td>
                                    <td>{item.id}</td>
                                    <td>{item.item}</td>
                                    <td>{item.order_date}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.wt}</td>
                                    <td>
                                        <span className="action-icon" onClick={() => handleEdit(item.id)}>Edit</span>
                                        <span className="action-icon"  onClick={()=>{
                                            axios
                                            .delete(`/server/catalyst_demo_app_function/${item.id}`) 
                                            .then((res)=>{
                                                console.log("inside then delete");
                                                console.log(res);   
                                                setFetchState("init");
                                            })
                                            .catch((err)=>{
                                                console.log("inside catch delete");
                                                console.log(err);
                                            })
                  }}>Delete</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default Reports;
