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
          let postContent = data.data.post;
          console.log(postContent);
          let newPost = newPostDom(postContent);
          $("#posts-list-container>ul").prepend(newPost);
          // For flash notification
          callNoty("success", data.message);
          // Deletion by ajax
          deletePost($(" .delete-post-button", newPost));
        },
        error: function (err) {
          callNoty("error", err.responseText);
        },
      });
    });
  };

  //   Method to Create Post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
      <p>
        <small>
          <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small>
        ${post.content}
        <br />
        <small>
        ${post.user.name}
        </small>
      </p>
      <div class="post-comment">
        <form action="/comments/create" method="POST">
          <input
            type="text"
            name="content"
            placeholder="Enter your comment here..."
          />
          <input type="hidden" name="post" value="${post._id}" />
          <input type="submit" value="Add Comment" />
        </form>  
      </div>
      <div class="post-comments-list">
        <ul class="post-comments-${post._id}">
        </ul>
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

  // Function to call Noty : flash messages with animations
  let callNoty = function (type, text) {
    new Noty({
      theme: "relax",
      text,
      type,
      layout: "topRight",
      timeout: 1500,
    }).show();
  };

  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  // To convert all the posts that came from DB
  let convertPostsToAJAX = function () {
    $("#posts-list-container>ul>li").each(function () {
      let self = $(this);
      // Deletion by ajax
      deletePost($(" .delete-post-button", self));
    });
  };

  createPost();
  convertPostsToAJAX();
}
