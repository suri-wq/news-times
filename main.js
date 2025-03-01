// API configuration
const API_KEY = ``;
let newsList = [];
// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
let url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );

// Pagination variables
let totalResults= 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;


// Selectors
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const menus = document.querySelectorAll(".menu button")

// Initialize Event Listeners
searchInput.addEventListener("input", ()=> searchBtn.disabled = searchInput.value.trim()==="");
searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && searchInput.value.trim()) {
        event.preventDefault(); 
        getNewsByKeyword();
    }
});
const keyword = searchInput.value.trim();


// Fetch news function
const getNews = async(keyword)=>{
    try {
        url.searchParams.set("page",page); 
        url.searchParams.set("pageSize",pageSize);
        
        const response = await fetch(url);
        const data = await response.json();
        
        if(response.status === 200){
            // no result
            if (data.articles.length===0){
                throw new Error (`검색하신 [${keyword}]에 해당하는 기사가 없습니다.`)
            }
            newsList = data.articles;
            totalResults = data.totalResults;
            render();
            if (totalResults>=1){
                paginationRender();
            }
            // paginationRender();
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
    page = 1;
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
      );
    await getNews();
}

// search by category
const getNewsByCategory = async(event)=>{
    page = 1;
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
    const paginationElement = document.querySelector(".pagination");
    const pageInfoElement = document.querySelector(".page-info"); 
    // page = 1;
    const keyword = searchInput.value.trim();
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`);
    paginationElement.style.display = "none"; 
    paginationElement.innerHTML = ""; 
    pageInfoElement.style.display = "none";
    pageInfoElement.innerHTML = "";
    if (!keyword) return;
    url = new URL(
        `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`
      );
    await getNews(keyword);
    searchInput.value = "";
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

const paginationRender=()=>{
    const paginationElement = document.querySelector(".pagination");
    const pageInfoElement = document.querySelector(".page-info"); 

    let paginationHTML = "";
    let pageInfoHTML = "";
    const totalPages = Math.ceil(totalResults / pageSize);
    
    paginationElement.style.display = "none";
    paginationElement.innerHTML = "";
    paginationElement.style.display = "flex";
    pageInfoElement.style.display = "none";
    pageInfoElement.innerHTML = "";
    pageInfoElement.style.display = "block";


    if (totalResults === 0 || totalPages < 1) return;

    const startArticle = (page - 1) * pageSize + 1;
    const endArticle = Math.min(page * pageSize, totalResults);

    pageInfoHTML = `<strong>${page}</strong> 페이지 &nbsp;| &nbsp;<strong> ${totalResults}</strong>개의 기사 중 &nbsp; <strong>${startArticle} - ${endArticle}</strong> `;

    const pageGroup = Math.ceil(page/groupSize);
    let lastPage = pageGroup * groupSize;
    if (lastPage > totalPages) {
      lastPage = totalPages;
    }
  
    let firstPage =
      lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);
  
    // const firstPage = lastPage - (groupSize-1)<=0? 1: lastPage - (groupSize -1);

    paginationHTML = `<li class="page-item" onclick="moveToPage(1)"  style="${page<=1?"display:none":''}"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span>
    </a></li>
    <li class="page-item" onclick="moveToPage(${page-1})" style="${page<=1?"display:none":''}"><a class="page-link" href="#" aria-label="Previous">
        &lt;
    </a></li>
    `;

    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML += `<li class="page-item ${i===page?"active":''}" onclick="moveToPage(${i})"><a class="page-link" href="#">${i}</a></li>`
    }

    paginationHTML += ` 
    <li class="page-item" onclick="moveToPage(${page+1})" style="${page===totalPages?"display:none":''}">
    <a class="page-link" href="#" aria-label="Next">
        &gt;
    </a>
    </li>
    <li class="page-item" onclick="moveToPage(${totalPages})" style="${page===totalPages?"display:none":''}">
    <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
    </a>
    </li>`
    
    
    
    paginationElement.innerHTML=paginationHTML
    pageInfoElement.innerHTML = pageInfoHTML

    
}

const moveToPage=(pageNum)=>{
    console.log("clicked",pageNum);
    page = pageNum;
    getNews();
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