// news 
// let newsArea = document.getElementById("news-area");

let category = ''
let categoryBtn = document.querySelectorAll(".menus button")

categoryBtn.forEach(function(category){
    category.addEventListener("click",function(event){
        filterNews(event);
    })
})

const filterNews=(e)=>{
    if (e) {
        let selectedCategory = e.target.textContent.trim().toLowerCase();
        category = selectedCategory;
        console.log("선택한 카테고리", category)
        getLatestNews()
    }
}

// url = new URL(
//     `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
//   );



// API
const API_KEY = `a06fc92583d340f7b2cf962b0eede9ec`
let newsList = []
let keyword = 'etf'
const getLatestNews =async ()=>{
    // const url = new URL(`https://newsapi.org/v2/top-headlines?q=${keyword}&apiKey=${API_KEY}`);
    const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=10`)
    if (category) {
        url.searchParams.append("category", category);
    }
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    console.log("rrr", newsList);
    console.log("url",url)
    console.log("category",category)
    render();
}

getLatestNews();

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
                        ${news.source.publisher || "no source"} * ${moment(news.publishedAt).fromNow()}
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


