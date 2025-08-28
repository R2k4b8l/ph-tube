// loader
const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}
const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("video-container").classList.remove("hidden");
}
function removeActiveClass() {
    const activeBtn = document.getElementsByClassName("active")
    // console.log(activeBtn);
    for (let btn of activeBtn) {
        btn.classList.remove("active")
        // console.log(btn);

    }
}



// All Api fetch
function loadCategories() {
    // Data fetch 

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res => res.json()))
        .then((data => displayCategories(data.categories)))

}

function loadVideos(searchText = "") {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then((res => res.json()))
        .then((data) => {
            document.getElementById("btns-all").classList.add("active")
            displayVideos(data.videos)

        })
}

function displayCategories(categories) {

    const categoryContainer = document.getElementById('category-container');

    for (let category of categories) {
        console.log(category);

        // createElement
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})"  class="btn btn-sm hover:bg-red-700  hover:text-white">${category.category}</button>
        `
        categoryContainer.append(categoryDiv);


    }
}


const loadCategoryVideos = (id) => {
    showLoader();

    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeActiveClass();
            const clickButton = document.getElementById(`btn-${id}`);
            // console.log(clickButton);
            clickButton.classList.add("active");

            displayVideos(data.category)
        });
}

// loadVideoDetails

const loadVideoDetails = (videoId) => {
    // console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayVideoDetails(data.video))

}

const displayVideoDetails = (video) => {
    console.log(video);
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `<p class="py-4">${video.title} </p>

<div class="card bg-base-100  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="img" />
  </figure>
  <div class="card-body">
    <h2 class="card-title"> Video Details </h2>
    <p>${video.video_id}</p>
  </div>
</div>

    `


}

const displayVideos = (videos) => {

    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col text-center items-center py-8">
            <img class=" w-[160px]" src="img/Icon.png" alt="">

            <h2 class="text-2xl font-bold  py-4">Oops!! Sorry, There is no content here  MR.Reday</h2>

        </div>
    `
        hideLoader();
        return;
    }


    videos.forEach((video) => {

        const videoCard = document.createElement('div');
        videoCard.innerHTML = `  
     <div class="card ">
            <figure class="relative">
                <img class=" w-full h-[160px] object-cover" src="${video.thumbnail}" />
                <span class="absolute bottom-3 right-2 text-sm text-white bg-black px-2 rounded">3hrs 56 min ago</span>

            </figure>
            <div class=" flex gap-3 px-1 py-5">
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-7 rounded-full ring-2 ring-offset-2">
                            <img src="${video.authors[0].profile_picture}" />
                        </div> 
                    </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">${video.title}</h2>
                    <p class=" text-sm text-gray-400 flex gap-2"> ${video.authors[0].profile_name}<img class="w-5"
                            src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" alt=""> </p>

                    <p class="text-sm text-gray-400 ">${video.others.views} views</p>
                </div>
            </div> 
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block"> Show Details </button>
        </div>

     `
        videoContainer.append(videoCard);

    });

    hideLoader();
};

document.getElementById("srarch-input").addEventListener('keyup', (e) => {
    const input = e.target.value;
    loadVideos(input);


})

loadCategories();  