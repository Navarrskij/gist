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
            theme: "rubyblue",
            autoRefresh: true,
            tabSize : 2,
        });
    }

    $(document).on('click', ".CodeMirror-linenumber", function(event) {
        var numberLine = this.innerHTML
        var div = document.createElement("div")
        var form = document.createElement('FORM')
        form.name='myForm';
        form.method='POST';
        form.action='/contents/8/comments';
        var my_tb = document.createElement('TEXTAREA')
        my_tb.setAttribute("id", "comment_textarea")
        my_tb.setAttribute("class", "form-control")
        my_tb.setAttribute("rows", "5")
        my_tb.type='TEXT';
        my_tb.name='myInput';
        my_tb.value='';
        form.appendChild(my_tb)
        var btn = document.createElement("BUTTON")
        var t = document.createTextNode("Comment!")
        btn.appendChild(t)
        btn.setAttribute("class", "btn btn-primary btn-sm")
        btn.type = 'submit'
        form.appendChild(btn)
        div.appendChild(form)
        $('.CodeMirror-code').children()[numberLine - 1].append(div)
        var comment_body = document.getElementById("comment_textarea")
        CodeMirror.fromTextArea(comment_body, {
            tabSize : 2,
            autoRefresh: true,

        });
        var myCodeMirror = CodeMirror.fromTextArea(comment_body);
        myCodeMirror.setSize(450, 100);
        var codemirrorHide = document.getElementsByClassName("CodeMirror cm-s-default")
        codemirrorHide[1].style.display = 'none'
    })

    // document.getElementsByClassName("CodeMirror-linenumber").click(function(e) {
    //     var line = this.innerHTML
    //     console.log(line)
    // })
}, false);
