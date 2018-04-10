// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("DOMContentLoaded", function() {
  if ( $('#comments_list').length > 0 ) {
    var comments = document.getElementById('comments_list').value
    var commentsArr = JSON.parse(comments)
    commentsArr.forEach(function(el) {
      if (el.gist_row > 0) {
        var string = $('.CodeMirror-code').children()[el.gist_row - 1]
        var div = document.createElement('div')
        div.classList.add('comment')
        div.innerHTML = el.body
        string.append(div)
      }
    })
  }
})
