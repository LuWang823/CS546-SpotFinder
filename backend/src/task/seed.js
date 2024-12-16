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
    console.log("Previous User data cleared!");

    await Session.deleteMany();
    console.log("Previous Session data cleared!");

    await Spot.deleteMany();
    console.log("Previous Spot data cleared!");

    await Review.deleteMany();
    console.log("Previous Review data cleared!");

    

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

      

        const spot1 = await Spot.create (
            {
                name: "Stephen R. Gregg Park",
                hobby: ["Walking", "Picnicking", "Jogging", "Birdwatching", "Biking"],
                image: "uploads/spots/park.jpg",
                description: "Stephen R. Gregg Park is a large urban park in Bayonne, NJ, offering scenic views, walking trails, playgrounds, and sports facilities. It is a popular spot for outdoor activities, family gatherings, and relaxation, with beautiful waterfront areas and ample green spaces.",
                location: {
                  coordinates: [-74.11497449418061, 40.684677919807264,],
                  address: "930 John F. Kennedy Blvd, Bayonne, NJ 07002",
                },
                ratingsAvg: 5,
                ratingsTotal: 2,
                user: user5._id.toString(),
            });

        const spot2 = await Spot.create (
            {
                name: "Pier A Pergola",
                hobby: ["Walking", "Picnicking", "Jogging"],
                image: "uploads/spots/pergola.png",
                description: "The Pier A Pergola, often referred to as the gazebo, is a notable feature situated at the eastern end of Pier A Park in Hoboken, New Jersey. This structure provides visitors with a shaded area to relax and enjoy panoramic views of the Manhattan skyline across the Hudson River. The park itself, located at 100 Sinatra Drive, offers amenities such as a great lawn, fishing areas, and tree-lined pathways, making it a popular destination for both locals and tourists.",
                location: {
                  coordinates: [-74.02502120108159, 40.73707619378764],
                  address: "Pier A Park, Hoboken, NJ 07030",
                },
                ratingsAvg: 4,
                ratingsTotal: 1,
                user: user5._id.toString(),
            });


        const spot3 = await Spot.create (
            {
                name: "Gateway South, Stevens Institute of Technology",
                hobby: ["Study"],
                image: "uploads/spots/GatewaySouth.jpg",
                description: "The Gateway Academic Center is a state-of-the-art facility that opened in 2019. The center comprises two buildings—South Hall and Gianforte Family Hall—connected by a glass skybridge. Spanning 89,500 square feet over four stories, it features 10 technology-rich classrooms, 13 laboratories, and 45 faculty offices.",
                location: {
                  coordinates: [-74.02786138250296, 40.7432219381947],
                  address: "1 Castle Point Terrace, Hoboken, NJ 07030",
                },
                ratingsAvg: 5,
                ratingsTotal: 3,
                user: user5._id.toString(),
            });


        const spot4 = await Spot.create (
            {
                name: "Philadelphia Museum of Art",
                hobby: ["Arts", "Sketching"],
                image: "uploads/spots/PhillyMuseum.jpg",
                description: "The Philadelphia Museum of Art is a world-renowned institution housing over 240,000 works of art, spanning 2,000 years, and featuring masterpieces by Van Gogh, Duchamp, and Rodin. Its iconic Greek Revival building serves as a cultural landmark at the end of the Benjamin Franklin Parkway in Philadelphia.",
                location: {
                  coordinates: [-75.18085338839663, 39.96682456054716],
                  address: "2600 Benjamin Franklin Pkwy, Philadelphia, PA 19130",
                },
                ratingsAvg: 3,
                ratingsTotal: 0,
                user: user5._id.toString(),
            });
        
        const spot5 = await Spot.create (
            {
                name: "Puʻuloa Beach Park",
                hobby: ["Walking", "Picnicking", "Jogging", "Swimming"],
                image: "uploads/spots/honolulu.png",
                description: "The park features amenities such as restrooms, picnic tables, a covered pavilion, and a basketball court, making it suitable for family outings and gatherings.",
                location: {
                  coordinates: [-157.9928832872145, 21.32112039817308],
                  address: "91-027 Fort Weaver Rd, Ewa Beach, HI 96706",
                },
                ratingsAvg: 4,
                ratingsTotal: 1,
                user: user5._id.toString(),
            });


        const spot6 = await Spot.create (
            {
                name: "San Francisco Zoo",
                hobby: ["Family", "Birdwatching", "Photographing"],
                image: "uploads/spots/zoo.jpg",
                description: "The San Francisco Zoo is an ideal destination for nature enthusiasts, photographers, and families, offering diverse animal exhibits, lush botanical gardens, and scenic walking paths across its 100-acre property. Wildlife lovers can explore habitats featuring over 2,000 animals, while photography and gardening hobbyists will appreciate the vibrant landscapes and plant integration. Educational activities like animal talks, feedings, and behind-the-scenes tours cater to learners of all ages, while families can enjoy the Fisher Family Children’s Zoo, the Elinor Friend Playground, and the Little Puffer Miniature Steam Train. With its tranquil setting near Ocean Beach, the zoo provides a perfect blend of recreation, education, and outdoor fun.",
                location: {
                  coordinates: [-122.50077335159972, 37.738125517669914],
                  address: "Sloat Blvd &, Upper Great Hwy, San Francisco, CA 94132",
                },
                ratingsAvg: 5,
                ratingsTotal: 1,
                user: user2._id.toString(),
            });


        const spot7 = await Spot.create (
            {
                name: "Artistic Haven",
                hobby: ["Art", "Sketching"],
                image: "uploads/spots/guilin.jpg",
                description: "A tranquil spot for artists to find inspiration.",
                location: {
                    coordinates: [110.29037246574518, 25.274648472169233],
                    address: "2 Binjiang Rd, Xiangshan District, Guilin, Guilin, Guangxi, China, 541002",
                },
                ratingsAvg: 3,
                ratingsTotal: 0,
                user:user2._id.toString(), 

            });

        const spot8 = await Spot.create (
            {
                name: "Culinary Delight",
                hobby: ["Cooking", "Food Tasting"],
                image: "uploads/spots/restaurant.jpg",
                description: "A spot for food lovers to explore and savor flavors.",
                location: {
                    coordinates: [104.90657083023795, 11.555449786861468],
                    address: "GWX5+H35, Phnom Penh, Cambodia",
                },
                ratingsAvg: 2,
                ratingsTotal: 1,
                user:user2._id.toString(),

            });
            
        const spot9 = await Spot.create (
            {
                name: "Mukti's Kitchen",
                hobby: ["Cooking"],
                image: "uploads/spots/kitchen.jpg", // Updated image path
                description: "Mukti's Kitchen, founded by Mukti Banerjee, offers authentic Indian cooking classes in Brooklyn, New York. Since 2010, Mukti has shared her culinary expertise, teaching both vegetarian and non-vegetarian dishes. Classes are hands-on and interactive, providing participants with the skills to prepare healthy and delicious Indian meals. The studio is located at 816 Beverley Rd, Brooklyn, NY 11218.",
                location: {
                    coordinates: [-73.99971712585591, 40.8375235146539], 
                    address: "816 Beverley Rd, Brooklyn, NY 11218",
                },
                ratingsAvg: 2,
                ratingsTotal: 1,
                user: user1._id.toString(),
            });

        const spot10 = await Spot.create (
            {
                name: "Tasteful Adventures",
                hobby: ["Food Tasting", "Baking", "Exploring Local Cuisine"],
                image: "uploads/spots/food.jpg", // Updated image path
                description: "A spot to indulge in unique food tasting experiences and discover hidden gems.",
                location: {
                    coordinates: [-118.2453, 34.0522], // Changed coordinates (Los Angeles, CA)
                    address: "456 Savory Street, Los Angeles, CA",
                },
                ratingsAvg: 1,
                ratingsTotal: 1,
                user: user1._id.toString(),
            });

        const review1 = await Review.create(
            {
                spot: spot1._id.toString(),
                user: user5._id.toString(),
                description: "This is a beautiful spot with breathtaking views. Highly recommend it!",
                ratings: 5,
            });

        const review2 = await Review.create(
            {
                spot: spot1._id.toString(),
                user: user1._id.toString(),
                description: "I walk my dog here every day",
                ratings: 3,
            });
        const review3 = await Review.create(
            {
                spot: spot2._id.toString(),
                user: user1._id.toString(),
                description: "A great spot for view",
                ratings: 4,

            });

        const review4 = await Review.create(

            {
                spot: spot3._id.toString(),
                user: user1._id.toString(),
                description: "I study here",
                ratings: 5,

            });

        const review5 = await Review.create(
            {
                spot: spot3._id.toString(),
                user: user5._id.toString(),
                description: "I conduct research here",
                ratings: 5,

            });

        const review6 = await Review.create(
            {
                spot: spot3._id.toString(),
                user: user2._id.toString(),
                description: "I chase my dream here",
                ratings: 5,

            });

        const review7 = await Review.create(
            {
                spot: spot5._id.toString(),
                user: user2._id.toString(),
                description: "Nice place. Thanks for sharing.",
                ratings: 4,
    
            });
            

        const review8 = await Review.create(
            {
                spot: spot6._id.toString(),
                user: user2._id.toString(),
                description: "A wonderful place for a family activities! The kids loved the animals!",
                ratings: 5,
        
            });
            
        const review9 = await Review.create(
            {
                spot: spot8._id.toString(),
                user: user2._id.toString(),
                description: "A wonderful place though but too far for me to travel. I took one day to get there.",
                ratings: 2,
        
            });
            
        const review10 = await Review.create(
            {
                spot: spot9._id.toString(),
                user: user1._id.toString(),
                description: "Too professional for me to learn! Not for novice.",
                ratings: 2,
        
            });
            
        const review11 = await Review.create(
            {
                spot: spot10._id.toString(),
                user: user5._id.toString(),
                description: "A wonderful place but it was really hard to find",
                ratings: 1,
            
            });
        
    
       


    // Insert seed user data
    await Session.insertMany(sessions);
    console.log("Seed session data inserted successfully!");

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