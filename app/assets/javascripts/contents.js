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
    var lines = document.querySelectorAll(".CodeMirror-linenumber")
    for (var i = 0; i < lines.length; i++) {
        lines[i].onmouseenter = function() {
            console.log(this);
        }

        lines[i].onmouseleave = function() {
            console.log(this);
        }
    }
}, false);
