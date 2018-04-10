// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("DOMContentLoaded", function() {
  if ( $('#comments_list').length > 0 ) {
    var comments = document.getElementById('comments_list').getAttribute("value")
    var commentsArr = JSON.parse(comments)
    for(var k in commentsArr) {
      if (commentsArr[k].gist_row > 0) {
        var string = $('.CodeMirror-code').children()[commentsArr[k].gist_row - 1]
        var div = document.createElement('div')
        div.classList.add('comment')
        div.innerHTML = commentsArr[k].body
        debugger
        string.append(div)
      }
    }
  }
})



// $($('<%= j render(partial: "comment", locals: { comment: @comment }) %>') ).
// appendTo($('.CodeMirror-code').children()[<%= @comment.gist_row %> - 1]);
