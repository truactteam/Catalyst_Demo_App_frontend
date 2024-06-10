import { useState,useEffect } from 'react';
import { useNavigate,useParams,Redirect } from 'react-router-dom';
import axios from 'axios';
import './Forms.css';


function Forms() {
  const navigate = useNavigate();
 

  
  const [ord_date, setOrderdt] = useState(new Date());
  const [cust, setCust] = useState("");
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(0);
  const [wt, setWt] = useState(0);
  const [chk, setChk] = useState(false);
  const [custData,setCustData]=useState([]);
  const [itemData,setItemData]=useState([]);
  const [custID,setCustID] = useState(0);
  const [fetchState, setFetchState] = useState('init');
  const [itemsTable, setItemsTable] = useState([]);
  // const [image,setImage]=useState({});
//   useEffect(()=>{
//  console.log(image ,"useeffect image");
//   },[image])
 

  useEffect(()=>{
    if(cust != "")
      {
      axios.get('/server/catalyst_demo_app_function/custID',{
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        Customer_Name : cust
      }
     })
     .then((response)=>{
      console.log("success custid");
      console.log(response.data.data.custid[0].id);
      setCustID(response.data.data.custid[0].id);
      
     })
     .catch((err)=>{
      console.log(err);
     })
      }
     
  },[cust]);

  useEffect(()=>{
    if (fetchState !== 'fetched' && id!=null) {
   

    axios.get('/server/catalyst_demo_app_function/all',
    {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        ROWID : id // Assuming you want to pass the id parameter
      }
    })
    .then((response)=>{
       console.log("recipes3")
       console.log(response.data.data.orders);
       console.log(response.data.data.orders[0]);
       setOrderdt(response.data.data.orders[0].order_date);
       setCust(response.data.data.orders[0].cust);
       setItem(response.data.data.orders[0].item);
       setQty(response.data.data.orders[0].qty);
       setWt(response.data.data.orders[0].wt);
       setChk(response.data.data.orders[0].chk);
       console.log("recipes2")
       setFetchState('fetched');
      
    })
    .catch((err)=>{
      console.log("error")
      console.log(err)
    })
  }
  if(fetchState !== 'fetched')
    {
      axios.get('/server/catalyst_demo_app_function/cust',{
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ).then((response)=>{
        console.log("customers")
        console.log(response.data.data.customers)
        setCustData(response.data.data.customers)
      })
      .catch((err)=>{
        console.log(err);
      })

      axios.get('/server/catalyst_demo_app_function/items',{
        headers: {
          'Content-Type': 'application/json'
        }
      }
      ).then((response)=>{
        console.log("items")
        console.log(response.data.data.items)
        setItemData(response.data.data.items)
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    
  },[fetchState])
  
  const updateQty = (qty, index) => {
    // Create a copy of the itemsTable array
    const updatedItemsTable = [...itemsTable];
    // Update the quantity of the item at the specified index
    updatedItemsTable[index] = {
      ...updatedItemsTable[index],
      quantity: qty
    };
    // Update the state with the new array
    setItemsTable(updatedItemsTable);
  };
  

  const handleChange = (item,index)=>{
      const selectedItem = itemData.find((data) => data.item_name === item);
      if(selectedItem)
        {
          itemsTable[index].id =selectedItem.itemID;
          itemsTable[index].price = selectedItem.price;
         
        }
  }
  const handleAddItem = () => {
    // Find the selected item from the itemData array
    //const selectedItem = itemData.find((data) => data.item_name === item);
    
    // If the selected item is found, create a new item object
    // if (selectedItem) {
    //   const newItem = {
    //     id: selectedItem.itemID,
    //     item_name: selectedItem.item_name,
    //     price: selectedItem.price,
    //     quantity: 0,
    //     weight: 0,
    //     amount: 0
    //   };
  
    //   // Add the new item to the itemsTable state
    //   setItemsTable([...itemsTable, newItem]);
    // } else {
      // If no item is selected, create a new empty row
      const newItem = {
        id: '',
        item_name: '',
        price: 0,
        quantity: 0,
        weight: 0,
        amount: 0
      };
  
      // Add the new empty row to the itemsTable state
      setItemsTable([...itemsTable, newItem]);
    // }
  };
  
  
  const { id} = useParams();



  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const newData={
      
      Order_Date:ord_date,
      Customer_Name : cust,
      Item_Name : item,
      Quantity : qty,
      Weight : wt,
      Check_me : chk
    }
   
   if(!id)
    {
      let customFile = document.getElementById("imageUpload").files[0];
      let fileObj = {
        'content': customFile,
        'ord_date': ord_date,
        'cust':cust,
        'custID': custID,
        'item':item,
        'qty':qty,
        'wt':wt,
        'chk':chk
        
      }
      console.log("image before",customFile);
      console.log('ord_date',ord_date);
      console.log('cust',cust);
      console.log('custID',custID);
      console.log('item',item);
      console.log('qty',qty);
      console.log('wt',wt);
      console.log('chk',chk);
      
      
       
      console.log(fileObj,"formDATA");
      
      axios.post('/server/catalyst_demo_app_function/add', fileObj,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log("success");
        console.log(response);
        setChk(false);
        setCust("");
        setItem("");
        setOrderdt(new Date());
        setQty(0);
        setWt(0);
        setCustID(0);
        navigate('/reports')
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{

      console.log("newdata",newData);
      axios.put(`/server/catalyst_demo_app_function/${id}`,newData)
      .then((response)=>{
        console.log("update success");
        console.log(response.data.data);
        navigate('/reports');
      })
      .catch((err) => {
        console.log("update catch");
        console.log(err);
      });
    }
  };
  
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
                navigate('/items')
              }}>Item Master</a> 
              <a className="nav-link"  onClick={()=>{
                navigate('/customers')
              }}>Customers</a> 
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

      <div className="container-fluid exform d-flex justify-content-center align-items-center">
     
        <div className="form-container ">
         <h1>Order Details</h1>
          <form className="mb-3" onSubmit={handleSubmit}>
            <div className="form-group mb-3 mt-3">
              <label htmlFor="exampleInputEmail1">Order Date :</label>
              <input value={ord_date} type="date" className="form-control" id="orderDate" aria-describedby="dateHelp" placeholder="Enter Order    Date"
               onChange={(ev)=>{
                   setOrderdt(ev.target.value);
               }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputCustomer">Customer Name : </label>
              <select value={cust} id="inputCust" className="form-select" onChange={(ev)=>{
                 
                  setCust(ev.target.value);
                  
               }}>
                {custData.map((customer, index) => (
                  <option key={index} value={customer.cust}>
                    {customer.cust}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Item Name :</label>
          
              <select value={item} id="inputCust" className="form-select"  onChange={(ev)=>{
                 
                  setItem(ev.target.value);
                  
               }}>
                {itemData.map((item, index) => (
                  <option key={index} value={item.item_name}>
                    {item.item_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group mb-3">
             
            <table className="table">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Weight</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Existing Rows */}
                {/* New Row */}
                
                {
                
                itemsTable.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td><select value={item} id="inputCust" className="form-select"  onChange={(ev)=>{
                 
                 setItem(ev.target.value);
                 handleChange(ev.target.value,index);
                 
              }}>
               {itemData.map((item, index) => (
                 <option key={index} value={item.item_name}>
                   {item.item_name}
                 </option>
               ))}
             </select></td>
                    <td>{item.price}</td>
                    <td> <input  type="number" className="form-control" id="ItemQty" aria-describedby="qtyHelp" placeholder="Enter Item Quantity"
              value={item.quantity}
              onChange={(ev) => {
                // Update the quantity of the item in itemsTable state
                //item.quantity = ev.target.value;
              //itemsTable[index].quantity = ev.target.value;
              updateQty(ev.target.value,index)
              }}
              /></td>
              <td><input  type="number" className="form-control" id="ItemWt" aria-describedby="wtHelp" placeholder="Enter Item Weight"
             value={item.weight}
             onChange={(ev) => {
               // Update the weight of the item in itemsTable state
              // item.weight = ev.target.value;
             }}
              /></td>
                    <td>{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a onClick={handleAddItem}> Add New Row</a>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Quantity :</label>
              <input value={qty} type="number" className="form-control" id="ItemQty" aria-describedby="qtyHelp" placeholder="Enter Item Quantity"
               onChange={(ev)=>{
                setQty(ev.target.value);
              }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Weight :</label>
              <input value={wt} type="number" className="form-control" id="ItemWt" aria-describedby="wtHelp" placeholder="Enter Item Weight"
                 onChange={(ev)=>{
                  setWt(ev.target.value);
              }}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputImage">Upload Image:</label>
              <input
                type="file"
                className="form-control"
                id="imageUpload"
                onChange={(e) => {
                 // setImage(e.target.files[0]);     
                }
               } // Update state with selected file
                
              />
            </div>
            <div className="form-check mb-3">
              <input value={chk} type="checkbox" className="form-check-input" id="exampleCheck1"
               onClick={(ev)=>{
                setChk(ev.target.checked);
            }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">Check out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Forms;