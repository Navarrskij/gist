// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
document.addEventListener("DOMContentLoaded", function() {
  if ( $('#comments_list').length > 0 ) {
    var comments = document.getElementById('comments_list').value
    var commentsArr = JSON.parse(comments)
    commentsArr.forEach(function(el) {
      if (el.gist_row > 0) {
        var stringCountFirst = document.querySelectorAll('.CodeMirror-code > div').length
        var string = document.querySelectorAll('.CodeMirror-code > div')[el.gist_row - 1]
        if (stringCountFirst >= (el.gist_row - 1)) {
          var div = document.createElement('div')
          div.classList.add('comment')
          div.classList.add('comment_' + el.id)
          div.innerHTML = markdown.toHTML(el.body)
          string.append(div)

        }
      }
    })


    var scroll = document.querySelectorAll(".CodeMirror-vscrollbar")[0]
    scroll.addEventListener("scroll", loadComment)
    function loadComment() {
      var firstDiv = document.querySelectorAll('.CodeMirror-code > div')[0]
      var lengthDivs = document.querySelectorAll('.CodeMirror-code > div').length
      var lastDiv = document.querySelectorAll('.CodeMirror-code > div')[lengthDivs - 1]
      var firstRow = firstDiv.querySelectorAll(".CodeMirror-linenumber")[0].innerHTML
      var lastRow = lastDiv.querySelectorAll(".CodeMirror-linenumber")[0].innerHTML
      var lineNumber
      commentsArr.forEach(function(el) {
        if (el.gist_row > 0 && el.gist_row >= firstRow && el.gist_row <= lastRow) {
          var commentClass = ".comment_" + el.id
          if ( $(commentClass).length == 0 ) {
            var linenumberArr = document.querySelectorAll('.CodeMirror-linenumber')
            linenumberArr.forEach(function(line) {
              if (line.innerHTML == el.gist_row) {
                lineNumber = line
              }
            })
            var div = document.createElement('div')
            div.classList.add('comment')
            div.classList.add('comment_' + el.id)
            div.innerHTML = markdown.toHTML(el.body)
            lineNumber.parentElement.parentElement.append(div)
          }
        }
      })
    }
  }
})
