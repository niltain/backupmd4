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
    event.preventDefault();
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

function findCommentByPostId(idPost) {
    commentByPostId = [];
    for (let i = 0; i < commentAll.length; i++) {
        if (commentAll[i].posts.id == idPost) {
            commentByPostId.push(commentAll[i]);
        }
    }
}

function permissionOff() {
    permission = "Private";
    document.getElementById("permissionPost").setAttribute("onclick", "permissionOn()");
    document.getElementById("permissionPost").innerHTML = `<i class="fa fa-lock" aria-hidden="true"></i>`;
}

function permissionOn() {
    permission = "Public";
    document.getElementById("permissionPost").setAttribute("onclick", "permissionOff()");
    document.getElementById("permissionPost").innerHTML = `<i class="fa fa-globe" aria-hidden="true"></i>`;
}