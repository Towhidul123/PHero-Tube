const handleCategory = async () => {

    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const tabContainer = document.getElementById("tab-container");

    data.data.forEach((category) => {
        const div = document.createElement("div");

        const button = document.createElement("button");
        button.textContent = category.category;
        button.className = "btn btn-xs sm:btn-sm md:btn-md lg:btn-lg";
        button.onclick = () => {
           
            const buttons = tabContainer.querySelectorAll("button");
            buttons.forEach((btn) => btn.classList.remove("active"));
            buttons.forEach((btn) => btn.classList.remove("text-[white]"));
         
            button.classList.add("active");
            button.classList.add('text-[white]')
            handleLoadVideos(category.category_id);
        };
        
        div.appendChild(button);
        tabContainer.appendChild(div);
    });



    // console.log(data.data)

};


const handleLoadVideos = async (categoryId) => {
    console.log(categoryId);
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();

    const cardContainer = document.getElementById("card-container");

    // no repetition
    cardContainer.innerHTML = "";

    // console.log(data.data)

    if (!data?.data || data?.data?.length === 0) {
        
        cardContainer.classList.remove("grid");
        cardContainer.classList.remove("sm:grid-cols-1");
        cardContainer.classList.remove("md:grid-cols-2");
        cardContainer.classList.remove("lg:grid-cols-4");
    
       
        const div = document.createElement('div');
        div.innerHTML = `
       <div class="flex justify-center items-center h-screen">
            <div class=" flex flex-col justify-center items-center text-center">
                <div class=" mb-8 " >
                    <img class="flex place-items-center place-content-center" src="Icon.png" alt="">
                    
                </div>
                <h2 class=" text-[32px] font-bold">Oops!! Sorry, There is no <br> content here</h2>
            </div>
       </div>
        `;
        cardContainer.appendChild(div);
    }

    else {

        cardContainer.classList.add("grid");
        cardContainer.classList.add("sm:grid-cols-1");
        cardContainer.classList.add("md:grid-cols-2");
        cardContainer.classList.add("lg:grid-cols-4");



        data?.data?.forEach((videos) => {

            const div = document.createElement('div');


            div.innerHTML = `
        
        <div class=" mb-6 card 2xl:w-[342px] lg:w-[242px] md:w-[200px]  bg-base-100  ">

            
            <figure class="relative 2xl:w-[auto] 2xl:h-[200px] lg:w-[auto] lg:h-[150px] md:w-[auto] md:h-[125px] rounded-lg" >
                    <img class="object-cover w-full h-full rounded-lg " src="${videos?.thumbnail}" alt="Pic" />
               
                    ${videos?.others?.posted_date ?
                    `
                                <div class="mb-1 mr-1 absolute right-1 bottom-1 rounded-[4px] p-1 bg-[#171717] text-[10px] font-normal text-white">
                                    ${convertSecondsToHoursAndSeconds(videos.others.posted_date)}
                                </div>
                         ` : ''
                }

            </figure>

               
          

            <div class=" flex mt-5">
                    <div class= "avatar mr-3">
                      <div class="w-10 h-10 rounded-full ">
                        <img src="${videos.authors[0].profile_picture}" alt="">
                      </div>

                    </div>  

                  

                    <div>
                        <h2 class="font-bold text-base card-title mb-2">${videos.title}</h2>
                        <p class="flex font-normal text-sm mb-2 ">${videos?.authors[0]?.profile_name}<span class="pl-2">${videos?.authors[0]?.verified ? '<img src="verify.svg" alt="">' : ''}</span></p>
                        <p class="font-normal text-sm views">${videos?.others?.views}<span class="font-normal text-sm views"> Views</span></p>
                    </div>

            </div>
        </div>
        
        `;
            cardContainer.appendChild(div);


        });
    }


    // Sorting functionality
    document.getElementById("sort-by-views-btn").addEventListener("click", () => {
        sortVideosByViews();
    });


    function sortVideosByViews() {
        const cardContainer = document.getElementById("card-container");
        const videoElements = Array.from(cardContainer.getElementsByClassName("card"));
        videoElements.sort((a, b) => {
            const viewsA = parseInt(a.querySelector(".views").textContent, 10);
            const viewsB = parseInt(b.querySelector(".views").textContent, 10);
            return viewsB - viewsA;
        });
        cardContainer.innerHTML = "";
        videoElements.forEach((videoElement) => {
            cardContainer.appendChild(videoElement);
        });
    }



    function convertSecondsToHoursAndSeconds(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        const remainingSecondsFinal = remainingSeconds % 60;


        return (`${hours}hrs ${minutes}min ago`);
    }



    // console.log(data.data)
}





handleCategory()
handleLoadVideos("1000")