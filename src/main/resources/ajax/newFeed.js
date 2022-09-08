let userId = sessionStorage.getItem("userPresentId")

function init() {
    $.ajax({
        url: "http://localhost:8080/user/findById/" + userId,
        type: "GET",
        success: function (user) {
            let account = "";
            account += `<img style="width: 30px; height: 30px; border-radius: 50%" src="${user.avatar}">`;
            account += `<span><b>   ${user.fullName}</b></span>`;
            document.getElementById("userName").innerHTML = account;
            display();
        }
    })
}

function display() {
    let likePostAll = [];
    let commentAll = [];
    $.ajax({
        url: "http://localhost:8080/likePost/findAll",
        type: "GET",
        success: function (likePostList) {
            likePostAll = new Array();
            for (let k = 0; k < likePostList.length; k++) {
                likePostAll.push(likePostList[k]);
            }
        }
    })
    $.ajax({
        url: "http://localhost:8080/comment/findAll",
        type: "GET",
        success: function (commentList) {
            commentAll = new Array();
            for (let k = 0; k < commentList.length; k++) {
                commentAll.push(commentList[k]);
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
                            // Comment
                            post += `<div><textarea id="commentPost${listPost[i].id}" placeholder="Say Something About This Post..."></textarea>`
                            post += `<button onclick="comment(${listPost[i].id})">Comment</button></div>`
                            for (let l = 0; l < commentAll.length; l++) {
                                if (commentAll[l].posts.id == listPost[i].id) {
                                    post += `<div id="parentCmt"><img style="width: 10px; height: 10px; border-radius: 50%" src="${commentAll[l].users.avatar}">`;
                                    post += `<span><b>   ${commentAll[l].users.fullName}</b></span>`
                                    post += `<p style="margin: 5px 20px -5px">${commentAll[l].content}</p><br>`;
                                    post += `<span>${commentAll[l].likeCount}</span>`
                                    post += `<button onclick="replyForm()">Reply</button>`
                                    if ((commentAll[l].users.id == userId) || (listPost[i].users.id == userId)) {
                                        post += `<button onclick="modalDeleteDisplay()">Delete</button></div>`;
                                        if (checkDelete) {
                                            deleteComment(commentAll[l].id);
                                        }
                                    }
                                }
                            }
                            // Neu la bai viet cua minh thi co them delete
                            if (listPost[i].users.id == userId) {
                                post += `<button onclick="deletePost(${listPost[i].id})">Delete Post</button>`
                                post += `<button onclick="updatePostForm(${listPost[i].id})">Update Post</button>`
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

let permission = "Public";

function createPost() {
    let content = $("#contentPost").val();
    const ref = firebase.storage().ref();
    const file = document.querySelector('#imagePost').files[0];
    document.getElementById("contentPost").innerHTML = "";
    document.getElementById("formCreatePost").reset();
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
                permissionPost: permission,
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
    event.preventDefault();
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
        url: "http://localhost:8080/likePost/disLike/" + id,
        type: "DELETE",
        success: function () {
            display();
        }
    })
}

function deletePost(id) {
    $.ajax({
        url: "http://localhost:8080/post/delete/" + id,
        type: "PUT",
        success: function () {
            display();
        }
    })
}

function updatePostForm(id) {
    $.ajax({
        url: "http://localhost:8080/post/findById/" + id,
        type: "GET",
        success: function (post) {
            document.getElementById("contentPost").innerHTML = post.content;
            document.getElementById("post").setAttribute("onclick", "updatePost(" + id + ")");
            document.getElementById("post").innerText = "Update";
            document.getElementById("permissionPost").value = post.permissionPost;
        }
    })
}

function updatePost(idPost) {
    let content = $("#contentPost").val();
    const ref = firebase.storage().ref();
    const file = document.querySelector('#imagePost').files[0];
    document.getElementById("post").setAttribute("onclick", "createPost()");
    document.getElementById("post").innerText = "Post";
    document.getElementById("contentPost").innerHTML = "";
    document.getElementById("formCreatePost").reset();
    const metadata = {
        contentType: file.type
    }
    let image = file.name;
    const uploadIMG = ref.child(image).put(file, metadata);
    uploadIMG.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            let URl = url;
            let posts = {
                id: idPost,
                content: content,
                imageName: URl,
                permissionPost: permission,
                users: {
                    id: userId
                }
            }
            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                type: "PUT",
                data: JSON.stringify(posts),
                url: "http://localhost:8080/post/update",
                success: function () {
                    display();
                }
            });
        });
    event.preventDefault();
}

function comment(idPost) {
    let idComment = "commentPost" + idPost;
    let content = document.getElementById(idComment).value;
    let comment = {
        content: content,
        posts: {
            id: idPost
        },
        users: {
            id: userId
        }
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(comment),
        url: "http://localhost:8080/comment/create",
        success: function () {
            display();
        }
    });
}

function deleteComment(id) {
    $.ajax({
        url: "http://localhost:8080/comment/delete/" + id,
        type: "PUT",
        success: function () {
            display();
        }
    })
}

function permissionOff() {
    permission = "Private";
    document.getElementById("permissionPost").setAttribute("onclick", "permissionOn()");
    document.getElementById("permissionPost").innerHTML = `<i class="fa fa-lock" aria-hidden="true"></i>`;
}

function permissionOn() {
    permission = "Public";
    document.getElementById("permissionPost").setAttribute("onclick", "permissionOff()");
    document.getElementById("permissionPost").innerHTML = `<i class=\"fa fa-unlock\" aria-hidden=\"true\"></i>`;
}

function modalDeleteDisplay() {
    let modal = "";
    modal += `<form class="modal-content">
        <div class="container">
            <h1>Delete</h1>
            <p>Are you sure you want to delete?</p>

            <div class="clearfix">
                <button type="button" onclick="confirmCancel()"
                        class="cancelbtn">Cancel
                </button>
                <button type="button" onclick="confirmDelete()"
                        class="deletebtn">Delete
                </button>
            </div>
        </div>
    </form>`;
    document.getElementById("modalDelete").innerHTML = modal;
    document.getElementById("modalDelete").style.display = "block";
}

let checkDelete;
function confirmDelete() {
    checkDelete = true;
    document.getElementById("modalDelete").style.display = "none";
}
function confirmCancel() {
    checkDelete = false;
    document.getElementById("modalDelete").style.display = "none";
}