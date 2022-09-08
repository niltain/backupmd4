let userId = sessionStorage.getItem("userPresentId")
let userPresent;
let commentAll;
let permission = "Public";
let commentByPostId;

// Hiển thị newfeed và tài khoản hiện tại trên khung post bài
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

function display() {
    let likePostAll = [];
    commentAll = []
    // Lấy ra tất cả các lượt like của all post
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
    // Lấy ra toàn bộ comment của all post
    $.ajax({
        url: "http://localhost:8080/comment/findAll",
        type: "GET",
        success: function (commentList) {
            commentAll = new Array();
            for (let k = 0; k < commentList.length; k++) {
                commentAll.push(commentList[k]);
            }
            // Lấy ra toàn bộ bài post
            $.ajax({
                url: "http://localhost:8080/post/findAll",
                type: "GET",
                success: function (listPost) {
                    let post = "";
                    for (let i = listPost.length - 1; i >= 0; i--) {
                        findCommentByPostId(listPost[i].id);
                        let check = true;
                        // In ra bài post là public và tất cả bài post của mình kể cả private
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
                                // Nếu là comment của mình thì có thêm nút delete
                                if ((commentByPostId[l].users.id == userId) || (listPost[i].users.id == userId)) {
                                    post += `<a class="we-reply" title="Delete" onclick="deleteComment(${commentByPostId[l].id})">
                                                    <i class="fa fa-trash-o" aria-hidden="true"></i></a>`;
                                }
                                post += `<p style="color: black">${commentByPostId[l].content}</p></div></div></li>`;
                            }
                            // Khung thêm comment vào bài post
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
