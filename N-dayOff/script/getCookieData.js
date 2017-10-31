var draft1;
var draft2;
var draft3;

//display a draft after windows load
window.onload = function () {
    preparePage();
    displayData(document.getElementById("draft1"));
};

function preparePage(){
    var form_data_str = getCookie("form");

    //form data: JSON string to object
    var value = JSON.parse(form_data_str);

    //if user didn't input receiver name
    //"To whom it may concern"
    var name;
    if (value.lastName === "") {
        name = "To whom it may concern,</p>";
    } else {
        name = "Dear " + value.title + value.lastName + ",</p>";
    }

    //if duration bigger than 1 or not
    var dateDescrip;
    if (value.duration === 1) {
        dateDescrip = " day off on ";
    } else {
        dateDescrip = " days start from ";
    }

    //calculate the end date of leave
    var endD = new Date();
    var today = new Date();
    var startD = new Date(value.startDate);

    endD.setTime( startD.getTime() + parseInt(value.duration) * 86400000 );

    var start_date = startD.toLocaleDateString();
    var end_date = endD.toLocaleDateString();
    today = today.toLocaleDateString();

    // easter egg
    var checkDate = new Date(startD);
    if(checkDate.getFullYear() <= 1300){
        document.getElementById("egg").innerHTML = "hello caveman from year " + checkDate.getFullYear();
    }

    //draft 1
    draft1 = name + "I'm " + value.firstName + ", I think I need " + value.duration + dateDescrip + start_date
        + ", due to " + value.reason + ".<p/>I know it's a little bit hurry, while I still "
        + "hope you would consider my request favorably and grant me leave for the requested date. Please feel free to "
        + "seek any further details.<p/>Thank you!<p/>Sincerely,<br>" + value.firstName + "<p/>" + today;

    //draft 2
    draft2 = name + "I would like to request for my vacation leave start from "
        + start_date + " to " + end_date + ".<p/>As so far I almost finish my work, and I will make sure that all my"
        + " work be completed before the day I leave. It can be guaranteed that there won’t be any burden on others.<p/>"
        + "Since I have been a really capable and diligent worker of our company, and also because of " + value.reason
        + ", I plan to stay with my family and refresh myself.<p/>I hope you will approve this leave letter."
        + "<p/>Sincerely,<br>" + value.firstName + "<p/>" + today;

    //draft 3
    draft3 = name + "I am writing this letter to apply for a " + value.duration
        + "-day leave. I would like to apply for leave starting from " + start_date + " since I have not availed any "
        + "of the leaves nor been absent from past eight months.<p/>The main reason for this leave is " + value.reason
        + ". I will hand over all my responsibilities to another employee and explain everything to him.<p/>I will be "
        + "able to resume with work from " + end_date + " and I hope that there is no emergency or need for extension "
        + "else I will inform about the same.<p/>Waiting for the confirmation of leave." + "<p/>Yours sincerely,<br>"
        + value.firstName + "<p/>" + today;
}

//display cookie data
function displayData(btn) {
    switch (btn.id) {
        case "draft1":
            document.getElementById("res").innerHTML = draft1;
            break;
        case "draft2":
            document.getElementById("res").innerHTML = draft2;
            break;
        case "draft3":
            document.getElementById("res").innerHTML = draft3;
            break;
    }
}

//obtain data in cookies
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// delete cookies
// for test
function eraseCookie(name) {
    setCookie(name, "", -1);
}

// copy result to clipboard
function CopyToClipboard(containerId) {
    var email = document.getElementById(containerId);
    var range;
    if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(email);
        range.select();

    } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(email);
        window.getSelection().empty();
        window.getSelection().addRange(range);
    }
    try {
        var isSuccessful = document.execCommand('copy');
        var btnStatus = document.getElementById("copyBtn");
        if (isSuccessful) {
            var copy = btnStatus;
            btnStatus.innerHTML = "COPIED";
            window.getSelection().empty();
            setTimeout(function () {
                copy.innerHTML = "COPY";
            }, 1000);
        } else {
            btnStatus.innerHTML = "Failed. Please press Ctrl+C to copy.";
        }
    } catch (err) {
        console.log('Oops, unable to copy');
    }
}