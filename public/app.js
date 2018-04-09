$(document).ready(function(){
  $('.modal').modal();
  $('.tabs').tabs();
});

// Whenever someone clicks a p tag
$(document).on("click", ".card-action", function() {
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");
  // Empty the notes from the note section
  $("#comment-feed" + thisId).empty();

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      if (data.note != undefined){
        $("#comment-feed" + thisId).append('<span>' + data.note.title + ' says "' + data.note.body + '"</span><i data-id="' + thisId + '"class="material-icons right delete-note" style="cursor: pointer">delete_forever</i>' );
      } else {
        $("#comment-feed" + thisId).append('<span>Be the first to leave a comment!</span>');
      }

    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput" + thisId).val(),
      // Value taken from note textarea
      body: $("#bodyinput" + thisId).val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#comment-feed" + thisId).empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput" + thisId).val("");
  $("#bodyinput" + thisId).val("");
});

// When you click the savenote button
$(document).on("click", ".delete-note", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  // alert(thisId)

  // Run a POST request to change the note, using what's entered in the inputs

  $.ajax({
    method: "DELETE",
    url: "/articles/" + thisId
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#comment-feed" + thisId).empty();
    });
});
