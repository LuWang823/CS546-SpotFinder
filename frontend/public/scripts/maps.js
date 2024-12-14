// Initialize the map
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

console.log('Map initialized:', map);

// Function to get user location
const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
};

// Function to fetch spots data
const fetchSpots = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/spots`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                Refresh: `Bearer ${localStorage.getItem('refreshToken')}`
            }
        });

        if (response.ok) {
            let data = await response.json();
            console.log('Fetched spots data:', data); // Debugging statement
            return data.data; // Extract the array of spots from the response
        } else {
            throw new Error('Internal Server Error');
        }
    } catch (e) {
        console.error('Error fetching spots:', e);
        throw e;
    }
};

// Function to add markers to the map
const addMarkersToMap = (spots) => {
    if (!Array.isArray(spots)) {
        console.error('Spots data is not an array:', spots);
        return;
    }

    spots.forEach(spot => {
        console.log('Adding marker for spot:', spot); // Debugging statement
        const marker = L.marker([spot.location.coordinates[0], spot.location.coordinates[1]])
            .addTo(map)
            .bindPopup(`
                <b>${spot.name}</b><br>
                Rating: ${spot.ratingsAvg}<br>
                Distance: ${spot.distance || 'N/A'} miles<br>
                <a href="/spots/${spot._id}">View Details</a>
            `);
        
        // Open the popup when the marker is clicked
        marker.on('click', () => {
            marker.openPopup();
        });
    });
};

// Main function to initialize the map with user location and spots data
const initMap = async () => {
    try {
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;
        console.log('User location:', { latitude, longitude });
        map.setView([latitude, longitude], 13);

        // Add marker for current location
        const currentLocationMarker = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`<b>Your Location</b>`);
        
        // Open the popup for the current location marker
        currentLocationMarker.on('click', () => {
            currentLocationMarker.openPopup();
        });

        const spots = await fetchSpots();
        console.log('Spots:', spots); // Debugging statement
        addMarkersToMap(spots);
    } catch (e) {
        console.error('Error initializing map:', e);
    }
};

// Initialize the map
initMap();