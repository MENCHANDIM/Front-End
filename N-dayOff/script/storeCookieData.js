function decrement() {
    var day = document.getElementById("leave-length").value;
    if (day > 1) {
        day--;
        document.getElementById("leave-length").value = day;
    } else {
        alert("no less than 1 day");
    }
}

function increment() {
    var day = document.getElementById("leave-length").value;
    if (day < 365) {
        day++;
        document.getElementById("leave-length").value = day;
    } else {
        alert("no more than 365 day");
    }
}

function collectData() {
    //get selected title
    var titleRadio = document.getElementsByName("radio");
    var selectedTT;
    var hasSelected = 0;
    for (var i = 0; i < titleRadio.length; i++) {
        if (titleRadio[i].checked) {
            selectedTT = titleRadio[i].value;
            hasSelected++;
        }
    }
    if (hasSelected == 0) selectedTT = "";//if none selected, set value as empty

    //store form data in object
    var formData =
        {
            title: selectedTT,
            lastName: document.getElementById("last-name").value,
            firstName: document.getElementById("first-name").value,
            reason: document.getElementById("reason").value,
            duration: document.getElementById("leave-length").value,
            startDate: document.getElementById("start-date").value
        };

    // store data in JSON format
    var str = JSON.stringify(formData);

    // var startD = formData.startDate;
    var startD = new Date(formData.startDate);

    //store data in cookies
    setCookie("form", str);
}

//store data in cookies
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}