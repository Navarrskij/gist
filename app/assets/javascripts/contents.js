document.addEventListener('DOMContentLoaded', function(){
    var editor = document.getElementById("code_area")
    if (editor) {
        CodeMirror.fromTextArea(editor, {
            lineNumbers: true,
            mode: "ruby",
            theme: "rubyblue",
            autoRefresh: true,
            tabSize : 2,
            readOnly: true
        });
    }

    var content_body = document.getElementById("content_body")
    if (content_body) {
        CodeMirror.fromTextArea(content_body, {
            lineNumbers: true,
            mode: "ruby",
            theme: "default",
            autoRefresh: true,
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
            $('.CodeMirror-code').children()[numberLine - 1].append(div)

            var comment_body = document.getElementById("comment_textarea")
            CodeMirror.fromTextArea(comment_body, {
                tabSize: 2,
                autoRefresh: true,

            });
            var myCodeMirror = CodeMirror.fromTextArea(comment_body);
            myCodeMirror.setSize(450, 100);
            var codemirrorHide = document.querySelectorAll(".CodeMirror.cm-s-default")
            codemirrorHide[1].style.display = 'none'
        }

        $("#comment_forms").submit(function(event) {
            $(this).remove()
        });
        $(document).on( "click", ".hide-form", function(event) {
            $("#comment_forms").remove()
        });
    })
}, false);
