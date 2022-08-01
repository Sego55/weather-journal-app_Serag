/* Global Variables */
let zipcode;
let feeeling;
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
///////////////////////////////////////////////////////////////////////////
                        /*Get DATA from API*/
///////////////////////////////////////////////////////////////////////////
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const APIKey = '&appid=66c093f5170688ed0e6402f7243b9902';

const getWeather = async(baseURL,zipcode,APIKey)=>{
  const res = await fetch(baseURL+zipcode+APIKey);
  try{
    const data = await res.json();
    postData('/add', {zipCode: zipcode,
    feeling: feeling,
    date: newDate,
    temp: (data.main.temp-273).toFixed(1),Country:data.sys.country,City:data.name});
  }
  catch(error){
    console.log('error',error);
    alert("Error 404 : ZipCode Not Found!");
  }
}
///////////////////////////////////////////////////////////////////////////

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',GenResponse);

function GenResponse(e){
  zipcode = document.getElementById('zip').value;
  feeling = document.getElementById('feelings').value;
  getWeather(baseURL,zipcode,APIKey);
}
///////////////////////////////////////////////////////////////////////////

/* Async Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      updateUI();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

/*Async Function to update UI*/

const updateUI = async () => {
  const request = await fetch('/all');
  try{
    var allData = await request.json();
    let i = allData.date.length - 1 ;
    document.getElementById('date').innerHTML  =  allData.date[i];
    document.getElementById('temp').innerHTML  =  allData.temp[i] +'   °C';
    document.getElementById('content').innerHTML  = allData.feeling[i];
    document.getElementById('Country').innerHTML  = allData.Country[i];
    document.getElementById('City').innerHTML  = allData.City[i];
  }
  catch(error){
    console.log("error", error);
  }
}