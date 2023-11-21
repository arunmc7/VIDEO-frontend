import React from "react";
import { PlusCircle } from "react-feather";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { addVideo } from "../services/allapi";
//tostify used for toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add({handleRes}) {
  //to give values to server

  const [uploadData, setuploadData] = useState({
    id: "",
    caption: "",
    thumbnail: "",
    url: "",
  });

  //components taken from react bootstrap for pop up message ie body...and form

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true); //set show true so it opens...set to false for it to close

  const setInput = (e) => {
    // console.log(e.target.value);

    const { name, value } = e.target;

    //key in square bracket

    //spread operator used to get data in same line rather than getting them in different lines

    setuploadData({ ...uploadData, [name]: value });
  };

  console.log(uploadData);

  //to extract url of youtube vdio so that it plays automatically when clicked the card

  const extractUrl = (e) => {
    let youtubeUrl = e.target.value;
    if (youtubeUrl.includes("v=")) {
      let index = youtubeUrl.indexOf("v=");
      console.log(index);

      let videourl = youtubeUrl.substring(index + 2, index + 13);

      console.log(videourl);

      let videoData = uploadData;

      videoData.url = `https://www.youtube.com/embed/${videourl}`;
      //to update the state
      setuploadData(videoData);
    }

    console.log(uploadData);
  };

  //define handle add function

  const handleAdd = async () => {
    //destructure upload data state
    const { id, caption, thumbnail, url } = uploadData;

    if (!id || !caption || !thumbnail || !url) {
      toast("PLEASE FILL THE FORM COMPLETELY");
    } else {
      //make an api call to post the contents given before giving the add button
      const response = await addVideo(uploadData);

      if (response.status >= 200 && response.status < 300) {
        //RESPONSE is recieved inside data in console

          // console.log(response.data);
          
          handleRes(response.data)

        toast.success("NEW VIDEO UPLOADED SUCCESSFULLY",{position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",});
        setShow(false);
      } 
      
      else {
        toast.warn("PROVIDE A UNIQUE ID",{position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",});
      }
    }
  };

  return (
    <>
      <div onClick={handleShow}>
        <PlusCircle color="red" size={90} />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>UPLOAD VIDEO DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              className="mb-3"
              controlId="floatingId"
              label="Uploading video id"
            >
              <Form.Control
                type="text"
                placeholder="Video id"
                name="id"
                onChange={setInput}
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingCaption"
              label="Uploading video caption"
            >
              <Form.Control
                type="text"
                placeholder="Video caption"
                name="caption"
                onChange={setInput}
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingImage"
              label="Uploading video cover image url"
            >
              <Form.Control
                type="text"
                placeholder="Video cover image URL"
                name="thumbnail"
                onChange={setInput}
              />
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingLink"
              label="Uploading video Link"
            >
              <Form.Control
                type="text"
                placeholder="Video Link"
                name="url"
                onChange={extractUrl}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button onClick={handleAdd} variant="primary">
            ADD
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default Add;
