

// Search area
function showSearch() {
    let searchInput = document.getElementById("searchInput");
    let searchBtn = document.getElementById("searchBtn");
    if (searchInput.style.display === "none" || searchInput.style.display === "") {
        searchInput.style.display = "block";
        searchBtn.style.display = "block";
    } else {
        searchInput.style.display = "none";
        searchBtn.style.display = "none";
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
}





// API
const API_KEY = `a06fc92583d340f7b2cf962b0eede9ec`
let newsList = []
const menus = document.querySelectorAll(".menus button")
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

const searchInput = document.getElementById("searchInput")
const searchBtn = document.getElementById("searchBtn")

const searchKeyword =async()=>{
    const keyword = searchInput.value.trim();
    if (searchInput === "") return;
    const url = new URL(`https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log(url)
    console.log("articles",data.articles)
    // newsList = Array.isArray(data.articles)? data.articles : [];
    newsList = data.articles;
    console.log("newslist",newsList)
    render();
}


searchInput.addEventListener("input",function(){
    searchBtn.disabled = searchInput.value.trim() === "";
})

searchInput.addEventListener("keypress",function(event){
    if (event.key === "Enter"&& searchInput.value.trim() !==""){
        searchKeyword();
    }
})

searchBtn.addEventListener("click",searchKeyword)
searchBtn.disabled = true;



const getLatestNews =async ()=>{
    // newsapi url
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    // 과제 제출용 url
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=10`)

    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    console.log("rrr", newsList);
    console.log("url",url)
    render();
}
getLatestNews();

const getNewsByCategory=async (event)=>{
    const category = event.target.textContent.toLowerCase();
    console.log("category");
    const url = new URL(`https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`);

    const response = await fetch(url)
    const data = await response.json()
    console.log("ddd",data)
    newsList = data.articles;
    render();
}


const render=()=>{
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${news.urlToImage || "https://img.freepik.com/premium-vector/modern-design-concept-no-image-found-design_637684-247.jpg?ga=GA1.1.1824244769.1739458494&semt=ais_hybrid"}" alt="">
                </div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>
                        ${news.description == null || news.description == ""?"내용없음":news.description.length > 200?news.description.substring(0,200)+"...":news.description}
                       
                    </p>
                    <div>
                        ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
                    </div>
                </div>
            </div>`
    ).join(" ");
    document.getElementById("news-rows").innerHTML = newsHTML;
}

// function render(){
//     let resultHTML = '';

//     for (let i=0;i<newsList.length;i++){
//         resultHTML += `
//             <div class="row news">
//                 <div class="col-lg-4">
//                     <img class="news-img-size" src="${news[i].urlToImage}" alt="">
//                 </div>
//                 <div class="col-lg-8">
//                     <h2>${newsList[i].title}</h2>
//                     <p>
//                         ${newsList[i].description}
//                     </p>
//                     <div>
//                         ${newsList[i].source.name} ${newsList[i].publishedAt}
//                     </div>
//                 </div>
//             </div>    
//                 `
//     }
//     document.getElementById("news-rows").innerHTML=resultHTML;
//     console.log(newsList.length)
// }


