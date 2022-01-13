import React , {useState , useEffect} from 'react'
// import './App.css';
import {Button , Form, Col , Row , CloseButton , Offcanvas,Toast , InputGroup , OverlayTrigger,Tooltip,Modal} from 'react-bootstrap';
// import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';
import List from '../List';
import { FontAwesomeIcon } from 'react-bootstrap-icons';
import { BsSearch } from "react-icons/bs";
import { MdDelete, MdModeEdit } from "react-icons/md";

function TodoList() {
        let initItem;
   if (localStorage.getItem("newitem")=== null){
       initItem = [];

   }else{
        initItem = JSON.parse(localStorage.getItem("newitem"));
   }
   

    const [popUp, setPopUp] = useState(false);
  
    const handlePopOut = () => setPopUp(false);
    const handlePopUp = () => setPopUp(true);
  

 
    const [show, setShow] = useState(false);

    const[item,setItem] = useState({title:"",description:"",date:""});

//  const [description , setDescription] =useState("")
    const [newitem , setNewitem] = useState(initItem);

    const [isEdititem, setIsEditItem] = useState(null);

    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [Submit, setSubmit] = useState(false);

    const [search, setSearch] = useState('')

    const addItem =() =>{
        if(item.title === "" || item.description === "" || item.date === ""){
            alert("please add data")
            
        }else if(item && !toggleSubmit){

            setNewitem(
                newitem.map((e) =>
            {
                    if(e.title === isEdititem){
                        return {...e, title:item.title , description:item.description, date: item.date}
                        
                    }
                    console.log("ediitted");
                    return e;
                
            })
            )


    localStorage.setItem("newitem", JSON.stringify(newitem))

            setToggleSubmit(true)
            setItem({title:"",description:"",date:""})
            setIsEditItem(null)
            alert("Item Updated");
        
        // setItem({title:"",description:"",date:""})
        }else{
        setNewitem([...newitem,item]);
        setItem({title:"",description:"",date:""})
        setSubmit(true)
            setPopUp(false)
        // alert("Newitem Added")
    }


    }

     const modifyItem = (title) =>{
                let newEditItem = newitem.find((e) =>{
                    return e.title === title;
                });


console.log(newEditItem);
                setToggleSubmit(false); 
                setItem(newEditItem);
                setIsEditItem(title);
                setSubmit(true)
        
                // console.log(" new object")




     } 

    const deleteItem =(title) =>{
        // console.log(id)
        const deleteData = newitem.filter((y) => {
                    return title !== y.title; 
        }) 

        setNewitem(deleteData);
        setSubmit(true)
       

    }

    const removeAll =() =>{
         setNewitem([]);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        localStorage.setItem("newitem", JSON.stringify(newitem))
        setSubmit(true)
    }, [newitem])

    return (

<div  style={{ backgroundImage: "url('./images/back1.jpg')",}}>  


            <div className='container'>
         
                <Row>
           
            {/* <i className="far fa-edit add-btn"></i> */}

            <div className='col-sm-6  mt-5 py-5'> 
            <>
      

      <Offcanvas show={show} onHide={handleClose} className="form1 bg-dark" >
        <Offcanvas.Header closeLabel='Close'>
          <Offcanvas.Title className='text-white'>ToDo Lists</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        
        { Submit && newitem.length>0?
                < div className='col-sm-12 d-flex flex-row-reverse form1   ' >
                
  {['top'].map((placement) => (
    <OverlayTrigger
      key={placement}
      placement={placement}
      overlay={
        <Tooltip id={`tooltip-${placement}`}>
         <strong>Remove All</strong>.
        </Tooltip>
      }
    >
       <CloseButton className='btn-close-white  mt-2'  onClick={removeAll}/> 
    </OverlayTrigger>
  ))}


  
     <div className="input-group">
  <div className="form-outline  ">
    <input id="search-input" type="search"  className="form-control " placeholder='Search' onChange={(e) => {setSearch(e.target.value)}} />
    
  </div>
  <Button type="button" className="btn mb-3 btn-info" >
     <BsSearch/>
  </Button>
</div> 
     </div> : null

            
            }
            {/* <Table striped bordered hover responsive> */}
  {/* <thead>
    <tr>
      <th>title</th>
      <th>description</th>
      <th>date</th>
      <th>action</th>
      <th>action</th>
    </tr>
  </thead> */}
  {/* <tbody  > */}
      {newitem.filter((e) => {
        if(search === ''){
            return e;
        }else if(e.title.toLowerCase().includes(search.toLowerCase())){
            return e; 
        }
        
      }).map((e) => {
          return(
        
            <tr key={e.title}>
                
                <Toast style={{ width: "360px"}} className=''>
  {/* <Toast.Header>  */}
    {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
    <strong className="me-auto"> List............ </strong>
     <small>11 mins ago</small> 
        s </Toast.Header> */}
    <Toast.Body > Item Name:  {e.title} <br/>
             Description: {e.description}<br/>
            Date : {e.date}<hr/>
            <td  className=''><Button type="button" style={{borderRadius: "10px", margin:"px"}} className='btn-success ' onClick={() => modifyItem(e.title)}><MdModeEdit /></Button></td> 
            <td className='px-1' ><Button type="button"style={{borderRadius: "10px", margin:"px"}}  className='btn-danger' onClick={() => deleteItem(e.title)} ><MdDelete /></Button></td>
            </Toast.Body>
        </Toast>
            {/* <td  className='' > * </td> */}
         
          </tr>
        

          )
      })}
   
    
  {/* </tbody> */}
    {/* </Table> */}
        </Offcanvas.Body>
      </Offcanvas>
    </>

                {/* <div className='col-sm-6'>

                </div> */}
             

               
                {/* <div className="bg-light p-3"> */}
                 {/* <CloseButton variant="white" /> */}
                     {/* <CloseButton variant="white" disabled /> */}
                        {/* </div> */}
                {/* <Button className=' btn-danger ' onClick={removeAll}>X</Button> */}

           
               
              {/* {  item.map((val, index) => {
                    return  <List key={index} />
                })
            }    */}
                </div>
          
                <div className='col-sm-6 mt-5 py-5 from1'> 
            <Form className='shadow-pop p-5 mb-5 rounded bg-dark  form1 '>
                {/* <h1 className="text-center mb-4"> TodoList</h1>/ */}
                <Row className=' shadow p-3 mb-4 bg-warning rounded'> 
                <div className="col-sm-4">
                <img src="/images/icon.png" alt='Todo List' className=" mr-4 p"  />
                </div>
                <div className='col-sm-6 text-dark'>
                    <h2 className='mt-2 px-1'>ToDo List</h2>
                </div>
                <div className="col-sm-2">
                <img src="/images/icon.png" alt='Todo List' className="  ml-6 px-1"  />
                </div>
                </Row>

                <Form.Group className="  align-center " >
                <div className="input-group  bg-dark mb-3">
             <span className="input-group-text">Item :</span>
             <Form.Control type="text" value={item.title} className="input bg-dark text-light"  required="required" onChange={(e) => setItem({...item,title:e.target.value})} placeholder="Add New Item" />
             </div>
             <div className="input-group mb-3">
             <span className="input-group-text ">Description :</span>
             <Form.Control type="text-area  " as="textarea" rows={3}  value={item.description} className="input-warning bg-dark text-light border border-warning"  onChange={(e) => {setItem({...item,description:e.target.value})}}placeholder="Add Description" />
           </div>
             <div className="input-group mb-3">
             <span className="input-group-text">Date :</span>
        
             <Form.Control type="date" value={item.date} className="input bg-dark text-light" onChange={(e) => {setItem({...item,date:e.target.value})}}placeholder=" Enter Date" />
              </div>
                </Form.Group>
                 <div >
                {
                    toggleSubmit ?
                <Button  style={{borderRadius: "20px", margin:"10px"}} type="button" variant="primary" onClick={handlePopUp} >Add Item</Button>  :
                 <Button  style={{borderRadius: "20px", margin:"10px"}} type="button"variant="success" onClick={addItem} >Update Item</Button>
                }
                   <Button  style={{borderRadius: "20px", margin:"10px"}} variant="primary" onClick={handleShow}>
        Read List
                 </Button> 

                 <Modal show={popUp} onHide={handlePopOut} animation={true} className='form1'>
        <Modal.Header closeButton>
          <Modal.Title>Adding New Item....</Modal.Title>
        </Modal.Header>
        <Modal.Body> You'Addding this item in a list!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePopOut}>
            Close
          </Button>
          <Button variant="primary" onClick={addItem}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

     
                 
                 {/* <button ><i className="fa fa-trash"></i></button> */}
                </div>  
                
         
                {/* <Button type="button" className='btn-success' onClick={listItem}>Add Item</Button> <hr/>   */}
                {/* <Button type="button" className='btn-danger' onClick={listItem}>Add Item</Button> */}

                
            </Form>
            </div>
                </Row>
            </div>
            </div>


    )
}

export default TodoList
