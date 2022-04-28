import './styles/InputDisease.css';
import { useState } from "react"
import axios from "axios";
import React from 'react';
import Modal from 'react-bootstrap/Modal';

const InputDisease = () => {

  const [diseaseName, setDiseaseName] = useState("");
  const [dnaSequence, setDnaSequence] = useState("");
  const URL = "https://dna-matching.herokuapp.com";
  const [modalShow, setModalShow] = useState(false);
  const [modalSuccessShow, setModalSucessShow] = useState(false);
  const [emptyModalShow, setEmptyModalShow] = useState(false);

  const readFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const regex = new RegExp(/^[ATCG]+$/);
      if (regex.test(text)) {
        setDnaSequence(text);
      }else{
        document.getElementById("diseaseForm").reset() 
        setModalShow(true);
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  const sendRequest = () => {
    const datas = {
      name: diseaseName.toLowerCase(),
      dnasequence: dnaSequence, 
    }
    if (diseaseName === "" || dnaSequence === "") {
      console.log("Please fill in all the fields")
      setEmptyModalShow(true);
    }
    else{
      axios({
        method: "post",
        url: URL + "/disease",
        data: datas,
      }).then(function(res) {
        setModalSucessShow(true);
        console.log(res);
      }).catch(function(err) {
        console.log(err.message);
      })
    }
  }

  function EmptyErrorModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className = 'modal-text'>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className = 'modal-text'>
          <h5>Please fill all required fields!</h5>
        </Modal.Body>
      </Modal>
    );
  }
  

  function ErrorModal(props) {
    // @nelsen TODO: add decoration to modal using css
    // add color and size
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className = 'modal-text'>
            {/* Modal heading */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className = 'modal-text'>
          <h4 >Error Sequence of DNA</h4>
          <p>
            DNA sequence must only contain A, T, C, and G with no lower case letters, no symbols, and no whitespaces.
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  function SuccessModal(props){
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className = 'modal-text'>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className = 'modal-text'>
          <h5>New Disease Input Succeeded!</h5>
        </Modal.Body>
      </Modal>
    );
  }

  // @nelsen TODO: add modal if input to db successfully
    return (
      <div className="input">
        <h1>Input New Disease</h1>
        <div class="first-circle"></div>
        <div className = "form">
        <form id="diseaseForm">
          <div class="form-group">
            <label for="NewDiseaseName">Name</label>
            <input type="text" class="form-control" id="NewDiseaseName" placeholder=""
              onChange={(e) => setDiseaseName(e.target.value)}
              required
            ></input>
          </div>
          <div class="form-group">
            <label class="form-label" for="customFile">DNA Sequence</label>
            <input type="file" class="form-control" id="DNASequence" accept=".txt"
              onChange={readFile}
            required/>
          </div>
          <button type="submit" class="btn btn-light" onClick={(e) => {e.preventDefault(); sendRequest()}}>Input Disease</button>
          <div class="second-circle"></div>
          <ErrorModal show={modalShow} onHide={() => setModalShow(false)}/>
          <SuccessModal show={modalSuccessShow} onHide={() => setModalSucessShow(false)}/>
          <EmptyErrorModal show={emptyModalShow} onHide={() => setEmptyModalShow(false)}/>
        </form>
        </div>
      </div>
    );
  }
   
  export default InputDisease;