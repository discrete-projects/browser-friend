const content = [];
const renderContentArr = [];

const sourceSorter = (newsObject, index) => {
    let articles = newsObject.articles;
    for (let i = 0; i < 3; i++) {
        let articleInfo = {};
        articleInfo.description = articles[i].description;
        articleInfo.title = articles[i].title;
        articleInfo.url = articles[i].url;
        articleInfo.urlToImage = articles[i].urlToImage;
        articleInfo.publishedAt = articles[i].publishedAt;
        articleInfo.content = articles[i].content;
        content.push(articleInfo);
    }
};

const randomize = () => {
    while (content.length > 0) {
        let index = Math.floor( Math.random()*content.length);
        renderContentArr.push(content[index]);
        content.splice(index, 1);
    }
    renderContent(renderContentArr);
};


const getTimeOfDay = () => {
    let hour = new Date().getHours();
    const timeOfDayText = document.querySelector('#timeOfDay');

    if (hour > 0 && hour < 12) {
        timeOfDayText.innerHTML = 'Morning!';
    } else if ( hour < 17) {
        timeOfDayText.innerHTML = 'Afternoon!';
    } else {
        timeOfDayText.innerHTML = 'Evening';
    }
};


const renderContent = (contentArray) => {
    let first = document.querySelector('#firstCol');
    let second = document.querySelector('#secondCol');
    let third = document.querySelector('#thirdCol');
    let contentArraySplit = contentArray.length/3;
    getTimeOfDay();


    for (let i = 0; i < contentArray.length; i++) {
        if (i < contentArraySplit) {
            first.insertAdjacentHTML('afterbegin', `<article><img class="article-img" src="${contentArray[i].urlToImage}"/> <a href="${contentArray[i].url}"><h1>${contentArray[i].title}</h1></a><article>`);
        }
        else if (i < contentArraySplit*2 ) {
            second.insertAdjacentHTML('afterbegin', `<article><img class="article-img" src="${contentArray[i].urlToImage}"/> <a href="${contentArray[i].url}"><h1>${contentArray[i].title}</h1></a></article>`);
        }
        else {
            third.insertAdjacentHTML('afterbegin', `<article><img class="article-img" src="${contentArray[i].urlToImage}"/>  <a href="${contentArray[i].url}"><h1>${contentArray[i].title}</h1></a><article>`);
        }
    }
};

// const randomizeArticleSize = () => {
//     document.querySelectorAll
// };

const updateWeather = (temp) => {
    console.log(temp)
    let weatherTxt = temp[0].WeatherText;
    let weatherTemp = temp[0].Temperature.Imperial.Value;
    document.querySelector('#weatherTxt').innerHTML = weatherTxt;
    document.querySelector('#weatherTemp').innerHTML = weatherTemp;
};

onDOMContentLoaded = (function () {
  let sourcesArr = ['sources=fox-news', 'sources=the-huffington-post', 'sources=the-new-york-times', 'sources=cnn', 'sources=the-wall-street-journal'];

  sourcesArr.forEach( (cur, idx) => {
    fetch('https://newsapi.org/v2/top-headlines?' + cur + '&apiKey=a1b1b28b04e84e59bb7e05ac628358e5')
      .then(
        function (response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            return;
          }
          // Examine the text in the response
          response.json().then(function (cur) {
            sourceSorter(cur, idx);
          });
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  });

  fetch('http://dataservice.accuweather.com/currentconditions/v1/349727?apikey=SnsfqfGwrrzisDqIrkFReUCRQApD6UPf')
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.json().then(function (data) {
        updateWeather(data);
      });
    }
  )
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });

  setTimeout(randomize, 500);
})();

