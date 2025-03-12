function removeActiveButtons() {
    const activeBtnArr = document.getElementsByClassName("btn");

    for (let btn of activeBtnArr) {
        btn.classList.remove("active-btn");
    }
}


function loadAllVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((promise) => promise.json())
        .then((data) => {
            removeActiveButtons();
            const clickedButton = document.getElementById(`default-btn`);
            clickedButton.classList.add('active-btn')
            displayAllVideo(data.videos)
        })
}

function displayAllVideo(videoArr) {
    // parent element (video container)
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";

    for (let videoDetails of videoArr) {
        const videoTitle = videoDetails["title"];
        const thumbnailPic = videoDetails["thumbnail"];
        const authorPic = videoDetails["authors"][0]["profile_picture"];
        const authorName = videoDetails["authors"][0]["profile_name"];
        const viewCount = videoDetails["others"]["views"];

        // console.log(videoArr.)
        const videoCard = document.createElement("div");

        videoCard.innerHTML = `
        <div class="card bg-base-100">

            <div class="rounded-lg overflow-hidden">
                <img class="w-full h-56 object-cover" src="${thumbnailPic}" alt="Shoes">
            </div>

            <div>
                <div class="flex items-start gap-3 py-5">
                    <div class="avatar">
                        <div class="w-10 ring ring-gray-500 rounded-full ring-offset-2">
                            <img src="${authorPic}" />
                        </div>
                    </div>
                    <div class="space-y-2 w-full">
                        <h2 class="card-title leading-6">${videoTitle}</h2>
                        <div class="flex gap-2 items-center">
                            <p class="opacity-70">${authorName}</p>
                            <img src="./design/verified-icon.png" alt="Shoes">
                        </div>    
                        <p class="opacity-70">${viewCount}</p>

                    </div>

                </div>

            </div>
        </div>
        `
        videoContainer.appendChild(videoCard);

    }
}


function loadCategoryVideos(id) {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((promise) => promise.json())
        .then((data) => {
            removeActiveButtons();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add('active-btn')
            displayCategoryVideo(data.category);
        })
};

function displayCategoryVideo(categoryArr) {
    // console.log(categoryArr);

    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = "";

    for (let videoDetails of categoryArr) {
        const videoTitle = videoDetails["title"];
        const thumbnailPic = videoDetails["thumbnail"];
        const authorPic = videoDetails["authors"][0]["profile_picture"];
        const authorName = videoDetails["authors"][0]["profile_name"];
        const viewCount = videoDetails["others"]["views"];

        // console.log(videoArr.)
        const videoCard = document.createElement("div");

        videoCard.innerHTML = `
        <div class="card bg-base-100">

            <div class="rounded-lg overflow-hidden">
                <img class="w-full h-56 object-cover" src="${thumbnailPic}" alt="Shoes">
            </div>

            <div>
                <div class="flex items-start gap-3 py-5">
                    <div class="avatar">
                        <div class="w-12 ring ring-gray-500 rounded-full ring-offset-2">
                            <img src="${authorPic}" />
                        </div>
                    </div>
                    <div class="space-y-2 w-full">
                        <h2 class="card-title leading-6">${videoTitle}</h2>
                        <div class="flex gap-2 items-center">
                            <p class="opacity-70">${authorName}</p>
                            <img src="./design/verified-icon.png" alt="Shoes">
                        </div>    
                        <p class="opacity-70">${viewCount}</p>

                    </div>

                </div>

            </div>
        </div>
        `
        videoContainer.appendChild(videoCard);
    }
}


loadAllVideos();