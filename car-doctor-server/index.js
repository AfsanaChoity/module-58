require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ymsoi27.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//middlewares
const logger = async (req, res, next)=>{
  console.log('called', req.host, req.originalUrl)
  next()
}
const verifyToken = async(req, res, next)=>{
  const token = req.cookies?.token;
  console.log('middle ware token: ', token)
  if(!token){
    return res.status(401).send({message: 'not authorized'})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
    //error
    if(err){
      console.log(err)
      return res.status(401).send({message: 'forbidden'})
    }
    //valid token
    console.log('value in the token ', decoded)
    req.user = decoded;
    next()
  })
  
}

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const serviceCollection = client.db('carDoctor').collection('services');

    const bookingCollection = client.db('carDoctor').collection('bookings');

    //auth related api
    app.post('/jwt', logger, async(req,res) =>{
      const user = req.body;
      // console.log(user);

      //generate token
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
      
      res
      .cookie('token', token, {
        httpOnly: true,
        secure: false,
        
        

    })

    .send({success: true})
    })

    //services related api
    app.get('/services', logger, async(req, res)=>{
        const cursor = serviceCollection.find();
        // console.log(cursor)
        const result = await cursor.toArray();
        // console.log(result);
        res.send(result);
    })

    app.get('/services/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const options = {
            
           
            projection: { title: 1, price: 1, service_id: 1, img: 1 },
          };
        const result =  await serviceCollection.findOne(query, options);
        res.send(result);
    })

    //bookings- finding some data
    app.get('/bookings', logger, verifyToken, async(req, res) =>{
      // console.log(req.query);
      // console.log('token: ' , req.cookies.token)

      if(req.query.email !== req.user.email){
        return res.status(403).send({message: 'forbidden access'})
      }
      let query = {};
      if(req.query?.email){
        query = { 'booking.email': req.query.email }
        // console.log(query);
      }
      
      const cursor = bookingCollection.find(query);
      // console.log(cursor);
      const result = await cursor.toArray();
      // console.log(result);
      res.send(result)
    })

    app.post('/bookings', async(req,res) =>{
      const booking = req.body;
      // console.log(booking);
      const result = await bookingCollection.insertOne(booking);
      res.send(result);
    })

    //update booking
    app.patch('/bookings/:id', async(req, res) =>{
      const id = req.params.id;
      console.log(id)
      const filter = {_id: new ObjectId(id)}
      const updateBooking = req.body;
      console.log(updateBooking)
      const updateDoc = {
        $set: {
          status : updateBooking.status
        },
      };
      const result = await bookingCollection.updateOne(filter, updateDoc);
      res.send(result);
    })

    //delete booking
    app.delete('/bookings/:id', async(req, res) =>{
      const id = req.params.id;
      // console.log(id);
      const query = {_id : new ObjectId(id)}
      console.log(query);
      const result = await bookingCollection.deleteOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('doctor is running')
})

app.listen(port, () =>{
    console.log(`Car doctor server is running on port ${port}`);
})
