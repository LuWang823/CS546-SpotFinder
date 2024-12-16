
(function ($) {

    function validateSearch(distance, rating, tag) {
        // if (distance == null && rating == null && tag == null) {
        //     throw new Error('At least one search parameter must be provided');
        // }
        if (distance !== null) {
            if (typeof distance !== 'number') {
                throw new Error('distance must be a number')
            }
            if (distance <= 0 || distance > 500) {
                throw new Error('distance out of range')
            }
        }
    
        if (rating !== null) {
            if (typeof rating !== 'number') {
                throw new Error('rating must be a number')
            }
            if (rating < 1 || rating > 5) {
                throw new Error('rating out of range')
            }
        }
    
        if (tag !== null) {
            if(tag.trim() === ''){
                throw new Error('tag cannot be empty string')
            }
            tag = tag.trim()
            const regex = /^\s*[a-zA-Z0-9_-]+\s*$/;
            if (!regex.test(tag)) {
                throw new Error("tag must be a single alphanumeric term with optional dashes or underscores");
            }
        }
    }

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
    if (responseMessage['data']) {
        // console.log(responseMessage['data']);
        const resultlist=responseMessage['data'];
        resultlist.map((item) => {
        let element = $(
          `<a href='/spots/${item._id}'>
                    <img src="${item.image}" alt="${item.name}" class='search-result-img'></a>
           <div class="search-result-text">         
           <h3>${item.name}</h3>
           <p>Rating: ${item.ratingsAvg}</p>
           <p>Location: ${item.location.address}</p>
           </div>`
        );
        //append the todo to the page
        searchResult.append(element);
      });}

})

let tagarea=$('#search-tag');
let tagsurl={
    method: "GET",
    url: '/api/hobbies',
}

$.ajax(tagsurl).then(function(responseMessage){
    if (responseMessage['hobbies']) {
    const taglist=responseMessage['hobbies'];

    tagarea.empty(); // Clear existing content

    // Append each hobby as an <li> element
    taglist.forEach(function (hobby, index) {
    const tagElement = document.createElement("input");
          tagElement.setAttribute("type", "radio");
          tagElement.setAttribute("name", "hobby"); // Group all radio buttons
          tagElement.setAttribute("id", `hobby-${index}`); // Unique ID for each radio
          tagElement.setAttribute("value", hobby);
          // Create a label for the radio button
          const label = document.createElement("label");
          label.setAttribute("for", `hobby-${index}`); // Associate label with radio
          label.textContent = hobby;

          // Append the radio button and label to the tag area
          tagarea.append(tagElement);
          tagarea.append(label);
          tagarea.append("<br>");
    });
    }})

let distance=$('#search-distance');
let rating=$('rating-search');
let hobbyselected=document.querySelector('input[name="hobby"]:checked');


if ((distance != null || rating != null || hobbyselected != null)) {
    validateSearch(parseInt(distance), parseInt(rating), hobbyselected);
    searchResult.empty();
    let reqrawsearch = {
        method:'GET',
        url: '/api/v1/spots',
    };

    
}





})(window.jQuery);


// const allsearch=async()=>
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