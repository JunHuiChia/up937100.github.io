var proxyurl = 'https://cors-anywhere.herokuapp.com/'
var targeturl = 'https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=en-UK'

fetch(proxyurl + targeturl).then(
    function(response){
        if(response.status !== 200){
            console.log("There was a problem. Status Code: " + response.status);
            return;
        }
        response.json().then(function(data){
            var backgroundURL = data;
            document.querySelector('img').src = backgroundURL.url;
        })
    }
).catch(function(err){
    console.log('error: ', err);
})

