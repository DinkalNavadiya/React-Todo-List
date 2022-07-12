import React, { useState , useEffect } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

const getLocalItems = () =>{
    let lists = localStorage.getItem('list');
    console.log(lists);

    if(lists){
        return JSON.parse(localStorage.getItem('list'));
    }else{
        return[];
    }
}

const App = () =>{
    const[inputData , setInputData] = useState('');
    const[Items , setItems] = useState(getLocalItems());
    const[toggleSubmit , setToggleSubmit] = useState(true);
    const[isEditItem , setIsEditItem] = useState(null);

    const addItems = () =>{
        if(!inputData){
            alert("Please!! Fill the Data 😠")
        }else if(inputData && !toggleSubmit){
            setItems(
                Items.map((elem) =>{
                    if(elem.id === isEditItem)  {
                        return{...elem, name:inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);

        setInputData('');

        setIsEditItem(null); 
        }
        else{
        const allInputData = { id: new Date().getTime().toString(), name:inputData }
         setItems([...Items,allInputData]);
         setInputData('');

        }
    }

    const deleteItems = (index) =>{        
        const updateditems = Items.filter((elem) =>{
            return index !== elem.id;
        });
        setItems(updateditems);
    }

    const deleteAll = () =>{
        toast("Delete All");
        setItems([]);

    }

    useEffect(() =>{
          localStorage.setItem('list' , JSON.stringify(Items));
    } ,[Items] )

    const editItems = (id) =>{
        const newEditItems = Items.find((elem)=>{
            return elem.id === id;
        });
        console.log(newEditItems);

        setToggleSubmit(false);

        setInputData(newEditItems.name);

        setIsEditItem(id); 
    }

     return(
         <>
             <div>
             <div className="main-div">
                <div className="center_div">
                    <figure>
                        <figcaption className="text">Add Your List Here   </figcaption>
                    </figure>

                    <div>
                        <input type='text' placeholder="Add Items..  " id="" className="field" value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
                        {
                            toggleSubmit ? <AddCircleIcon onClick={addItems} /> : <EditIcon className="edit" onClick={addItems}/>

                        }
                    </div>

                    <div className=" ShowItems ">
                    {
                        Items.map((elem)=>{
                            return(
                                
                                    <div className="eachItems" key={elem.id }>
                                        <h3>  <DeleteIcon className="delete" onClick={() => deleteItems(elem.id)}/><EditIcon className="edit" onClick={() => editItems(elem.id)}/>{elem.name }  </h3>
                                    </div>
                            )
                        })
                    }
                    </div>

                    <div className="ShowItems">
                        <button className="DeleteAll" onClick={deleteAll}>DeleteAll</button>
                    </div>

                </div>
            </div>
             </div>


         </>
     )
}

export default App;