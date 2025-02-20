const API_KEY = `a06fc92583d340f7b2cf962b0eede9ec`
let news = []
const getLatestNews =async ()=>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?q=trump&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("rrr", news);
}

getLatestNews();