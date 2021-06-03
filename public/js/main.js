const cityName = document.querySelector('#cityName');
const submitBtn = document.querySelector('#submitBtn');
const msg = document.getElementById('msg');
const msg2 = document.getElementById('msg2');
const msg3 = document.getElementById('msg3');
const msg4 = document.getElementById('msg4');

const tempStatus = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const dataHide = document.querySelectorAll('.status_layer');

const today = document.getElementById('day');
const dateToday = document.getElementById('date');
const AQIStatus = document.getElementById('aqi_status');
const AQIIcon = document.getElementById('aqi_icon');


const dot1 = document.getElementById('dot1');
const dot2 = document.getElementById('dot2');
const dot3 = document.getElementById('dot3');
const dot4 = document.getElementById('dot4');
const dot5 = document.getElementById('dot5');


const airComp = document.getElementById('air_comp');
const other = document.getElementById('other');

const co = document.getElementById('co');
const no = document.getElementById('no');
const no2 = document.getElementById('no2');
const o3 = document.getElementById('o3');
const so2 = document.getElementById('so2');
const pm10 = document.getElementById('pm10');
const nh3 = document.getElementById('nh3');


const windSpeed = document.getElementById('windSpeed');
const visibility = document.getElementById('visibility');
const pressure = document.getElementById('pressure');
const humidity = document.getElementById('humidity');

const city__temp = document.getElementById('city__temp');

const btnUp = document.querySelector('.unit_change_btn_up');
const btnDown = document.querySelector('.unit_change_btn_down');
const unit = document.querySelector('.unit');

const superScript = document.getElementById('superScript');

let latitude;
let longitude;
let tempreature;
let far;
let kel;

let units = ['C', 'F', 'K'];
let activeUnit = units[0];

function init() {

    const currentDay = () => {
        let weekDay = new Array(7);
        weekDay[0] = "Sunday";
        weekDay[1] = "Monday";
        weekDay[2] = "Tuesday";
        weekDay[3] = "Wednesday";
        weekDay[4] = "Thursday";
        weekDay[5] = "Friday";
        weekDay[6] = "Saturday";
        let currentTime = new Date();
        return (weekDay[currentTime.getDay()]);
    };

    today.innerHTML = currentDay();

    const getCurrentTime = () => {

        var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let now = new Date();
        let monthNumber = now.getMonth() + 1;
        let date = now.getDate();
        const finalString = `${date} ${months[monthNumber - 1]}`;


        return finalString;
    };

    dateToday.innerHTML = getCurrentTime();
    airComp.style.height = "31rem";
    other.style.height = "31rem";
    // setInterval(getCurrentTime, 1000);

}

document.addEventListener('DOMContentLoaded', init);

const getTempInfo = async(event) => {
    event.preventDefault();
    let cityNameValue = cityName.value;
    if (cityNameValue.length == 0 || cityNameValue === "") {
        msg.innerHTML = `Enter a Valid City Name`;
        msg2.innerHTML = `Enter a Valid City Name`;
        msg3.innerHTML = `Enter a Valid City Name`;
        msg4.innerHTML = `Enter a Valid City Name`;
        for (let i = 0; i < dataHide.length; i++) {
            dataHide[i].classList.add('data_hide');
        }
        airComp.style.height = "31rem";
        other.style.height = "31rem";

    } else {
        try {

            // btnDown.addEventListener('click', changeUnitDown);
            dot1.style.background = "#fff";
            dot2.style.background = "#fff";
            dot3.style.background = "#fff";
            dot4.style.background = "#fff";
            dot5.style.background = "#fff";
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&units=metric&appid=8e46ce41d5da30f0ad8d420142bd4205`;

            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            city__temp.innerHTML = `${arrData[0].main.temp}`;
            unit.innerHTML = `<sup id="superscript">o</sup>C`;
            tempreature = arrData[0].main.temp;
            far = far = ((9 / 5) * tempreature) + 32;
            kel = tempreature + 273.15;
            far = far.toFixed(2);
            kel = kel.toFixed(2);

            let tempStatus2 = arrData[0].weather[0].main;
            msg.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            msg2.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            msg3.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;
            msg4.innerHTML = `${arrData[0].name}, ${arrData[0].sys.country}`;

            if (tempStatus2 == "Clear") {
                tempStatus.innerHTML = "<i class='fas fa-sun' aria-hidden='true' style='color: #eccc68'></i>";
            } else if (tempStatus2 == "Clouds") {
                tempStatus.innerHTML = "<i class='fas fa-cloud' aria-hidden='true' style='color: #f1f2f6'></i>";
            } else if (tempStatus2 == "Rain") {
                tempStatus.innerHTML = "<i class='fas fa-cloud-rain' aria-hidden='true' style='color: #a4b0be'></i>";
            } else {
                tempStatus.innerHTML = "<i class='fas fa-cloud' aria-hidden='true' style='color: #f1f2f6'></i>";
            }

            let AQIUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${arrData[0].coord.lat}&lon=${arrData[0].coord.lon}&appid=8e46ce41d5da30f0ad8d420142bd4205`;
            latitude = `${arrData[0].coord.lat}`;
            longitude = `${arrData[0].coord.lon}`;

            const AQIResponse = await fetch(AQIUrl);
            const AQIData = await AQIResponse.json();
            const AQIArrData = [AQIData];
            let AQIGrade = AQIArrData[0].list[0].main.aqi;

            if (AQIGrade == 1) {
                AQIStatus.innerHTML = "Good";
                AQIIcon.innerHTML = `<i class="far fa-laugh" style="color: #f1f2f6;"></i>`;
                dot1.style.background = "#51ff0d";

            } else if (AQIGrade == 2) {
                AQIStatus.innerHTML = "Fair";
                AQIIcon.innerHTML = `<i class="fas fa-smile" style="color: #f1f2f6;"></i>`;
                dot1.style.background = "#9ff107";
                dot2.style.background = "#9ff107";
            } else if (AQIGrade == 3) {
                AQIStatus.innerHTML = "Moderate";
                AQIIcon.innerHTML = `<i class="far fa-meh" style="color: #f1f2f6;"></i>`;
                dot1.style.background = "#eded0e";
                dot2.style.background = "#eded0e";
                dot3.style.background = "#eded0e";
            } else if (AQIGrade == 4) {
                AQIStatus.innerHTML = "Unhealthy";
                AQIIcon.innerHTML = `<i class="far fa-flushed" style="color: #f1f2f6;"></i>`;
                dot1.style.background = "#edb126";
                dot2.style.background = "#edb126";
                dot3.style.background = "#edb126";
                dot4.style.background = "#edb126";

            } else {
                AQIStatus.innerHTML = "Hazardous";
                AQIIcon.innerHTML = `<i class="fas fa-grimace" style="color: #f1f2f6;"></i>`;
                dot1.style.background = "#f02913";
                dot2.style.background = "#f02913";
                dot3.style.background = "#f02913";
                dot4.style.background = "#f02913";
                dot5.style.background = "#f02913";
            }


            co.innerHTML = `${AQIArrData[0].list[0].components.co}`;
            no.innerHTML = `${AQIArrData[0].list[0].components.no}`;
            no2.innerHTML = `${AQIArrData[0].list[0].components.no2}`;
            o3.innerHTML = `${AQIArrData[0].list[0].components.o3}`;
            so2.innerHTML = `${AQIArrData[0].list[0].components.so2}`;
            pm10.innerHTML = `${AQIArrData[0].list[0].components.pm10}`;
            nh3.innerHTML = `${AQIArrData[0].list[0].components.nh3}`;

            for (let i = 0; i < dataHide.length; i++) {
                dataHide[i].classList.remove('data_hide');
            }
            airComp.style.height = "auto";
            other.style.height = "auto";


            windSpeed.innerHTML = `${arrData[0].wind.speed}`;
            visibility.innerHTML = `${arrData[0].visibility}`;
            pressure.innerHTML = `${arrData[0].main.pressure}`;
            humidity.innerHTML = `${arrData[0].main.humidity}`;



        } catch {
            msg.innerHTML = `Enter a Valid City Name`;
            msg2.innerHTML = `Enter a Valid City Name`;
            msg3.innerHTML = `Enter a Valid City Name`;
            msg4.innerHTML = `Enter a Valid City Name`;
            for (let i = 0; i < dataHide.length; i++) {
                dataHide[i].classList.add('data_hide');
            }
            airComp.style.height = "31rem";
            other.style.height = "31rem";
        }

    }
};
submitBtn.addEventListener('click', getTempInfo);
btnUp.addEventListener('click', changeUnitUp);
btnDown.addEventListener('click', changeUnitDown);


function changeUnitUp() {
    if (activeUnit == 'C') {
        convertKelvinToCelsius(2);
        unit.innerHTML = `K`;
        activeUnit = 'K';
    } else if (activeUnit == 'F') {
        convertCelsiusToFarheneit(2);
        unit.innerHTML = `<sup id="superscript">o</sup>C`;
        activeUnit = "C";
    } else {
        convertFarToKelvin(2);
        unit.innerHTML = `<sup id="superscript">o</sup>F`;
        activeUnit = 'F';
    }
}

function changeUnitDown() {
    if (activeUnit == 'C') {
        convertCelsiusToFarheneit(1);
        unit.innerHTML = `<sup id="superscript">o</sup>F`;
        activeUnit = 'F';
    } else if (activeUnit == 'F') {
        convertFarToKelvin(1);
        unit.innerHTML = `K`;
        activeUnit = "K";
    } else {
        convertKelvinToCelsius(1);
        unit.innerHTML = `<sup id="superscript">o</sup>C`;
        activeUnit = 'C';
    }
}

function convertCelsiusToFarheneit(query) {
    if (query == 1) {
        city__temp.innerHTML = `${far}`;
    } else {
        city__temp.innerHTML = `${tempreature}`;
    }
}

function convertFarToKelvin(query) {
    if (query == 1) {
        city__temp.innerHTML = `${kel}`;
    } else {
        city__temp.innerHTML = `${far}`;
    }
}

function convertKelvinToCelsius(query) {
    if (query == 1) {
        city__temp.innerHTML = `${tempreature}`;
    } else {
        city__temp.innerHTML = `${kel}`;
    }
}