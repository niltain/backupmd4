let userId = sessionStorage.getItem("userPresentId")
let userPresent;

function init() {
    $.ajax({
        url: "http://localhost:8080/user/findById/" + userId,
        type: "GET",
        success: function (user) {
            userPresent = user;
            let account = "";
            account += `<img src="${user.avatar}" style="height: 70px; width: 70px">`;
            document.getElementById("userName").innerHTML = account;
            document.getElementById("user-img").src = user.avatar;
            display();
        }
    })
}

let commentAll;

function display() {
    let likePostAll = [];
    commentAll = []
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
                        findCommentByPostId(listPost[i].id);
                        let check = true;
                        if ((listPost[i].permissionPost == "Public") || (listPost[i].users.id == userId)) {
                            post += `<div class="central-meta item">
                                        <div class="user-post">
                                       <div class="friend-info"><figure>
                                       <img src="${listPost[i].users.avatar}" alt="" style="width: 45px; height: 45px">
                                       </figure>
                                       <div class="friend-name">
                                       <ins><a href="time-line.html" title="">${listPost[i].users.fullName}</a></ins>
                                       <span>${listPost[i].permissionPost} : ${listPost[i].createPost}</span>
                                       </div>`;
                            post += `<div class="post-meta">
												<img src="${listPost[i].imageName}" alt="">
												<div class="we-video-info">
													<ul>
														<li>
															<span class="comment" data-toggle="tooltip" title="Comments">
																<i class="fa fa-comments-o"></i>
																<ins>${commentByPostId.length}</ins>
															</span>
														</li>`;

                            // Hien thi dislike neu da like
                            for (let j = 0; j < likePostAll.length; j++) {
                                if (likePostAll[j].users.id == userId && likePostAll[j].post.id == listPost[i].id) {
                                    check = false;
                                    post += `<li>
                                                 <span class="like" data-toggle="tooltip" title="like">
												   <i class="fa fa-heart" aria-hidden="true" onclick="disLikePost(${likePostAll[j].id})"></i>
												   <ins>${listPost[i].likeCount}</ins>
											      </span>
										    </li>`;
                                }
                            }
                            if (check) {
                                post += `<li>
												<span class="like" data-toggle="tooltip" title="like">
													<i class="ti-heart" onclick="likePost(${listPost[i].id})"></i>
													<ins>${listPost[i].likeCount}</ins>
												</span>
										</li>`;
                            }
                            if (listPost[i].users.id == userId) {
                                post += `<li>
											<span class="like" data-toggle="tooltip" title="like">
											<i class="fa fa-trash-o" aria-hidden="true" onclick="deletePost(${listPost[i].id})"></i>
											</span>
										</li>`;
                                post += `<li>
											<span class="like" data-toggle="tooltip" title="like">
												<i class="fa fa-pencil-square-o" aria-hidden="true" onclick="updatePostForm(${listPost[i].id})"></i>
											</span>
										</li>`;
                            }
                            post += `</ul></div>`;
                            post += `<div class="description">
                                     <p>${listPost[i].content}</p>
                                     </div>
                                     </div>`;
                            // Comment
                            post += `</div><div class="coment-area" id="commentArea">
                                                    <ul class="we-comet" style="list-style-type: none">`
                            for (let l = 0; l < commentByPostId.length; l++) {
                                post += `<li>
													<div class="comet-avatar">
														<img src="${commentByPostId[l].users.avatar}" alt="" style="width: 45px; height: 45px">
													</div>
													<div class="we-comment" id="parentCmt">
														<div class="coment-head">
															<h5><a href="time-line.html" title="">${commentByPostId[l].users.fullName}</a></h5>
															<a class="we-reply" href="#" title="Reply" onclick="replyForm()"><i class="fa fa-reply"></i></a>
															<a class="we-reply" href="#" title="Like"><i class="ti-heart"></i></a>`
                                if ((commentByPostId[l].users.id == userId) || (listPost[i].users.id == userId)) {
                                    post += `<a class="we-reply" title="Delete" onclick="deleteComment(${commentByPostId[l].id})">
                                                    <i class="fa fa-trash-o" aria-hidden="true"></i></a>`;
                                    // if (checkDelete) {
                                    //     deleteComment(commentAll[l].id);
                                    // }
                                }
                                post += `<p style="color: black">${commentByPostId[l].content}</p></div></div></li>`;
                            }
                            post += `<li class="post-comment">
                                            <div class="comet-avatar">
                                            <img src="${userPresent.avatar}" alt="" style="width: 45px; height: 45px">
                                            </div>`;
                            post += `<div class="post-comt-box">
                                            <form method="post">
                                            <textarea id="commentPost${listPost[i].id}" placeholder="Post your comment"></textarea>
                                            <button type="submit" style="background: #088dcd; position: relative" onclick="comment(${listPost[i].id})">Post</button>
                                            </form>
                                            </div>
                                            </li>
                                            </ul></div></div></div>`;
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

let commentByPostId;

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

// function modalDeleteDisplay() {
//     let modal = "";
//     modal += `<form class="modal-content">
//         <div class="container">
//             <h1>Delete</h1>
//             <p>Are you sure you want to delete?</p>
//
//             <div class="clearfix">
//                 <button type="button" onclick="confirmCancel()"
//                         class="cancelbtn">Cancel
//                 </button>
//                 <button type="button" onclick="confirmDelete()"
//                         class="deletebtn">Delete
//                 </button>
//             </div>
//         </div>
//     </form>`;
//     document.getElementById("modalDelete").innerHTML = modal;
//     document.getElementById("modalDelete").style.display = "block";
// }

let checkDelete;

function confirmDelete() {
    let result = confirm("Are you sure you want to delete?");
    checkDelete = result;
}

// function confirmCancel() {
//     checkDelete = false;
//     document.getElementById("modalDelete").style.display = "none";
// }