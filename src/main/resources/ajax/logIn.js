function signIn() {
    document.getElementById("accountFail").style.display = "none";
    let userName = $("#usrName").val();
    let pass = $("#psw").val();
    let users = {
        userName: userName,
        pass: pass,
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/logIn/logIn",
        type: "POST",
        data: JSON.stringify(users),
        success: function (account) {
            if (account !== "") {
                if (account.userName == "admin" && account.pass == "admin") {
                    window.location = "http://localhost:63342/CASE_STUDY/CASE_STUDY.main/templates/timeline-admin.html"
                }
                sessionStorage.setItem("userPresentId", account.id);
                window.location = "http://localhost:63342/CASE_STUDY/CASE_STUDY.main/templates/newsfeed.html"
            } else {
                document.getElementById("accountFail").style.display = "block";
            }
        }
    })
    event.preventDefault();
}

function signUp() {
    document.getElementById("userNameFail").style.display = "none";
    document.getElementById("passFail").style.display = "none";
    document.getElementById("emailFail").style.display = "none";
    document.getElementById("rePassFail").style.display = "none";
    let userName = $("#userName").val();
    let pass = $("#pass").val();
    let rePass = $("#rePass").val();
    let fullName = $("#fullName").val();
    let email = $("#email").val();
    let users = {
        userName: userName,
        pass: pass,
        email: email,
        fullName: fullName,
    };
    let check = true;
    if (!checkPass(pass)) {
        check = false;
        document.getElementById("passFail").style.display = "block";
    }
    if (!checkEmail(email)) {
        check = false;
        document.getElementById("emailFail").style.display = "block";
    }
    if (pass != rePass) {
        check = false;
        document.getElementById("rePassFail").style.display = "block";
    }
    if (check) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/logIn/signUp",
            type: "POST",
            data: JSON.stringify(users),
            success: function (u) {
                if (u == "") {
                    document.getElementById("userNameFail").style.display = "block";
                } else {
                    window.location = "http://localhost:63342/CASE_STUDY/CASE_STUDY.main/templates/landing.html";
                }
            }
        })
        event.preventDefault();
    }
}

function checkPass(pass) {
    let regex = /^(?=.*?[A-Z])[A-Za-z0-9]{6,32}$/;
    return pass.match(regex);
}

function checkEmail(email) {
    let regex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return email.match(regex);
}