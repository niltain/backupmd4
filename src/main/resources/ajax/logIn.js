let userList = [];

function signIn() {
    let userName = $("#usrName").val();
    let pass = $("#psw").val();
    let users = {
        userName: userName,
        pass: pass,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/logIn/logIn",
        type: "POST",
        data: JSON.stringify(users),
        success: function (data) {
            if (data !== null) {
                localStorage.setItem("userPresent", data);
                console.log("newFeed");
                window.location = "http://localhost:63342/CASE_STUDY/CASE_STUDY.main/templates/NewFeed.html"
            }
        },
    })
}

// function getUser() {
//     $.ajax({
//         url: "http://localhost:8080/logIn/getUser",
//         type: "GET",
//         success: function (data) {
//             for (let i = 0; i < data.length; i++) {
//                 userList.push(data[i]);
//             }
//         }
//     })
// }
//
// function checkUserExist(userName, pass) {
//     getUser();
//     for (let i = 0; i < userList.length; i++) {
//         if (userList[i].userName === userName && userList[i].pass === pass) {
//             return userList[i];
//         }
//     }
//     return false;
// }