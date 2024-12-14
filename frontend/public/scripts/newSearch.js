const newSearch = async (distance, rating, tag, lat,lon) => {
    //TODO: IMPLEMENT THIS FUNCTION
    // most likely implementaion vv
    try {
        // Send info to backend and get response
        //http://localhost:3000/api/v1/spots/?ratings=4&distance=10mi&category=hockey
        const response = await fetch((`http://localhost:3000/api/v1/spots/?ratings=${rating}&distance=${distance}&category=${tag}`), {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'lat': lat,
                'lon': lon
            }
        });
    
        if (response.ok) {
            //const data = await response.json();
            //response should be an array of spots, each with the spot ID, the image, rating, distance, and the spot name
            //example
            return data
        } else {
            throw new Error('Internal Server Error');
        }
    } catch (e) {
        throw e
    }

        data = [//dummy data
            {
                id: '123532235235',
                image: '/13879891887.jpeg',
                name: 'fishing spot',
                rating: 3, //equal or greater than search rating
                distance: 7 //less than or equal to search distance
            },
            {
                id: '123adsfas235',
                image: '/13879183.jpeg',
                name: 'Hiking spot',
                rating: 4,
                distance: 4 
            }
        ];
        return data
}