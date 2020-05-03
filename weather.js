$(document).ready(() => {
  $("#citySumbit").click(() => {
    let city = $("#city").val();

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
      $("#cityName").text(`${response.city.name}, ${response.city.country}`)
      let totalChart ="";
      for(let i = 0; i < 5; i++) {
        let num = i*8 + 4;
        let chart = cityWeather(response, num);
        totalChart += chart;
      }
      $("#weatherResult").html(totalChart);
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
});
// "http://api.openweathermap.org/data/2.5/uvi/forecast?q=" +
// city +
// "&lat=" +
// lat +
// "&lon" +
// lon +
// "units=imperial&appid=fa3026ffedb0a89a5f016059a673f69f"
// let lat = city.coord.lat;
// let lon = city.coord.lon;
  