let userId = sessionStorage.getItem("userPresentId")

function init() {
    $.ajax({
        url: "http://localhost:8080/user/findById/" + userId,
        type: "GET",
        success: function (user) {
            document.getElementById("userName").innerHTML = user.userName;
            display();
        }
    })
}
function display() {
    let likePostAll = [];
    $.ajax({
        url: "http://localhost:8080/likePost/findAll",
        type: "GET",
        success: function (likePostList) {
            likePostAll = new Array();
            for (let k = 0; k < likePostList.length; k++) {
                likePostAll.push(likePostList[k]);
            }
            $.ajax({
                url: "http://localhost:8080/post/findAll",
                type: "GET",
                success: function (listPost) {
                    let post = "";
                    for (let i = listPost.length - 1; i >= 0; i--) {
                        let check = true;
                        if ((listPost[i].permissionPost == "Public") || (listPost[i].users.id == userId)) {
                            post += "<div style='margin-top: 20px'>";
                            post += `<img style="width: 30px; height: 30px; border-radius: 50%" src="${listPost[i].users.avatar}">`;
                            post += `<span><b>   ${listPost[i].users.fullName}</b></span>`
                            if (listPost[i].permissionPost == "Private") {
                                post += `<button>x</button>`;
                            }
                            post += `<p style="margin: 5px 20px -5px">${listPost[i].content}</p><br>`;
                            post += `<img style="width: 200px; height: 200px" src="${listPost[i].imageName}">`;
                            post += `<br><span>${listPost[i].likeCount}</span>`
                            // Hien thi dislike neu da like
                            for (let j = 0; j < likePostAll.length; j++) {
                                if (likePostAll[j].users.id == userId && likePostAll[j].post.id == listPost[i].id) {
                                    check = false;
                                    post += `<button onclick="disLikePost(${likePostAll[j].id})">DisLike</button>`
                                }
                            }
                            if (check) {
                                post += `<button onclick="likePost(${listPost[i].id})">Like</button>`;
                            }
                            post += `<button>Comment</button>`
                            // Neu la bai viet cua minh thi co them delete
                            if (listPost[i].users.id == userId) {
                                post += `<button onclick="deletePost(${listPost[i].id})">Delete Status</button>`
                            }
                            post += "</div>";
                        }
                    }
                    document.getElementById("postDiv").innerHTML = post;
                }
            })
        }
    })
}

function createPost() {
    let content = $("#contentPost").val();
    let permissionPost = $("#permissionPost").val();
    const ref = firebase.storage().ref();
    const file = document.querySelector('#imagePost').files[0];
    const metadata = {
        contentType: file.type
    }
    let image = file.name;
    const uploadIMG = ref.child(image).put(file, metadata);
    uploadIMG.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            let URl = url;
            let posts = {
                content: content,
                imageName: URl,
                permissionPost: permissionPost,
                users: {
                    id: userId
                }
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "POST",
                data: JSON.stringify(posts),
                url: "http://localhost:8080/post/create",
                success: function () {
                    display();
                }
            });
        });
}

function likePost(postId) {
    let likePost = {
        users: {
            id: userId
        },
        post: {
            id: postId
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/likePost/create",
        type: "POST",
        data: JSON.stringify(likePost),
        success: function () {
            display();
        }
    })
}

function disLikePost(id) {
    $.ajax({
        url: "http://localhost:8080/likePost/delete/" + id,
        type: "DELETE",
        success: function () {
            display();
        }
        })
}