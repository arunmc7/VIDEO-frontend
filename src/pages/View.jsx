import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import { getVideo } from '../services/allapi'
import { useEffect } from 'react'




function View({serverRes}) {

  const [allVideos,setallVideos]=useState([])

  const[deleteStatus,setdeleteStatus]=useState(false)

  const getallVideos=async()=>{
    //get video api fn called
    let response= await getVideo()
   
    
    //use setallVideos to update to the state

    setallVideos(response.data)

    //getallvideo fn is defined but not called in onclick or anytg...so the fn is called when the page is loaded...for that the useEffect hook is used

  }

  console.log(allVideos);

  //useEffect snippet is used

  useEffect(() => {
    //call the fn
    getallVideos()

    //third removed so that when once loaded the content is showed
  
  }, [serverRes,deleteStatus])

  const handleDeleteStatus=(res)=>{

    setdeleteStatus(res)

  }
  




  return (
    <div className='border p-3 rounded'>

      <Row>
       {
        allVideos.map(video=>(

          <Col className='ps-3 mb-3' sm={12} md={6}>
        {/* data can be shared from parent to child using props */}
        <Videocard card={video} handleDeleteStatus={handleDeleteStatus}/>
        </Col>

        ))
       
       
        
        }
      </Row>


    </div>
  )
}

export default View