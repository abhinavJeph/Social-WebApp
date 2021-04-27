{
  //   Method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostFrom = $("#new-post-form");

    newPostFrom.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostFrom.serialize(), // to send in json format
        success: function (data) {
          // console.log(postContent);
          let newPost = newPostDom(data.data.post);
          $("#posts-list-container>ul").prepend(newPost);
          // For flash notification
          callNoty("success", data.message);
          // Deletion by ajax
          deletePost($(" .delete-post-button", newPost));

          // call the create comment class
          new PostComments(data.data.post._id);
        },
        error: function (err) {
          callNoty("error", err.responseText);
        },
      });
    });
  };

  // method to create a post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
                <p>
                    <small>
                        <a class="delete-post-button"  href="/posts/destroy/${post._id}">X</a>
                    </small>
                    ${post.content}
                    <br>
                    <small>
                    ${post.user.name}
                    </small>
                </p>
                <div class="post-comments">
                        <form id="post-${post._id}-comments-form" action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type Here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}" >
                            <input type="submit" value="Add Comment">
                        </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                        </ul>
                    </div>
                </div>
            </li>`);
  };

  // Method to Delete a Post from DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          callNoty("success", data.message);
        },
        error: function (err) {
          callNoty("error", err.responseText);
        },
      });
    });
  };

  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  // To convert all the posts that came from DB
  let convertPostsToAJAX = function () {
    $("#posts-list-container>ul>li").each(function () {
      let self = $(this);
      // Deletion by ajax
      deletePost($(" .delete-post-button", self));

      // call the create comment class
      // get the post's id by splitting the id attribute
      let post_Id = self.prop("id").split("-")[1];
      new PostComments(post_Id);
    });
  };

  createPost();
  convertPostsToAJAX();
}
