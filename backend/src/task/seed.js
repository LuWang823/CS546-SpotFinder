import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import User from "../modules/userModule.js";
import Spot from "../modules/spotModule.js";
import Session from "../modules/sessionModule.js";
import Review from "../modules/reviewModule.js";


// Load environment variables dynamically based on NODE_ENV

dotenv.config({ path: `./config/${process.env.NODE_ENV || "development"}.env` });


const seedData = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected!");

    // Clear existing data
    await User.deleteMany();
    console.log("Previous Spot data cleared!");

    try {

        const user1 = await User.create(
            {
                name: "John Doe",
                email: "johndoe@example.com",
                password: "password123", 
                image: "0f8a56e3-17c1-480f-9e94-3ad064408c9f.jpeg",
                address: "123 Main St, Philadelphia, PA",
                
            });
        
        const user2 = await User.create(
            {
                name: "Jane Smith",
                email: "janesmith@example.com",
                password: "mypassword456", 
                image: "1f0f1546-4d76-4e66-8637-2b243117bec9.jpeg",
                address: "456 Oak St, Philadelphia, PA",
                    
            });
        
        const user3 = await User.create(
            {
                name: "Alice Johnson",
                email: "alicejohnson@example.com",
                password: "alicepass789", 
                image: "b2ce37c4-8b0f-4eae-8ce7-e139214a72f5.jpeg",
                address: "789 Pine St, Philadelphia, PA",
                        
            });
        
        const user4 = await User.create(
            {
                name: "Guess Who",
                email:"Guesswho@example.com",
                password: "password",
                image: "fa3670d6-55c9-42b1-b249-2bc379af835d.jpeg",
                address: "Hoboken, NJ",
                                    
            });
        
        const user5 = await User.create(
            {
                name: "Lu Wang",
                email: "lwang97@stevens.edu",
                password: "Iforget",
                image: "1d977e73-e834-45de-81d1-db9a1dbdfaab.jpeg",
                address: "Hoboken, NJ",
                            
            });
        
        

        const sessions = [
            {
                user: user1._id,
                valid: true,
            },
            {
                user: user2._id,
                valid: true,
            },
            {
                user: user3._id,
                valid: false,
            },
            {
                user: user4._id,
                valid: false,
            },
            {
                user: user5._id,
                valid: true,
            },
        ];

        const spots = [
            {
                name: "Stephen R. Gregg Park",
                hobby: ["Walking", "Picnicking", "Jogging", "Birdwatching", "Biking"],
                image: "uploads/spots/7f55a26f-2b1c-461e-98cc-2d25ab18d35a.jpeg",
                description: "Stephen R. Gregg Park is a large urban park in Bayonne, NJ, offering scenic views, walking trails, playgrounds, and sports facilities. It is a popular spot for outdoor activities, family gatherings, and relaxation, with beautiful waterfront areas and ample green spaces.",
                location: {
                  coordinates: [40.684677919807264, -74.11497449418061],
                  address: "930 John F. Kennedy Blvd, Bayonne, NJ 07002",
                },
                ratingsAvg: 4.8,
                ratingsTotal: 150,
                user: user5._id.toString(),
            },
            {
                name: "Artistic Haven",
                hobby: ["Art", "Sketching"],
                image: "uploads/spots/1f0f1546-4d76-4e66-8637-2b243117bec9.jpeg",
                description: "A tranquil spot for artists to find inspiration.",
                location: {
                    coordinates: [-74.0059, 40.7128],
                    address: "456 Creative Lane, Art City, NY",
                },
                ratingsAvg: 4.5,
                ratingsTotal: 80,
                user:"5f8e14b9b9b85f16e9d39de4", 

            },
            {
                name: "Culinary Delight",
                hobby: ["Cooking", "Food Tasting"],
                image: "uploads/spots/b2ce37c4-8b0f-4eae-8ce7-e139214a72f5.jpeg",
                description: "A spot for food lovers to explore and savor flavors.",
                location: {
                    coordinates: [-118.2437, 34.0522],
                    address: "789 Flavor Blvd, Food City, CA",
                },
                ratingsAvg: 4.7,
                ratingsTotal: 120,
                user:"6037f721d7e6f28a1d2e6a1b",

            },
            {
                name: "Gastronomy Haven",
                hobby: ["Cooking", "Food Exploration", "Baking"],
                image: "uploads/spots/fa3670d6-55c9-42b1-b249-2bc379af835d.jpeg", // Updated image path
                description: "A place for food enthusiasts to explore new recipes and flavors.",
                location: {
                    coordinates: [-122.4194, 37.7749], 
                    address: "101 Culinary Lane, San Francisco, CA",
                },
                ratingsAvg: 4.9,
                ratingsTotal: 200,
                user: "60ca1f9f86f8d8a2b02cc496",
            },
            {
                name: "Tasteful Adventures",
                hobby: ["Food Tasting", "Baking", "Exploring Local Cuisine"],
                image: "uploads/spots/1d977e73-e834-45de-81d1-db9a1dbdfaab.jpeg", // Updated image path
                description: "A spot to indulge in unique food tasting experiences and discover hidden gems.",
                location: {
                    coordinates: [-118.2453, 34.0522], // Changed coordinates (Los Angeles, CA)
                    address: "456 Savory Street, Los Angeles, CA",
                },
                ratingsAvg: 4.8,
                ratingsTotal: 150,
                user: "602b7b48d79b4b93b0f9036f",
            },
        ];

        const reviews = [
            {
                spot: "60b6a6fabc13f35db407f7c4",
                user: "602b7b48d79b4b93b0f9036f",
                description: "This is a beautiful spot with breathtaking views. Highly recommend it!",
                ratings: 5,
            },
            {
                spot: "60b6a6fabc13f35db407f7c4",
                user: "602b7b48d79b4b93b0f9036f",
                description: "A great spot for food lovers! The ambiance is perfect for a casual outing, and the food is delicious. I did think the service could have been a bit quicker, but overall, it was a great experience. The chocolate lava cake is a must-try!",
                ratings: 5,

            },
            {
                spot: "60b6a6fabc13f35db407f7c4",
                user: "602b7b48d79b4b93b0f9036f",
                description: "This place is absolutely amazing! The variety of dishes is incredible, and the flavors are unbeatable. I especially loved the grilled salmon—it was cooked to perfection. Highly recommend to anyone who loves gourmet food",
                ratings: 5,

            },
            {
                spot: "60b6a6fabc13f35db407f7cb",
                user: "602b7b48d79b4b93b0f9036f",
                description: "This is a beautiful spot with breathtaking views. Highly recommend it!",
                ratings: 5,

            },
            {
                spot: "60b6a6fabc13f35db407f7cb",
                user: "60ca1f9f86f8d8a2b02cc496",
                description: "A wonderful place for a family dinner! The kids loved the pasta, and I had an amazing steak. The staff was friendly and attentive. The only downside was the long wait, but the food definitely made up for it. Will be coming back soon!",
                ratings: 5,

            },
        ];
    
       


    // Insert seed user data
    await Session.insertMany(sessions);
    console.log("Seed session data inserted successfully!");


    // Insert seed spot data
    await Spot.insertMany(spots);
    console.log("Seed spot data inserted successfully!");


    // Insert seed spot data
    await Review.insertMany(reviews);
    console.log("Seed review data inserted successfully!");
}
    catch(error) {
        console.error("Error seeding data:", error);
    }


  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close database connection
    await mongoose.disconnect();
    console.log("Database connection closed!");
  }
};

// Run the seed function
seedData();