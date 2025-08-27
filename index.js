const defaultPref = {
  "theme": "dark"
}

let currentPref = {}

/* Handles dynamically loaded content, mainly the online count and event list */
document.addEventListener("DOMContentLoaded", function() {
    updateMemberCount();
    updateEventList();
    updateStaffList();

    currentPref = JSON.parse(localStorage.getItem("userPref"))
    if (!currentPref) {
        localStorage.setItem("userPref", JSON.stringify(defaultPref))
        currentPref = JSON.parse(localStorage.getItem("userPref"))
    }

    updateTheme(currentPref.theme)
});

function updatePref() {
    localStorage.setItem("userPref", JSON.stringify(currentPref))
}
// Util functions

function numberToWord(number) {
    const numberToWord = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen"];
    const tensWord = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    if (number <= 13) {
        return numberToWord[number];
    } else if (number <= 19) {
        return `${numberToWord[number % 10]}teen`;
    } else {
        // higher than 13.
        let tens = Math.floor(number / 10);
        let units = number % 10;

        return `${tensWord[tens]} ${numberToWord[units]}`;
    }
}

function getDateSuffix(date) {
    if ((date.toString().endsWith("1")) && (!date.toString().endsWith("11"))) return "st";
    if ((date.toString().endsWith("2")) && (!date.toString().endsWith("12"))) return "nd";
    if ((date.toString().endsWith("2")) && (!date.toString().endsWith("13"))) return "rd";
    return "th";
}

function getMonthName(month) {
    return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month];
}

function fullDigits(number) {
    return String(number).padStart(2, "0")
}

function timeTo12(hours, minutes) {
    if (hours / 12 > 1) {
        return `${hours-12}${minutes != 0 ? `:${fullDigits(minutes)}` : ``}pm`;
    } else {
        if (hours == 0) hours = 12;
        return `${hours}${minutes != 0 ? `:${fullDigits(minutes)}` : ``}am`;
    }
}