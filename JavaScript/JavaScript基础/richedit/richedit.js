var div = document.getElementById('richedit')
div.contentEditable = 'true'

var button = document.getElementById('button')
button.onclick = function () {
    document.execCommand('bold', false, null)
}
