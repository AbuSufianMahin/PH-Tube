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
        const verified = videoDetails["authors"][0]["verified"];
        const videoId = videoDetails["video_id"];

        // console.log(videoArr.)
        const videoCard = document.createElement("div");

        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-lg">

            <div class="rounded-lg overflow-hidden">
                <img class="w-full h-56 object-cover" src="${thumbnailPic}" alt="Thumbnail">
            </div>

            <div>
                <div class="flex items-start gap-3 py-5 px-2">
                    <div class="avatar">
                        <div class="w-10 ring ring-gray-500 rounded-full ring-offset-2">
                            <img src="${authorPic}" />
                        </div>
                    </div>
                    <div class="space-y-2 w-full">
                        <h2 class="card-title leading-6">${videoTitle}</h2>
                        <div class="flex gap-2 items-center">
                            <p class="opacity-70">${authorName}</p>
                            ${verified == true ? `<img src="./design/verified-icon.png" alt="verified">` : ``}
                        </div>    
                        <p class="opacity-70">${viewCount}</p>
                        
                    </div>
                </div>
                <div class="flex justify-center mb-5">
                    <button onclick="loadVideoDetails('${videoId}')" class="btn btn-wide hover:bg-red-500 hover:text-white">Show Details</button>
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

    if (categoryArr.length === 0) {
        videoContainer.innerHTML = `
        <div class="col-span-4">
            <div class="mt-20 max-w-96 mx-auto flex flex-col justify-center items-center">
                <img src="./design/Icon.png" alt="">
                <p class="text-3xl font-bold text-center">Oops!! Sorry, There is no content here</p>
            </div>
        </div>
        `
        return;
    }

    for (let videoDetails of categoryArr) {
        const videoTitle = videoDetails["title"];
        const thumbnailPic = videoDetails["thumbnail"];
        const authorPic = videoDetails["authors"][0]["profile_picture"];
        const authorName = videoDetails["authors"][0]["profile_name"];
        const viewCount = videoDetails["others"]["views"];
        const verified = videoDetails["authors"][0]["verified"];

        const videoId = videoDetails["video_id"];

        // console.log(videoId)
        const videoCard = document.createElement("div");

        videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-lg">

            <div class="rounded-lg overflow-hidden">
                <img class="w-full h-56 object-cover" src="${thumbnailPic}" alt="Thumbnail">
            </div>

            <div>
                <div class="flex items-start gap-3 py-5 px-2">
                    <div class="avatar">
                        <div class="w-10 ring ring-gray-500 rounded-full ring-offset-2">
                            <img src="${authorPic}" />
                        </div>
                    </div>
                    <div class="space-y-2 w-full">
                        <h2 class="card-title leading-6">${videoTitle}</h2>
                        <div class="flex gap-2 items-center">
                            <p class="opacity-70">${authorName}</p>
                            ${verified == true ? `<img src="./design/verified-icon.png" alt="verified">` : ``}
                        </div>    
                        <p class="opacity-70">${viewCount}</p>

                    </div>
                </div>
                <div class="flex justify-center mb-5">
                    <button onclick="loadVideoDetails('${videoId}')" class="btn btn-wide hover:bg-red-500 hover:text-white">Show Details</button>
                </div>

            </div>
        </div>
        `
        videoContainer.appendChild(videoCard);
    }
}

function loadVideoDetails(videoId) {
    // console.log(videoId);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
        .then((promise) => promise.json())
        .then((data) => displayVideoDetails(data.video))

    console.log("CLICKED")
}

function displayVideoDetails(videoDetailsObj){
    // console.log(videoDetailsObj)
    const thumbnail = videoDetailsObj.thumbnail;
    const title = videoDetailsObj.title;
    const description = videoDetailsObj.description;

    const detailsContainer = document.getElementById("details-container");
    document.getElementById("video_description_modal").showModal();


    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
        <figure>
            <img class="object-cover" src="${thumbnail}" alt="Video description" /></figure>
            <div class="card-body p-10 text-justify">
                <h2 class="card-title text-4xl">${title}</h2>
                <p>${description}</p>
            </div>
    </div>
    `

    
}

loadAllVideos();