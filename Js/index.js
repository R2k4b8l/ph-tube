// alert('all loaded')

function loadCategories (){
    // Data fetch 
   
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then( (res => res.json()))
    .then( (data => displayCategories(data.categories)))
    
}

function loadVideos(){
    fetch ('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then( (res=> res.json() ))
    .then( (data=> displayVideos(data.videos) ))
}

function displayCategories(categories){

    const categoryContainer = document.getElementById('category-container');
    
    for ( let category of categories){
        console.log(category);

        // createElement
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<button class="btn btn-sm hover:bg-red-700  hover:text-white">${category.category}</button>
        `
       categoryContainer.append(categoryDiv);
       
       
    }
}

const displayVideos = (videos) =>{
     
    const videoContainer = document.getElementById('video-container');


   videos.forEach( (video) => {
    
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
                    <p class=" text-sm text-gray-400 flex gap-2">Rakibul hasan <img class="w-5"
                            src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000" alt=""> </p>

                    <p class="text-sm text-gray-400 ">${video.others.views } views</p>
                </div>


            </div>
        </div>

     `

     videoContainer.append(videoCard);
     


    

    
   });
    
     


}

loadCategories();
loadVideos();  


alert("hello i'm here");