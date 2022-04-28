import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal';

import { useState } from 'react'
import axios from "axios"

import './styles/TestDisease.css'
const TestDisease = () => {
   const [name, setName] = useState("")
   const [disease , setDisease] = useState("")
   const [dnaSequence, setDnaSequence] = useState("")
   const [status, setStatus] = useState("")
   const [similarity, setSimilarity] = useState("")
   const [warning] = useState("")
   const [resultShow, setResultShow] = useState(false)
   const [modalShow, setModalShow] = useState(false);
   const [emptyModalShow, setEmptyModalShow] = useState(false);
   const [methodTest,setMethodTest] = useState(-1)
   const URL = "https://dna-matching-be.herokuapp.com"

   const readFile = (e) => {
    setResultShow(false)
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const regex = new RegExp(/^[ATCG]+$/);
      if (regex.test(text)) {
        setDnaSequence(text);
      }else{
        document.getElementById("diseaseTest").reset() 
        setModalShow(true);
      }
    };
    reader.readAsText(e.target.files[0]);
  };

    const sendRequest = () => {
      setResultShow(false)
      console.log("dnaseq",dnaSequence)
      // TODO: Handle kalo udh kekirim ini ttp muncul ato gausa samsek gasi? @ pat
      if (disease === "" || name === "" || disease === null || name === null || methodTest === -1) {
          setEmptyModalShow(true)
      }
      else{
        console.log("OKAY")
        
        const datas = {
          name: name,
          dnasequence : dnaSequence,
          diseasename : disease.toLowerCase(),
          method : methodTest,
        }
        console.log(datas)
          axios(
            {
              method: "post",
              url: URL + "/userRecord",
              data : datas,
            }
          ).then(function(res) {
            console.log(res)
            console.log(res.data.data.data)
            console.log(res.data.data.data.similarity + " hello")
            setStatus(res.data.data.data.predictionstatus)
            if (!res.data.data.data.similarity){
              setSimilarity("0")
            }
            else{
              setSimilarity(Math.round((res.data.data.data.similarity + Number.EPSILON) * 100) / 100)
            }
            setResultShow(true)
          }).catch(function(err) {
            console.log(err.message);
          })
      }
    }

    function EmptyModal(props) {
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

    function Result(props){
      var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var today = new Date();
      var date = day[today.getDay()] + ", " + today.getDate() + " " + month[(today.getMonth() + 1)] + " " + today.getFullYear();
      if (resultShow){
        if (similarity <0){
          return(
            <div className='right'>
              <h2>Disease sequence unknown, please add the disease in the 'Input New Disease' menu</h2>
            </div>
          )
        }else{
          return(
            <div className='right'>
            <h3>{date}</h3>
            <h2 style={{wordBreak:"break-word"}}>{name} - {disease}</h2>
            <h3>Result:</h3>
            <h1>{status.toString()} - {similarity}%</h1>
            <p>We use KMP and Booyer-More to determine whether your DNA is similar to certain disease or not.</p>
            </div>
          );
        }}else{
        return(
          <div className='right'>

          </div>
        );
      }
    }

    function handleNameChange(e){
      setResultShow(false)
      setName(e.target.value)
    }

    function handleDiseaseChange(e){
      setResultShow(false)
      setDisease(e.target.value)
    }

    return (
      <div className="test">
      <Row className="content">
        <Col xs lg="6">
        <div className='left'>
        <h1 id="h1"> DNA Test</h1>
          <div className = "form">
              <form id="diseaseTest">
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"  placeholder=""
                    onChange = {handleNameChange}
                    required
                  ></input>
                </div>
                <div class="form-group">
                  <label class="form-label" for="customFile">DNA Sequence</label>
                  <input type="file" class="form-control" id="customFile" accept='.txt'
                    onChange={readFile}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Disease Prediction</label>
                  <input type="text" class="form-control" id="exampleInputEmail1"  placeholder=""
                    onChange = {handleDiseaseChange}
                    required
                  ></input>
                </div>
                <div class="form-check">
                  <div>
                    <input type="radio" name="exampleRadios" class="form-check-input" id="exampleRadios1" onChange={() => {
                      setResultShow(false)
                      setMethodTest(true)
                    }}required/> 
                    <label class="form-check-label" for="exampleRadios1">KMP method </label>
                  </div>
                  <div>
                    <input type="radio" name="exampleRadios" class="form-check-input" id="exampleRadios2" onChange={()=>{
                      setResultShow(false)
                      setMethodTest(false)
                    }}required/>
                    <label class="form-check-label" for="exampleRadios2">Boyer-moore Method</label>
                  </div>
                </div>
                <button type="button" class="btn btn-light"
                  onClick={() => sendRequest()}
                >Run DNA Test</button>
                <p>{warning}</p>
              </form>
            </div>
          </div>
        </Col>
        <Col xs lg="3">
          <Result/>
        </Col>
      </Row>
      <ErrorModal show={modalShow} onHide={() => setModalShow(false)}/>
      <EmptyModal show={emptyModalShow} onHide={() => setEmptyModalShow(false)}/>
    </div>
    );
  }

   
  export default TestDisease;