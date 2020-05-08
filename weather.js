$(document).ready(() => {
  //Preparing local storage
  let history = JSON.parse(localStorage.getItem("city"))
  if(history) {
    apiCall(history[0])
  } else {
    var array =[];
    localStorage.setItem("city", JSON.stringify(array))
  }

  getLocalStorage();

  $("#citySumbit").click(() => {
    let city = $("#city").val();
    apiCall(city)
    });
  });


  function cityWeather(response, i) {
    return (
      `
        <div class='col-2 text-center m-1' style='border-radius: 10px; border: 1px solid white'>
          <p>${response.list[i].main.temp} F</p>
          <p>Humidity: ${response.list[i].main.humidity}</p>
          <p>Wind Speed: ${response.list[i].wind.speed} MPH</p>
        </div>
      `
    );
  }
  function saveToLocalStorage(local) {
    let currentStorage = JSON.parse(localStorage.getItem("city"))
    currentStorage.unshift(local)
    let stringifiedStorage = JSON.stringify(currentStorage);
    localStorage.setItem("city", stringifiedStorage);
    let retrievedVal = JSON.parse(localStorage.getItem("city"));
    console.log(retrievedVal);
  }
  function apiCall(city) {
    const queryURL =
    "https://api.openweathermap.org/data/2.5/forecast/?q=" +
    city +
    "&units=imperial&&appid=fa3026ffedb0a89a5f016059a673f69f";
    $.ajax({
      url: queryURL,
      method: "GET",
    })
    .then(response => {
      console.log(response);
      saveToLocalStorage(city);
      getLocalStorage();
      $("#cityName").text(`${response.city.name}, ${response.city.country}`)
      let totalChart ="";
      for(let i = 0; i < 5; i++) {
        let num = i*8 + 4;
        let chart = cityWeather(response, num);
        totalChart += chart;
      }
      $("#weatherResult").html(totalChart);
    })
    .catch(err => {
      alert("fam that is just not a city. What are you doing. Maybe it is a city but I dont understand. Pls fix ty")
    })
  }
  function getLocalStorage() {
    let retrievedVal=JSON.parse(localStorage.getItem("city"));
    let data = "";
    retrievedVal.forEach(item => {
      data += `<li>${item}</li>`;
    })
    $("#history").html(data)
  }