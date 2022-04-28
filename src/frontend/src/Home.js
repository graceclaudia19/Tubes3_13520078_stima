//import libs
import { useState, useEffect } from 'react';

// import components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import banner from './assets/1.png'
import './styles/Home.css'

// const ORIGINAL_LINES = ["DNA-Matching"];
const DESCRIPTION_LINES = [
  "DNA-Matching is a program to analyze DNA given by user to determine the disease, similar to the DNA. Besides, you can also input new pattern to DNA with various diseases."
]

const totalChars = DESCRIPTION_LINES.reduce(
  (chars, line) => chars + line.length,
  0
);

function promiseDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPartialLines(lines, charCount) {
  const copiedLines = [];
  let remainingChars = charCount;
  for (const line of lines) {
    if (remainingChars <= line.length) {
      copiedLines.push(line.slice(0, remainingChars));
      break;
    }
    remainingChars -= line.length;
    copiedLines.push(line);
  }
  return copiedLines;
}


const Home = () => {
  const [lines, setLines] = useState([""]);

  useEffect(() => {
    async function doTyping() {
      for (let typedChars = 0; typedChars <= totalChars; typedChars++) {
        await promiseDelay(25);
        setLines(getPartialLines(DESCRIPTION_LINES, typedChars));
      }
    }
    doTyping();
  }, []);

  return (
    <div className="home">
      <Row className="content">
        <Col xs lg="4">
          <span id = "first_landing_text" ></span> <br/>
          <span id = "second_landing_text"></span>
            {lines.map((line, _) => (
            <p>
              {line}
            </p>
          ))}
        </Col>
        <Col xs lg="3">
        <img src={banner} alt="Banner"/>
        </Col>
      </Row>
    </div>
  );
}
 
export default Home;