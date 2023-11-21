import React from "react";
import Card from "react-bootstrap/Card";
import { Trash2 } from "react-feather";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Addhistory, deleteVideo } from "../services/allapi";
import {v4 as uuidv4 } from 'uuid';

//destructure props from parent
function Videocard({card,handleDeleteStatus,insideCategory}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
   
    const handleShow = async() =>{

      setShow(true)

      //to generate id automatically we use uuidv4

      const uid=uuidv4()

      console.log(uid);

      //to generate system date and time

      let cardTime=new Date()

      console.log(cardTime);

      const{caption,url}=card

      if (uid!="",caption!="",url!="",cardTime!=""){

        //when posting body should be passed

        const body={

          id:uid,cardName:caption,url,Date:cardTime

         }

        const response= await Addhistory(body)

        console.log(response);



      }




    }

    //delete fn defenition

    const removeItem=async(id)=>{

      //api call to delete specific card

        let response=await  deleteVideo(id)
        console.log(response);

        if(response.status>=200 && response.status<300){
          handleDeleteStatus(true)
        }
     
    }

    const dragStarted=(e,id)=>{

      console.log('drag started and source card id='+id);

      //default method to transfer the data when dragged---format is given on basis of id

      e.dataTransfer.setData("cardId",id)

    }

  return (
    <>
      <div>
        <Card  draggable onDragStart={e=>dragStarted(e,card?.id)} 
         className="shadow">
          <Card.Img onClick={handleShow} variant="top" height={'200px'} src={card?.thumbnail} />
          <Card.Body>
            <Card.Title>
                <span>{card?.caption}</span>

                {

                  insideCategory?"":

                  <Trash2 onClick={()=>removeItem(card?.id)} color="red" style={{float:'right'}}/> 

                }
                
            </Card.Title>
          </Card.Body>
        </Card>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Video caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width={"100%"} height={"400px"} src={`${card?.url}?autoplay=1`} title="Neela Nilave - Video Song | RDX | Kapil Kapilan | Sam CS | Shane Nigam,Antony Varghese,Neeraj Madhav" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </Modal.Body>
      
      </Modal>

      </div>
    </>
  );
}

export default Videocard;
