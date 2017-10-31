function closeTheme() {
    setTimeout(function(){
        document.getElementsByClassName("theme-area")[0].style.display = 'none';
    }, 100);

    setTimeout(function(){
        document.getElementsByClassName("balloon-area")[0].style.display = 'block';
        document.getElementsByClassName("write-area")[0].style.display = 'block';
    }, 250);
}