// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("DOMContentLoaded", function() {
  if ( $('#comments_list').length > 0 ) {
    var comments = document.getElementById('comments_list').value
    var commentsArr = JSON.parse(comments)
    var initArray = []
    commentsArr.forEach(function(el) {
      if (el.gist_row > 0) {
        var stringCountFirst = document.querySelectorAll('.CodeMirror-code > div').length
        var string = document.querySelectorAll('.CodeMirror-code > div')[el.gist_row - 1]
        if (stringCountFirst >= (el.gist_row - 1)) {
          var div = document.createElement('div')
          div.classList.add('comment')
          div.innerHTML = el.body
          string.append(div)
          initArray.push(el)
        }
      }
    })

    commentsArr = commentsArr.filter(function(obj) { return initArray.indexOf(obj) == -1; })
    var scroll = document.querySelectorAll(".CodeMirror-vscrollbar")[0]
    scroll.addEventListener("scroll", loadComment)
    function loadComment() {
      commentsArr.forEach(function(el) {
        var string = document.querySelectorAll('.CodeMirror-code > div')[el.gist_row - 1]
        var stringCount = document.querySelectorAll('.CodeMirror-code > div').length
        if (stringCount > (el.gist_row - 1)) {
          var div = document.createElement('div')
          div.classList.add('comment')
          div.innerHTML = el.body
          string.append(div)
          initArray.push(el)
        }
      })
      commentsArr = commentsArr.filter(function(obj) { return initArray.indexOf(obj) == -1; })
    }
  }
})
