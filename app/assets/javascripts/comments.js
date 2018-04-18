var commentsArr = []
document.addEventListener("DOMContentLoaded", function() {
  // var commentsArr
  if ( $('#comments_list').length > 0 ) {
    var comments = document.getElementById('comments_list').value
    commentsArr = JSON.parse(comments)
    commentsArr.forEach(function(el) {
      if (el.gist_row > 0) {
        var stringCountFirst = document.querySelectorAll('.CodeMirror-code > div').length
        var string = document.querySelectorAll('.CodeMirror-code > div')[el.gist_row - 1]
        if (stringCountFirst >= (el.gist_row - 1)) {
          var div = document.createElement('div')
          div.classList.add('comment_' + el.id)
          var divChild = document.createElement('div')
          divChild.classList.add('comment')
          div.append(divChild)
          divChild.innerHTML = markdown.toHTML(el.body)
          string.append(div)
        }
      }
    })

    var loadComment = debounce(function() {
      var firstDiv = document.querySelectorAll('.CodeMirror-code > div')[0]
      var lengthDivs = document.querySelectorAll('.CodeMirror-code > div').length
      var lastDiv = document.querySelectorAll('.CodeMirror-code > div')[lengthDivs - 1]
      var firstRow = firstDiv.querySelectorAll(".CodeMirror-linenumber")[0].innerHTML
      var lastRow = lastDiv.querySelectorAll(".CodeMirror-linenumber")[0].innerHTML
      var lineNumber
      var comments = document.getElementById('comments_list').value
      var commentsArr = JSON.parse(comments)
      commentsArr.forEach(function(el) {
        if (el.gist_row > 0 && el.gist_row >= firstRow && el.gist_row <= lastRow) {
          var stringClass = ".comment_" + el.id
          var commentClass = document.querySelectorAll(stringClass)
          if ( commentClass.length == 0 ) {
            var linenumberArr = document.querySelectorAll('.CodeMirror-linenumber')
            linenumberArr.forEach(function(line) {
              if (line.innerHTML == el.gist_row) {
                lineNumber = line
              }
            })
            var div = document.createElement('div')
            div.classList.add('comment_' + el.id)
            var divChild = document.createElement('div')
            divChild.classList.add('comment')
            div.append(divChild)
            divChild.innerHTML = markdown.toHTML(el.body)
            lineNumber.parentElement.parentElement.append(div)
          }
        }
      })
    }, 100)

    var scroll = document.querySelectorAll(".CodeMirror-vscrollbar")[0]
    scroll.addEventListener("scroll", loadComment)
    window.addEventListener("scroll", loadComment)
  }

  function debounce(func, wait, immediate) {
  	var timeout
  	return function() {
  		var context = this, args = arguments
  		var later = function() {
  			timeout = null
  			if (!immediate) func.apply(context, args)
  		}
  		var callNow = immediate && !timeout
  		clearTimeout(timeout)
  		timeout = setTimeout(later, wait)
  		if (callNow) func.apply(context, args)
  	}
  }
})
