import user from '../modules/userModule.js';
import spot from '../modules/spotModule.js';
import session from '../modules/sessionModule.js';
import review from '../modules/reviewModule.js';

const seedtuser1= await new user({
    name: 'Lu Wang',
    email: 'lwang97@stevens.edu',
    password: '123456789',
    image: '0f8a56e3-17c1-480f-9e94-3ad064408c9f.jpeg',
    address: '123 Main St, Springfield, USA',
    liked: [],
    verified: true,
});


const seedspot1= await new spot({
    name: 'Bay park',
    hobby: 'fishing',
    image: '0f8a56e3-17c1-480f-9e94-3ad064408c9f.jpeg',
    description: 'This is a good place for fishing',
    location:{type: 'Point', coordinates:[34,78], address: '123 Main St, Springfield, USA'}, //coordinates?
    ratingsAvg: 4,
    ratingsTotal: 1,
    likes: await user.find({email:'lwang97@stevens.edu'}).id,
    user: await user.find({email:'lwang97@stevens.edu'}).id, 
});


const seedsession1= await new session({
    user: await user.find({email:'lwang97@stevens.edu'}).id,
    valid: true,
});

const seedreview1=await new review({
    spot: await spot.find({image: '0f8a56e3-17c1-480f-9e94-3ad064408c9f.jpeg'}).id,
    user: await user.find({email:'lwang97@stevens.edu'}).id,
    description: 'This is a good place for fishing',
    ratings: 4,
});

