//list of IANA timezone Names: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones

const zoneLocal = "local";

const clockLocal = {
    secondHand: document.querySelector('.clockLocal .second-hand'),
    minuteHand: document.querySelector('.clockLocal .minute-hand'),
    hourHand: document.querySelector('.clockLocal .hour-hand'),
    timeZoneDisplay: document.querySelector('.clockLocalContainer .timeZoneDisplay'),
    zoneDate: document.querySelector('.clockLocalContainer .timeZoneDate'),
    midDayIndicator: document.querySelector('.clockLocal .midDayIndicator')
}

const clockB = {
    secondHand: document.querySelector('.clockB .second-hand'),
    minuteHand: document.querySelector('.clockB .minute-hand'),
    hourHand: document.querySelector('.clockB .hour-hand'),
    midDayIndicator: document.querySelector('.clockB .midDayIndicator')
}

const clockC = {
    hourHand: document.querySelector('.clockC .hour-hand')
}

const clockD = {
    minuteHand: document.querySelector('.clockD .minute-hand')
}

const clockE = {
    secondHand: document.querySelector('.clockE .second-hand')
}

const clockF = {
    millisecondHand: document.querySelector('.clockF .millisecond-hand')
}

const zoneUTC = 0;

const zoneNYC = -4;
const clockNYC = {
    secondHand: document.querySelector('.clockNYC .second-hand'),
    minuteHand: document.querySelector('.clockNYC .minute-hand'),
    hourHand: document.querySelector('.clockNYC .hour-hand'),
    zoneDate: document.querySelector('.clockNYCContainer .timeZoneDate'),
    midDayIndicator: document.querySelector('.clockNYC .midDayIndicator')
}

const zoneLosAngeles = -7;
const clockLosAngeles = {
    secondHand: document.querySelector('.clockLosAngeles .second-hand'),
    minuteHand: document.querySelector('.clockLosAngeles .minute-hand'),
    hourHand: document.querySelector('.clockLosAngeles .hour-hand'),
    zoneDate: document.querySelector('.clockLosAngelesContainer .timeZoneDate'),
    midDayIndicator: document.querySelector('.clockLosAngeles .midDayIndicator')
}

const zoneHongKong = 8;
const clockHongKong = {
    secondHand: document.querySelector('.clockHongKong .second-hand'),
    minuteHand: document.querySelector('.clockHongKong .minute-hand'),
    hourHand: document.querySelector('.clockHongKong .hour-hand'),
    zoneDate: document.querySelector('.clockHongKongContainer .timeZoneDate'),
    midDayIndicator: document.querySelector('.clockHongKong .midDayIndicator')
}

const zoneLondon = 1;
const clockLondon = {
    secondHand: document.querySelector('.clockLondon .second-hand'),
    minuteHand: document.querySelector('.clockLondon .minute-hand'),
    hourHand: document.querySelector('.clockLondon .hour-hand'),
    zoneDate: document.querySelector('.clockLondonContainer .timeZoneDate'),
    midDayIndicator: document.querySelector('.clockLondon .midDayIndicator')
}

function setDate(clock, zone) {
    let millisecondHand = clock.millisecondHand;
    let secondHand = clock.secondHand;
    let minuteHand = clock.minuteHand;
    let hourHand = clock.hourHand;
    let timeZoneDisplay = clock.timeZoneDisplay;
    let zoneDate = clock.zoneDate;
    let midDayIndicator = clock.midDayIndicator;

    let timeZoneHours = zone;

    //variable for local datestamp object
    const timeLocal = new Date();
    //if timeZone given is "local"
    if (timeZoneHours === "local") {
        //sets calculatedTime to timeLocal
        calculatedTime = timeLocal;
    }
    //if timeZone given is a number
    else {
        //sets calculatedTime to UTC time, then adds the timezone difference
        calculatedTime = new Date(
            timeLocal.getUTCFullYear(),
            timeLocal.getUTCMonth(),
            timeLocal.getUTCDate(),
            timeLocal.getUTCHours() + timeZoneHours,
            timeLocal.getUTCMinutes(),
            timeLocal.getUTCSeconds(),
            timeLocal.getUTCMilliseconds()
        );
    }

    // --TIME RETRIEVAL--
    //retrieves seconds from datestamp
    let milliseconds = calculatedTime.getMilliseconds();
    //retrieves seconds from datestamp
    let seconds = calculatedTime.getSeconds();
    //retrieves minutes from datestamp
    let minute = calculatedTime.getMinutes();
    //retrieves hours from datestamp
    let hour = calculatedTime.getHours();
    //retrieves seconds from datestamp

    // --DEGREES--
    //Ex: 30 seconds -> 270 degrees
    //variable for milliseconds converted to degrees of rotation
    let millisecondsDegrees = ((milliseconds / 1000) * 360) + 90;
    //variable for seconds converted to degrees of rotation
    let secondsDegrees = ((seconds / 60) * 360) + 90;
    //variable for minutes converted to degrees of rotation
    let minuteDegrees = ((minute / 60) * 360) + ((seconds / 60) * 6) + 90;
    //variable for hours converted to degrees of rotation
    let hourDegrees = ((hour / 12) * 360) + ((minute / 60) * 30) + 90;

    // --ROTATION--
    //applies 'transform:rotate' styling to millisecond-hand based on the number of degrees calculated from the milliseconds
    if (millisecondHand != undefined) {
        millisecondHand.style.transform = `rotate(${millisecondsDegrees}deg)`;
    }
    //applies 'transform:rotate' styling to second-hand based on the number of degrees calculated from the seconds
    if (secondHand != undefined) {
        secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    }
    //applies 'transform:rotate' styling to minute-hand based on the number of degrees calculated from the minutes
    if (minuteHand != undefined) {
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    }
    //applies 'transform:rotate' styling to hour-hand based on the number of degrees calculated from the hours
    if (hourHand != undefined) {
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    // --TIME ZONE--
    if (timeZoneDisplay != undefined) {
        timeZoneDisplay.innerText = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    // --DAY OF WEEK--
    if (zoneDate != undefined) {
        zoneDate.innerText = new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(calculatedTime);
    }

    //--MIDDAY INDICATOR--
    if (midDayIndicator != undefined) {
        if (calculatedTime.getHours() < 12) {
            midDayIndicator.innerText = "AM";
        } else {
            midDayIndicator.innerText = "PM";
        }
    }
}

//Repeats setDate() every 1000milliseconds, or 1 second
//setInterval() needs "anonymous" function in order to run a function that has parameters
setInterval(function () {
    setDate(clockLocal, zoneLocal);
    // setDate(clockB, zoneLocal);
    setDate(clockC, zoneLocal);
    setDate(clockD, zoneLocal);
    setDate(clockE, zoneLocal);
    setDate(clockF, zoneLocal);
    setDate(clockNYC, zoneNYC);
    setDate(clockLosAngeles, zoneLosAngeles);
    setDate(clockHongKong, zoneHongKong);
    setDate(clockLondon, zoneLondon);
}, 1);

//runs the setDate() function on load, so there isn't a one-second delay before the clock works
setDate(clockLocal, zoneLocal);
setDate(clockC, zoneLocal);
setDate(clockD, zoneLocal);
setDate(clockE, zoneLocal);
setDate(clockF, zoneLocal);
setDate(clockNYC, zoneNYC);
setDate(clockLosAngeles, zoneLosAngeles);
setDate(clockHongKong, zoneHongKong);
setDate(clockLondon, zoneLondon);


// function millisecondsCalc(milliseconds) {
//     let millisecondsDegrees = ((milliseconds / 1000) * 360) + 90;
//     return millisecondsDegrees;
// }


// NOTE FROM DEV: Getting the timezone for a custom date is a Pain in the Ass in JavaScript! Commented out portion below is evidence.
//  ^Continued: Intl.DateTimeFormat().resolvedOptions().timeZone only reads from the browser.
//  ^Continued: .toLocaleString() can return a string for custom dates, but it's a string, not an object with properties. -_-
//  ^Continued: Just type it in manually for now. Can use Intl.DateTimeFormat().resolvedOptions().timeZone to read local timezone at least

// let testDate = new Date();

// let testDate2 = new Date();
// testDate2.setHours(8);

//IntlNamespace.DateTimeFormatMethod.resolvedOptionsMethod.timeZoneProperty
// Intl.DateTimeFormat().resolvedOptions().timeZone;

// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
// console.log(testDate);
// console.log(Intl.DateTimeFormat());
// console.log(Intl.DateTimeFormat().timeZone);

// console.log(
//     testDate.toLocaleString('en-US', {
//         timeZone: 'America/Los_Angeles',
//         dateStyle: 'full',
//         timeStyle: 'full',
//     }),
// );

// console.log(
//     testDate2.toLocaleString('en-US', {
//         // timeZone: 'America/Los_Angeles',
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         second: '2-digit',
//         timeZoneName: 'long',
//     }),
// );

// console.log(testDate);
// console.log(testDate.toLocaleString(undefined, { timeZone: 'America/New_York', timeZoneName: 'long' }).timeZone);
// console.log(testDate.toLocaleString(undefined, { timeZone: 'Europe/London', timeZoneName: 'long' }));
// console.log(testDate.toLocaleString(undefined, { timeZone: 'Asia/Hong_Kong', timeZoneName: 'long' }));
// console.log(testDate2);
// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);