
var valueCommentCodeMirror
var contentMode
var contentCodeMirror
document.addEventListener('DOMContentLoaded', function(){
  var contentData = document.querySelectorAll('[data-content]')[0]
  if (contentData) {
    var contentId = parseInt(contentData.dataset.content)
    contentMode = contentData.dataset.mode
  }
  var editor = document.getElementById("code_area")
  if (editor) {
    CodeMirror.fromTextArea(editor, {
      lineNumbers: true,
      mode: contentMode,
      theme: "rubyblue",
      tabSize: 2,
      readOnly: true
    })
  }

  var contentBody = document.getElementById("content_body")
  if (contentBody) {
    var modeActivitie = document.querySelectorAll('#content_mode')[0]
    modeActivitie.addEventListener("change", function() {
      var modeNew = modeActivitie.value
      contentCodeMirror.setOption('mode', modeNew)
    })
    contentCodeMirror = CodeMirror.fromTextArea(contentBody, {
      lineNumbers: true,
      mode: "default",
      theme: "rubyblue",
      autoRefresh: true,
      lineWrapping: true,
      tabSize : 2,
    })
  }
  if ( document.querySelectorAll("#code_area")[0] && document.querySelectorAll('[data-content]')[0].dataset.user == 'true' ) {
    $(document).on('click', ".CodeMirror-linenumber", function(event) {
      var numberLine = this.innerHTML
      if (!($("#comment_forms").length)) {
          var div = document.createElement("div")
          div.classList.add("form_textarea_comment")
          var form = document.createElement('FORM')
          form.setAttribute("data-remote", "true")
          form.setAttribute("id", "comment_forms")
          form.name = 'myForm';
          form.method = 'POST';
          form.action = '/contents/' + contentId + '/comments';
          var input2 = document.createElement('INPUT')
          input2.id = 'comment_gist_row'
          input2.type = "hidden"
          input2.value = numberLine
          form.appendChild(input2)
          var my_tb = document.createElement('TEXTAREA')
          my_tb.setAttribute("id", "comment_textarea")
          my_tb.classList.add("form-control")
          my_tb.setAttribute("rows", "5")
          my_tb.type = 'TEXT';
          my_tb.name = 'comment[body]';
          my_tb.value = '';
          form.appendChild(my_tb)
          var btn = document.createElement("BUTTON")
          var t = document.createTextNode("Comment!")
          btn.appendChild(t)
          btn.classList.add('btn', 'btn-primary', 'btn-sm', 'send_comment')
          btn.type = 'submit'
          var btn2 = document.createElement("div")
          var t2 = document.createTextNode("Close!")
          btn2.appendChild(t2)
          btn2.classList.add('btn', 'btn-default', 'btn-sm', 'hide-form')
          form.appendChild(btn)
          form.appendChild(btn2)
          div.appendChild(form)
          this.parentElement.parentElement.append(div)

          var commentBody = document.getElementById("comment_textarea")
          var commentCodeMirror = CodeMirror.fromTextArea(commentBody, {
            lineWrapping: true,
            autoRefresh: true,
            mode: "markdown",
            theme: "3024-day",
          })
          valueCommentCodeMirror = commentCodeMirror
          commentCodeMirror.setSize(500, 100);
      }

      var sendComment = document.querySelectorAll(".send_comment")[0]

      sendComment.addEventListener('click', function(e) {
        e.preventDefault()
        var $form = $(".form_textarea_comment").find('form')
        let data = {
          comment: {
            body: valueCommentCodeMirror.getValue(),
            gist_row: $form.find('#comment_gist_row').val(),
          },
          authenticity_token: $('[name="csrf-token"]').attr('content')
        }

        if (data.comment.body.length > 1) {
          $.post({
            url: '/contents/' + contentId + '/comments',
            method: 'POST',
            data: data,
            dataType: "JSON",
            success: function (data) {
              $("#comment_forms").remove()
              if (data.gist_row > 0) {
                var lineNumber
                var arr = $('.CodeMirror-linenumber')
                for (var i = 0; i < arr.length; i++) {
                  if (arr[i].innerHTML == data.gist_row )  {
                    lineNumber = arr[i]
                    commentsArr.push(data)
                  }
                }
                var div = document.createElement('div')
                div.classList.add('comment_' + data.id)
                var divChild = document.createElement('div')
                divChild.classList.add('comment')
                div.append(divChild)
                divChild.innerHTML = markdown.toHTML(data.body)
                lineNumber.parentElement.parentElement.append(div)
                $('#comment_area textarea').val('')
              }
            }
          })
        } else {
          alert("Comment can not be empty")
        }
      })
      $(document).on( "click", ".hide-form", function(event) {
          $("#comment_forms").remove()
      })
    })

    var sendCommentStatic = document.querySelectorAll(".send_comment_static")[0]
    sendCommentStatic.addEventListener('click', function(e) {
      e.preventDefault()
      var $form = $("#comment_area").find('form')
      let data = {
        comment: {
          body: $form.find("textarea").val()
        },
        authenticity_token: $('[name="csrf-token"]').attr('content')
      }
      if (data.comment.body.length > 1) {
        $.post({
          url: '/contents/' + contentId + '/comments',
          method: 'POST',
          data: data,
          dataType: "JSON",
          success: function (data) {
            if (!data.gist_row) {
              var div = document.createElement('div')
              div.classList.add('comment_' + data.id)
              var divChild = document.createElement('div')
              divChild.classList.add('comment')
              div.append(divChild)
              divChild.innerHTML = markdown.toHTML(data.body)
              $(".comments").append(div)
              $('#comment_body').val('')
            }
          }
        })
      } else {
        var div = document.createElement('div')
        div.classList.add('alert', 'alert-danger')
        div.setAttribute("role", "alert")
        div.innerHTML = "Comments body can't be blank"
        let comments = document.querySelectorAll(".comments")[0]
        comments.append(div)
      }
    })
  }
  var alert = document.querySelectorAll(".alert_create")[0]
  if (alert) {
    $('.alert_create').fadeOut(3000, function(){ $(this).remove()})
  }
}, false)
