const countries = require('../data.json');

const arrayRegExp = [
    new RegExp(/^x=\d+,y=\d+$/),
    new RegExp(/^y=\d+,x=\d+$/),
    new RegExp(/^x=\d+$/),
    new RegExp(/^y=\d+$/)
];

const coordsForm = document.querySelector("#coordsForm");

coordsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const coordinatesString = event.target[0].value
    if (isStingValid(coordinatesString)) {
        const parsedCoordinates = parseCoordsFromString(coordinatesString);
        findClosestCountry(parsedCoordinates);
    } else {
        document.querySelector("#user-info").innerHTML = 'Invalid coordinates were entered!';
    }
});


const parseCoordsFromString = (coordinatesString) => {
    const point = {
        x: 0,
        y: 0
    };
    const splitCoords = coordinatesString.split(',');
    splitCoords.forEach(el => {
        let xOrYValue = el.split('=');
        point[xOrYValue[0]] = xOrYValue[1];
    });
    return point;

};

const isStingValid = (enteredString) => {
    let isStringValid = false;
    arrayRegExp.forEach(reg => {
        if (reg.test(enteredString)) {
            isStringValid = true;
        }
    });

    return isStringValid;
};

const findClosestCountry = (coords) => {
    let minDistToCountry = '';
    let minDist = distanceCalculating(coords.x, coords.y, countries[0]);
    countries.forEach(element => {
        const distanceToCurrentCountry = distanceCalculating(coords.x, coords.y, element);
        if (minDist >= distanceToCurrentCountry) {
            minDist = distanceToCurrentCountry;
            minDistToCountry = element.country;
        }
    });
    document.querySelector("#user-info").innerHTML = 'Your closest country is: <b>' + minDistToCountry + '</b>';
};

const distanceCalculating = (x, y, countryLocation) => {
    const xPoint = Math.pow(x - countryLocation.x, 2);
    const yPoint = Math.pow(y - countryLocation.y, 2);
    const res = Math.sqrt(xPoint + yPoint).toFixed(1);
    return res;
};