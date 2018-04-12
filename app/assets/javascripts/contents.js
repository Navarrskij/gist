document.addEventListener('DOMContentLoaded', function(){
    var editor = document.getElementById("code_area")
    if (editor) {
        CodeMirror.fromTextArea(editor, {
            lineNumbers: true,
            mode: "ruby",
            theme: "rubyblue",
            tabSize: 2,
            readOnly: true
        });
    }

    var contentBody = document.getElementById("content_body")
    if (contentBody) {
        CodeMirror.fromTextArea(contentBody, {
            lineNumbers: true,
            mode: "ruby",
            theme: "rubyblue",
            autoRefresh: true,
            lineWrapping: true,
            tabSize : 2,
        });
    }

    $(document).on('click', ".CodeMirror-linenumber", function(event) {
        var numberLine = this.innerHTML
        var gist = document.querySelectorAll('[data-gist]')[0].dataset.gist
        var gistId = parseInt(gist)
        var token = $('meta[name="csrf-token"]').attr('content')
        if (!($("#comment_forms").length)) {
            var div = document.createElement("div")
            var form = document.createElement('FORM')
            form.setAttribute("data-remote", "true")
            form.setAttribute("id", "comment_forms")
            form.name = 'myForm';
            form.method = 'POST';
            form.action = '/contents/' + gistId + '/comments';
            var input1 = document.createElement('INPUT')
            input1.name = 'comment[authenticity_token]'
            input1.type = "hidden"
            input1.value = token
            var input2 = document.createElement('INPUT')
            input2.name = 'comment[gist_row]'
            input2.type = "hidden"
            input2.value = numberLine
            form.appendChild(input1)
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
            btn.classList.add('btn', 'btn-primary', 'btn-sm')
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
            var myCodeMirror = CodeMirror.fromTextArea(commentBody, {
                lineWrapping: true,
                autoRefresh: true,
                theme: "3024-day",
            });
            myCodeMirror.setSize(500, 100);

            // var codemirrorHide = document.querySelectorAll(".CodeMirror.cm-s-default")
            // codemirrorHide[1].style.display = 'none'
            // var text = document.querySelectorAll("#comment_forms")[0]
            // var text2 = document.querySelectorAll(".cm-s-default")[1]
            // text.removeChild(text2)
        }

        $("#comment_forms").submit(function(event) {
            $(this).remove()
        });
        $(document).on( "click", ".hide-form", function(event) {
            $("#comment_forms").remove()
        });
    })
}, false);
