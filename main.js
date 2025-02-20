// news 
// let newsArea = document.getElementById("news-area");

// API
const API_KEY = `a06fc92583d340f7b2cf962b0eede9ec`
let news = []
const getLatestNews =async ()=>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?q=trump&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("rrr", news);
    render();
}

getLatestNews();



function render(){
    let resultHTML = '';

    for (let i=0;i<news.length;i++){
        resultHTML += `
            <div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${news[i].urlToImage}" alt="">
                </div>
                <div class="col-lg-8">
                    <h2>${news[i].title}</h2>
                    <p>
                        ${news[i].description}
                    </p>
                    <div>
                        ${news[i].source.name} ${news[i].publishedAt}
                    </div>
                </div>
            </div>    
                `
    }
    document.getElementById("news-rows").innerHTML=resultHTML;
    console.log(news.length)
}


