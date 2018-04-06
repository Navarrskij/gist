document.addEventListener('DOMContentLoaded', function(){
    var editor = document.getElementsByTagName("textArea")[0]
    CodeMirror.fromTextArea(editor, {
        lineNumbers: true,
        mode: "ruby",
        theme: "rubyblue"
    });
}, false);