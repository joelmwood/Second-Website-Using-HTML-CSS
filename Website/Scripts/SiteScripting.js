// JavaScript Document
var FormValue1;
var FormValue2;
var FormValue3;
var pos;

function CheckForm(Item) {
    switch (Item) {
        case 0:
            FormValue1 = document.getElementById("ReserveName").value;
            pos = FormValue1.search(/\d/);
            if (FormValue1 == "") {
                document.getElementById("CorrectionTextName").innerHTML =
                    "* Please enter an appointment name";
                return false;
            }
            if (pos != -1) {
                document.getElementById("CorrectionTextName").innerHTML =
                    "* Appointment names must not include numbers";
                return false;
            } else document.getElementById("CorrectionTextName").innerHTML =
                "";
            return true;
            break;
        case 1:
            FormValue2 = document.getElementById("ReserveTime").value;
            if (FormValue2 == "") {
                document.getElementById("CorrectionTextTime").innerHTML =
                    "* Please enter an appointment time";
                return false;
            } else document.getElementById("CorrectionTextTime").innerHTML =
                "";
            return true;
            break;
        case 2:
            FormValue3 = document.getElementById("ReserveParty").value;
            pos = FormValue3.search(/\d/);
            if (FormValue3 == "") {
                document.getElementById("CorrectionTextParty").innerHTML =
                    "* Please enter the number of people who are attending";
                return false;
            }
            if (pos != 0) {
                document.getElementById("CorrectionTextParty").innerHTML =
                    "* Party size must be a number";
                return false;
            } else document.getElementById("CorrectionTextParty").innerHTML =
                "";
            return true;
            break;
        default:
            break;
    }
}

function ValidateForm() {
    FormValue1 = document.getElementById("ReserveName").value;
    FormValue2 = document.getElementById("ReserveTime").value;
    FormValue3 = document.getElementById("ReserveParty").value;
    var ErrFlag = 0;
    for (var i = 0; i < 3; i++) {
        if (i == 0) {
            pos = FormValue1.search(/\d/);
            alert("name box checked");
            if (FormValue1 == "") {
                document.getElementById("CorrectionTextName").innerHTML =
                    "* Please enter an appointment name";
                ErrFlag = 1;
            }
            if (pos != -1) {
                document.getElementById("CorrectionTextName").innerHTML =
                    "* Appointment names must not include numbers";
                ErrFlag = 1;
            } else document.getElementById("CorrectionTextName").innerHTML =
                "";
        }
        if (i == 1) {
            if (FormValue2 == "") {
                document.getElementById("CorrectionTextTime").innerHTML =
                    "* Please enter an appointment time";
                ErrFlag = 1;
            } else document.getElementById("CorrectionTextTime").innerHTML =
                "";
        }
        if (i == 2) {
            pos = FormValue3.search(/\d/);
            if (FormValue3 == "") {
                document.getElementById("CorrectionTextParty").innerHTML =
                    "* Please enter the number of people who are attending";
                ErrFlag = 1;
            }
            if (pos != 0) {
                document.getElementById("CorrectionTextParty").innerHTML =
                    "* Party size must be a number";
                ErrFlag = 1;
            } else document.getElementById("CorrectionTextParty").innerHTML =
                "";
        }
    }
    if (ErrFlag == 1) {
        return false;
    } else return true;
}

function MenuDisplay(ChosenMenu) {
    for (var i = 0; i < tabLinks.length; i++) {
        if (tabLinks[i] == ChosenMenu) {
            // if it's the one to activate, change its class
            tabLinks[i].classList.add("active");
            // and display the corresponding panel
            tabPanels[i].style.display = "block";
        } else {
            // remove the active class on the link
            tabLinks[i].classList.remove("active");
            // hide the panel
            tabPanels[i].style.display = "none";
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    document.cookie = cname + "=" + cvalue + "; ";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
var chckID = false;
var chckPass = false;

function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
        chckID = true;
        document.getElementById("account").innerHTML = username +
            " Account";
        var link = document.getElementById("account");
        link.setAttribute("href", "User.html");
        document.getElementById("account2").innerHTML = username +
            " Account";
        var link2 = document.getElementById("account2");
        link2.setAttribute("href", "User.html");
        addLogoutLink();
    } else {
        document.cookie =
            "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie =
            "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "names=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
}

function checkName() {
    var username = getCookie("username");
    var div = document.getElementById('addUserName');
    div.innerHTML = div.innerHTML + username;
}

function checkCookie2(id, chckID) {
    if (chckID == true && chckPass == true) {
        var user = id;
        var username = getCookie("username");
        if (user != "" && username != "") {
            chckCk = true;
            document.getElementById("account").innerHTML = user +
                " Account";
            document.getElementById("account2").innerHTML = user +
                " Account";
            addLogoutLink();
        } else {}
    }
}

function addLogoutLink() {
    var mydiv = document.getElementById("MainNav");
    var aTag = document.createElement('a');
    aTag.setAttribute('href', "Account.html");
    aTag.onclick = function() {
        chckID = false;
        chckPass = false;
    }
    aTag.innerHTML = "Logout";
    mydiv.appendChild(aTag);
    aTag.onclick = function() {
        document.cookie =
            "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
}

function checkCredentials() {
    var id = userName.value;
    id = id.toUpperCase();
    var pass = password.value;
    pass = pass.toUpperCase();
    console.log(id);
    console.log(pass);
    var names = [];
    var passwords = [];
    var temp;
    var index;
    $.get("names.txt", function(data) {
        names = data.split("\n");
        for (a in names) {
            temp = names[a];
            setCookie("names", temp, 30);
            var test = getCookie("names");
            if (test == id) {
                index = a;
                chckID = true;
                setCookie("names", id, 30);
                break;
            } else {
                setCookie("names", "", 30);
                chckID = false;
            }
        }
    });
    $.get("passwords.txt", function(data) {
        passwords = data.split("\n");
        temp = passwords[a];
        setCookie("password", temp, 30);
        var test = getCookie("password");
        if (test == pass) {
            chckPass = true;
            setCookie("names", "", 30);
            setCookie("username", id, 30);
            clearFields();
            validCreds(id);
        } else {
            setCookie("names", "", 30);
            setCookie("username", "", 30);
            setCookie("password", "", 30);
            chckPass = false;
            clearFields();
            invalidCreds();
        }
    });
}

function validCreds(id) {
    if (chckPass == true && chckID == true) {
        setCookie("names", "", 30);
        setCookie("password", "", 30);
        checkCookie2(id, chckID);
        document.getElementById("account").innerHTML = id;
        window.location.replace("User.html");
    }
}

function invalidCreds() {
    if (chckPass == false || chckID == false) {
        setCookie("username", "", 30);
        setCookie("names", "", 30);
        setCookie("password", "", 30);
        chckID = false;
        chckPass = false;
        alert("Invalid credentials, try again.");
    }
}

function clearFields() {
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
}