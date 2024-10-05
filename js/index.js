// console.log('jkfdemnvvksrmkl')

// // Create button // //
const loadCreate = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCrete(data.categories))
    .catch(error => console.error(error));
}

const displayCrete = (categories) => {
    const add = document.getElementById('add');
    // console.log(categories);
    categories.forEach(item => {
        // console.log(item);

        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCreateVideos(${item.category_id })" class="btn">
        ${item.category}
        </button>
        `
        
        add.append(buttonContainer);
    });
   
  
}
loadCreate()


const loadCreateVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => displayVideo(data.category))
    .catch(error => console.error(error));
}

// //  Create videos // // 
const videoCreate = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideo(data.videos))
    .catch(error => console.error(error));
}

const loadDetails = async(videoId) => {
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);
}
 const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById('modal-box');
    detailContainer.innerHTML = `
        <img src=${video.thumbnail}/>
        <p>${video.description}</p>
    `
    // document.getElementById('showModalData').click():
    document.getElementById('myModal').showModal()
 }


const displayVideo = (videos) => {
    const videoCard = document.getElementById('videos');
    videoCard.innerHTML = "";
    if(videos.length == 0){
        videoCard.classList.remove('grid');
        videoCard.innerHTML = `
        <div class="flex flex-col min-h-[300px] gap-5 justify-center
        items-center">
        <img src="image/icon.png"/>
        <h2 class="text-xl font-semibold">No content Here in this Category</h2>
        </div>
        `
    }
    else{
        videoCard.classList.add('grid')
    }
    // console.log(videos)

    videos.forEach(video => { 
        console.log(video); 

        const div = document.createElement('div');
        div.classList = "card card-compact";
        div.innerHTML = `
    <figure class="h-[250px] relative">
        <img
        src=${video.thumbnail}
        class="w-full h-full object-cover"/>
        ${
            video.others.posted_date?.length == 0 ? ""
            : ` <span class="absolute right-2 bottom-2 bg-black text-white     rounded p-1">
                ${video.others.posted_date}
            </span>`
        }
       
    </figure>
    <div class="px-0 py-2 flex gap-2">
        <div>
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
        </div>
        <div>
        <h2 class="font-bold">${video.title} </h2>
        <div class="flex items-center gap-2">
        <p class="text-gray-400">${video.authors[0].profile_name}</p>
        ${
            video.authors[0].verified  == true ? 
           ` <img class="w-5 object-cover" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""            
        }
        </div>
        <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button></p>
        </div>
    
    </div>
        `
        videoCard.append(div);
        
    });
}
videoCreate()


// {
//     "category_id": "1001",
//     "video_id": "aaab",
//     "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//     "title": "Midnight Serenade",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//             "profile_name": "Noah Walker",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "543K",
//         "posted_date": ""
//     },
//     "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }



