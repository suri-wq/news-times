// news 
// let newsArea = document.getElementById("news-area");

// API
const API_KEY = `a06fc92583d340f7b2cf962b0eede9ec`
let newsList = []
const getLatestNews =async ()=>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?q=etf&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    console.log("rrr", newsList);
    render();
}

getLatestNews();


const render=()=>{
    const newsHTML = newsList.map(
        (news) => `<div class="row news">
                <div class="col-lg-4">
                    <img class="news-img-size" src="${news.urlToImage || "https://www.google.com/imgres?q=image%20not%20available&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D100066391555131&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fphoto.php%3Ffbid%3D5427040920646696%26id%3D855398481144319%26set%3Da.855403197810514&docid=pgXAZeZ_tbk0pM&tbnid=F8QfTsu4hF5GbM&vet=12ahUKEwjf_dPm7tSLAxVQdfUHHTmJI0EQM3oFCIYBEAA..i&w=909&h=909&hcb=2&ved=2ahUKEwjf_dPm7tSLAxVQdfUHHTmJI0EQM3oFCIYBEAA"}" alt="">
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


