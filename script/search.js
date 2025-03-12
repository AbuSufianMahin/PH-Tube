document.getElementById("search-box").addEventListener("keyup", function(event){
    const inputString = event.target.value;
    loadAllVideos(inputString);
})