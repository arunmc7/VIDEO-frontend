import React, { useEffect } from "react";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";



//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  addCategory,
  deleteCategory,
  getVideos,
  getallCategories,
  updateCategory,
} from "../services/allapi";
import { Columns, Trash2 } from "react-feather";
import { Col, Row } from "react-bootstrap";
import Videocard from "./Videocard";

function Category() {
  //for getting all categories and displaying
  const [allCategory, setallCategory] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for category adding

  const [categoryItem, setcategoryItem] = useState({
    id: "",
    name: "",
    allVideos: [],
  });

  const addcategoryForm = (e) => {
    const { name, value } = e.target;

    setcategoryItem({ ...categoryItem, [name]: value });
  };

  console.log(categoryItem);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    //destructure object

    const { id, name } = categoryItem;

    if (!id || !name) {
      toast.warn("PLEASE FILL THE FORM COMPLETELY");
    } else {
      let response = await addCategory(categoryItem);
      toast.success("CATEGORY ADDED SUCCESFULLY");
      console.log(response);
      getcategoryList();
      setShow(false);
    }
  };

  //to get all categories

  const getcategoryList = async () => {
    const response = await getallCategories();
    console.log(response.data);
    setallCategory(response.data);
  };

  //when page is loaded the data shoould be viewed , so useEffect snippet used

  useEffect(() => {
    getcategoryList();
  }, []);

  // console.log(allCategory);
  //fn to handle deleting items

  const handleDeletecategory = async (e, id) => {
    e.preventDefault();
    console.log(id);
    //call api for deleting
    await deleteCategory(id);
    //not to refresh and delete the specific category
    getcategoryList();
  };

  const dragover = (e) => {
    e.preventDefault();
    console.log("dragging over the category board!!!");
  };

  const dropped = async (e, categoryId) => {
    console.log(categoryId);

    let sourceCardId = e.dataTransfer.getData("cardId");

    console.log("source card id:", sourceCardId);

    //logic to implement addinng card in the given category

    let { data } = await getVideos(sourceCardId);

    //  console.log(response);

    console.log("source video data:", data);

    let selectedCategory = allCategory.find((item) => item.id == categoryId);

    console.log("target category details", selectedCategory);

    selectedCategory.allVideos.push(data);

    console.log("updated target category details", selectedCategory);

    await updateCategory(categoryId, selectedCategory);

    getcategoryList();
  };

  return (
    <>
      <div className="d-grid">
        <div onClick={handleShow} className="btn btn-dark m-2">
          ADD CATEGORY
        </div>

        {/* a item from js is brought into jsx so start with a curly bracket */}

        {allCategory?.map((item) => (
          <div
            droppable
            onDragOver={(e) => dragover(e)}
            //to identify the event that is dropped

            onDrop={(e) => dropped(e, item?.id)}
            className="d-flex justify-content-between border rounded mt-2 p-3"
          >
            <h4>{item.name}</h4>
            <span onClick={(e) => handleDeletecategory(e, item?.id)}>
              <Trash2 color="red" />
            </span>

            <div>
              <Row>
                {item?.allVideos.map((card) => (
                  <Col className="p-3 mb-1 " sm={12}>
                    <Videocard card={card}  insideCategory={true} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>ADD CATEGORY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className="mb-3" controlId="floatingLink" label="Id">
            <Form.Control
              type="text"
              name="id"
              onChange={addcategoryForm}
              placeholder="Id"
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-3"
            controlId="floatingLink"
            label="category"
          >
            <Form.Control
              type="text"
              name="name"
              onChange={addcategoryForm}
              placeholder="category"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">
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

export default Category;
