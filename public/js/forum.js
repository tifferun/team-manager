
$(document).ready(function () {
    $(".dropdown-toggle").dropdown();
    // Getting references to our dropdown text box
    var titleInput = $("input#title-input");
    var bodyInput = $("input#body-input");
    var postSubmit = $("#postSubmitButton");
    var forumTitle = $(".forumTitle");
    var postDelete = $(".forum-delete")


    // When the signup button is clicked, we validate the email and password are not blank
    postSubmit.on("click", function (event) {
        console.log("click click boom")
        event.preventDefault();
        var postData = {
            title: titleInput.val().trim(),
            body: bodyInput.val().trim(),
        };
        console.log(postData);
        if (!postData.title || !postData.body) {
            return;
        }
        // If we have all the required fields, run the signUpUser function
        sendPost(postData.title, postData.body);
        titleInput.val("");
        bodyInput.val("");
    });
    
    // Does a post to the signup route. If successful, we are redirected to the forum page page
    // Otherwise we log any errors
    function sendPost(title, body) {
        $.post("/api/post", {
            title: title,
            body: body
        });
        location.reload();
    }
    
    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
    forumTitle.on("click", function (blog) {
        console.log("forum works");
        event.preventDefault();
    })
    postDelete.on("click", function (event) {
        event.preventDefault();
        var id = $(this).data().id;
        console.log("click click boom")
        deleteEvent(id);
    
    });

    function deleteEvent(id) {
        // console.log('click click boom')
        $.ajax({
          method: "DELETE",
          url: "/api/forum/" + id
        }).then(function(){
            window.location.reload();
        });
      }
});



