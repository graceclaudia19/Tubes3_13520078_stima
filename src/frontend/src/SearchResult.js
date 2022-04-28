import { useState } from "react";
import './styles/SearchResult.css';
import BlogList from "./SearchList";
import axios from "axios"

const SearchResult = () => {

  const [response, setResponse] = useState([]);
  const [date, setDate] = useState("");
  const [disease, setDisease] = useState("");
  const [validated, setValidated] = useState(true);
  const [empty,setEmpty] = useState(true);
  const [warningText, setWarningText] = useState("");
  const URL = "https://dna-matching-be.herokuapp.com";

  function addZero(s) {
    return (s.length < 2 ? '0' : '') + s
  }
  function getDateWord(s,map){
    return s.length > 3 ? s : map.get(s)
  }


  function readUsingRegex(s){
    const DATE_SLASH = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/
    const DATE_STRIP = /^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-]\d{4}$/
    const DATE_SPACE = /^(0?[1-9]|[12][0-9]|3[01])[\s](0?[1-9]|1[012])[\s]\d{4}$/
    const DATE_MONTH_SLASH = /^(0?[1-9]|[12][0-9]|3[01])[/](Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)[/]\d{4}$/
    const DATE_MONTH_STRIP = /^(0?[1-9]|[12][0-9]|3[01])[-](Jan(uary)?|Feb(ruari)?|Mar(et)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)[-]\d{4}$/
    const DATE_MONTH_SPACE = /^(0?[1-9]|[12][0-9]|3[01])[\s](Jan(uary)?|Feb(ruari)?|Mar(et)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)[\s]\d{4}$/
    
    const DATE_SLASH_DISEASE = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}[\s][A-Za-z\s0-9-]+$/
    const DATE_STRIP_DISEASE = /^(0?[1-9]|[12][0-9]|3[01])[-](0?[1-9]|1[012])[-]\d{4}[\s][A-Za-z\s0-9-]+$/
    const DATE_SPACE_DISEASE = /^(0?[1-9]|[12][0-9]|3[01])[\s](0?[1-9]|1[012])[\s]\d{4}[\s][A-Za-z\s0-9-]+$/
    const DATE_MONTH_SLASH_DISEASE = /^(0?[1-9]|[12][0-9]|3[01])[/](Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)[/]\d{4}[\s][A-Za-z\s0-9-]+$/
    const DATE_MONTH_STRIP_DISEASE = /^(0?[1-9]|[12][0-9]|3[01])[-](Jan(uary)?|Feb(ruari)?|Mar(et)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)[-]\d{4}[\s][A-Za-z\s0-9-]+$/
    const DATE_MONTH_SPACE_DISEASE = /^(0?[1-9]|[12][0-9]|3[01])[\s](Jan(uary)?|Feb(ruari)?|Mar(et)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)[\s]\d{4}[\s][A-Za-z\s0-9-]+$/
    
    const DISEASE_ONLY = /^[A-Za-z\s0-9-]+$/s

    var date = ""
    var disease = ""
    var map = new Map()
    map.set('01', 'January')
    map.set('02', 'February')
    map.set('03', 'March')
    map.set('04', 'April')
    map.set('05', 'May')
    map.set('06', 'June')
    map.set('07', 'July')
    map.set('08', 'August')
    map.set('09', 'September')
    map.set('10', 'October')
    map.set('11', 'November')
    map.set('12', 'December')
    map.set('Jan', 'January')
    map.set('Feb', 'February')
    map.set('Mar', 'March')
    map.set('Apr', 'April')
    map.set('May', 'May')
    map.set('Jun', 'June')
    map.set('Jul', 'July')
    map.set('Aug', 'August')
    map.set('Sep', 'September')
    map.set('Oct', 'October')
    map.set('Nov', 'November')
    map.set('Dec', 'December')
    
    //anggepan bener dulu + termasuk kosong, di else nanti disalahin kalau ga nemu pattern apapun
    setValidated(true)
    if(s !==""){
      setEmpty(false)
      if (DATE_SLASH.test(s)){
          console.log("DATE_SLASH")
          var temp = s.split('/')
          date = addZero(temp[0]) + '-' + map.get(addZero(temp[1])) + '-' + temp[2]
      } else if (DATE_STRIP.test(s)){
          console.log("DATE_STRIP")
          temp = s.split('-')
          date = addZero(temp[0]) + '-' + map.get(addZero(temp[1])) + '-' + temp[2]
      } else if (DATE_SPACE.test(s)){
          console.log("DATE_SPACE")
          temp = s.split(' ')
          date = addZero(temp[0]) + '-' + map.get(addZero(temp[1])) + '-' + temp[2]
      } 
      
      else if (DATE_MONTH_SLASH.test(s)){
          console.log("DATE_MONTH_SLASH")
          temp = s.split('/')
          date = addZero(temp[0]) + '-' + getDateWord(temp[1],map) + '-' + temp[2]
      } else if (DATE_MONTH_STRIP.test(s)){
          console.log("DATE_MONTH_STRIP")
          temp = s.split('-')
          date = addZero(temp[0]) + '-' + getDateWord(temp[1],map) + '-' + temp[2]
      } else if (DATE_MONTH_SPACE.test(s)){
          console.log("DATE_MONTH_SPACE")
          temp = s.split(' ')
          date = addZero(temp[0]) + '-' + getDateWord(temp[1],map) + '-' + temp[2]
      } 
      
      else if(DATE_SLASH_DISEASE.test(s)){
          console.log("DATE_SLASH_DISEASE")
          temp = s.split(' ')
          var tempDate = temp[0].split('/')
          var tempDisease = temp.slice(1,temp.length).join(' ')
          date = addZero(tempDate[0]) + '-' + map.get(addZero(tempDate[1])) + '-' + tempDate[2]
          disease = tempDisease
      } else if(DATE_STRIP_DISEASE.test(s)){
          console.log("DATE_STRIP_DISEASE")
          temp = s.split(' ')
          tempDate = temp[0].split('-')
          tempDisease = temp.slice(1,temp.length).join(' ')
          date = addZero(tempDate[0]) + '-' + map.get(addZero(tempDate[1])) + '-' + tempDate[2]
          disease = tempDisease
      } else if(DATE_SPACE_DISEASE.test(s)){
          console.log("DATE_SPACE_DISEASE")
          temp = s.split(' ')
          tempDisease = temp.slice(3,temp.length).join(' ')
          date = addZero(temp[0]) + '-' + map.get(addZero(temp[1])) + '-' + temp[2]
          disease = tempDisease
      }
      
      else if (DATE_MONTH_SLASH_DISEASE.test(s)){
          console.log("DATE_MONTH_SLASH_DISEASE")
          temp = s.split(' ')
          tempDate = temp[0].split('/')
          tempDisease = temp.slice(1,temp.length).join(' ')
          date = addZero(tempDate[0]) + '-' + getDateWord(tempDate[1],map) + '-' + tempDate[2]
          disease = tempDisease
      } else if (DATE_MONTH_STRIP_DISEASE.test(s)){
          console.log("DATE_MONTH_STRIP_DISEASE")
          temp = s.split(' ')
          tempDate = temp[0].split('-')
          tempDisease = temp.slice(1,temp.length).join(' ')
          date = addZero(tempDate[0]) + '-' + getDateWord(tempDate[1],map) + '-' + tempDate[2]
          disease = tempDisease
      } else if (DATE_MONTH_SPACE_DISEASE.test(s)){
          console.log("DATE_MONTH_SPACE_DISEASE")
          temp = s.split(' ')
          tempDisease = temp.slice(3,temp.length).join(' ')
          date = addZero(temp[0]) + '-' + getDateWord(temp[1],map) + '-' + temp[2]
          disease = tempDisease
      } else if(DISEASE_ONLY.test(s)){
          console.log("DISEASE_ONLY")
          disease = s
      }
      else{
          console.log("NOTHING MATCH!!!!!")
          setValidated(false)
      }
    } else{
      setEmpty(true)
    }
    
    console.log(date)
    console.log(disease)

    if (validated){
      setDate(date)
      setDisease(disease.toLowerCase())
    }
  }

  const sendRequest = () => {
      const datas = {
        date: date,
        diseaseprediction: disease,
      }

      if (validated){
        if (empty){
          setWarningText("Showing all records without filter")
        } else{
          setWarningText("Valid Input")
        }
        axios(
          {
            // mode: 'cors',
            method: "post",
            url: URL + "/userRecord/get",
            data : datas,
          }
        ).then(function(res) {
          console.log(res);
          setResponse(res.data.data.data)
        }).catch(function(err) {
          console.log(err.message);
        })
      } else{
        setWarningText("Invalid Input")
        setResponse([])
      }


      // invalid input : ttp panggil axios, keluar no result
      // valid input : kelaur result / no result
      // no data : masukin semua
      // mgkn klo "invalid input because empty query, showing all data without filter"
  }

  return (
    <div className="contentSearch">
    <div className="search-result">

      <div className="up">
        <div className="up-left">
        <h1>Test Result</h1>
        </div>
        <div className="up-right">
          <form id="searchTest">
          <label for="exampleInputEmail1">Search query by date and disease</label>
          <div className="formInput">
                  <input type="text" class="form-control" id="exampleInputEmail1"  placeholder=""
                    required
                    onChange={(e) => readUsingRegex(e.target.value)}
                  ></input>
          <button type="button" class="btn btn-light" onClick={sendRequest}>Search</button>
          </div>
          <p>example: 13 April 2022 HIV / 13 April 2022 / HIV</p>
          <p>{warningText}</p>
          </form>
        </div>
      </div>
      <div className="blur">
      <div className="search">
        <BlogList blogs={response} />
      </div>
    </div>
    </div>
    </div>
  );
}
 
export default SearchResult;