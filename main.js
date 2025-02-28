// API configuration
const API_KEY = ``;
let newsList = [];
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
let url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );

// Selectors
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const menus = document.querySelectorAll(".menu button")

// Initialize Event Listeners
searchInput.addEventListener("input", ()=> searchBtn.disabled = searchInput.value.trim()==="");
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchInput.value.trim()) {
        event.preventDefault();  // ✅ Prevent default action (form submission)
        getNewsByKeyword();
    }
});


// Fetch news function
const getNews = async()=>{
    try {
        const response = await fetch(url);
        const data = await response.json();
        if(response.status === 200){
            // no result
            if (data.articles.length===0){
                throw new Error ("No result for this search")
            }
            newsList = data.articles;
            render();
            console.log(url)
        } else {
            throw new Error (data.message)
        }

    } catch (error) {
        errorRender(error.message)
    }
}

// search all
const getLatestNews = async()=>{
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
      );
    await getNews();
}

// search by category
const getNewsByCategory = async(event)=>{
    event.preventDefault();
    const category = event.target.textContent.toLowerCase();
    // url = new URL (`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`);
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`
      );
    console.log(category)
    await getNews();
}
document.querySelectorAll(".menus button").forEach(menu => menu.addEventListener("click", getNewsByCategory));
// menus.forEach((button) => button.addEventListener("click", getNewsByCategory));

// search by keyword
const getNewsByKeyword = async()=>{
    const keyword = searchInput.value.trim();
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
    if (!keyword) return;
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`
      );
    await getNews();
}
searchBtn.addEventListener("click", getNewsByKeyword);



const render=()=>{
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src=${news.urlToImage} onerror="this.onerror=null; this.src='https://img.freepik.com/premium-vector/modern-design-concept-no-image-found-design_637684-247.jpg?ga=GA1.1.1824244769.1739458494&semt=ais_hybrid';">
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

const errorRender = (errorMessage)=>{
    const errorHTML = ` <div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;
    document.getElementById("news-rows").innerHTML = errorHTML   
}


getLatestNews();




// Toggle Search Bar Visibility
function showSearch() {
    const searchElements = [searchInput, searchBtn];
    searchElements.forEach(el => el.style.display = el.style.display === "none" || !el.style.display ? "block" : "none");
}

// Sidebar Navigation
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
}