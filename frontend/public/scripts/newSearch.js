
(function ($) {

const ratingInput = document.getElementById('rating-search');
const ratingValue = document.getElementById('rating-value');
        // Update the displayed value when the slider changes
ratingValue.textContent = `average no less than ${ratingInput.value}`;
ratingInput.addEventListener('input', function() {
    ratingValue.textContent = `average no less than ${ratingInput.value}`;
});


let searchResult=$('#search-page-result-list');
let reqallsearch = {
    method:'GET',
    url: '/api/v1/spots',
};

$.ajax(reqallsearch).then(function(responseMessage){
    console.log(responseMessage["data"]);
    if (responseMessage['data']) {
        const resultlist=responseMessage['data'];
        resultlist.map((item) => {
        let element = $(
          `<a href='/api/v1/spots/${item.id}'>
                    <img src="${item.image}" alt="${item.name}" class='search-result-img'></a>
                    <h3>${item.name}</h3>
                    <p>Rating: ${item.ratingsAvg}</p>
                    <p>Location: ${item.location.address}</p>
                `
        );
        //append the todo to the page
        searchResult.append(element);
      });}

})

})(window.jQuery);


// const allsearch=async()=>{
//     try {
//         const response = await fetch((`http://localhost:3000/api/v1/spots/`), {
//             method: 'GET',
//         });
//         if (response.ok) {
//             //const data = await response.json();
//             //response should be an array of spots, each with the spot ID, the image, rating, distance, and the spot name
//             //example
//             return response["data"];
//         } else {
//             throw new Error('Internal Server Error');
//         }

//     } catch (e) {
//         throw e;
//     }
// };


// const newSearch = async (distance, rating, tag, lat,lon) => {
//     //TODO: IMPLEMENT THIS FUNCTION
//     // most likely implementaion vv
//     try {
//         // Send info to backend and get response
//         //http://localhost:3000/api/v1/spots/?ratings=4&distance=10mi&category=hockey
        

//         const response = await fetch((`http://localhost:3000/api/v1/spots/?ratings=${rating}&distance=${distance}&category=${tag}`), {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 'lat': lat,
//                 'lon': lon
//             }
//         });
    
//         if (response.ok) {
//             //const data = await response.json();
//             //response should be an array of spots, each with the spot ID, the image, rating, distance, and the spot name
//             //example
//             console.log(data);
//             return data;
//         } else {
//             throw new Error('Internal Server Error');
//         }
//     } catch (e) {
//         throw e
//     }

    
//         data = [//dummy data
//             {
//                 id: '123532235235',
//                 image: '/13879891887.jpeg',
//                 name: 'fishing spot',
//                 rating: 3, //equal or greater than search rating
//                 distance: 7 //less than or equal to search distance
//             },
//             {
//                 id: '123adsfas235',
//                 image: '/13879183.jpeg',
//                 name: 'Hiking spot',
//                 rating: 4,
//                 distance: 4 
//             }
//         ];
//         return data

        

// }