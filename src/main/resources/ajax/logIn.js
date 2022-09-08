function signIn() {
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
        type: "GET",
        data: JSON.stringify(users),
        success: function (account) {
            if (account !== null) {
                if (account.userName == "admin" && account.pass == "admin") {
                    window.location = "http://localhost:63342/CASE_STUDY/CASE_STUDY.main/templates/NewFeed.html"
                }
                sessionStorage.setItem("userPresentId", account.id);
                window.location = "http://localhost:63342/CASE_STUDY/CASE_STUDY.main/templates/NewFeed.html"
            }
            window.location = "http://localhost:63342/CASE_STUDY/CASE_STUDY.main/templates/NewFeed.html"
        }
    })
    event.preventDefault();
}

function signUp() {
    let userName = $("#userName").val();
    let pass = $("#pass").val();
    let fullName = $("#fullName").val();
    let users = {
        userName: userName,
        pass: pass,
        fullName: fullName,
    };
    $.ajax({
        url: "http://localhost:8080/user/findAll",
        type: "GET",
        data: JSON.stringify(users),
        success: function (userList) {
            let check = true;
            for (let i = 0; i < userList.length; i++) {
                if (userList[i].userName == userName) {
                    check = false;
                    document.getElementById(userNameFail).style.display = "block";
                }
            }
            if (!checkPass(pass)) {
                check = false;
                document.getElementById(passFail).style.display = "block";
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
                    success: function () {
                        window.location = "http://localhost:63342/CASE_STUDY/CASE_STUDY.main/templates/NewFeed.html"
                    }
                });
            }
        }
    })
    event.preventDefault();
}

function checkPass(pass) {
    let regex = new RegExp("^(?=.*?[A-Z])[A-Za-z0-9]{6,32}$");
    return pass.match(regex);
}