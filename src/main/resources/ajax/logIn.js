
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
                console.log(data)
                sessionStorage.setItem("userPresentId", data.id);
                window.location = "http://localhost:63342/CASE_STUDY/CASE_STUDY.main/templates/NewFeed.html"
            }
        },
    })
    event.preventDefault();
}
