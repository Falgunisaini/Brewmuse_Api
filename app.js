let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUrl = "mongodb+srv://falguni:falguni123@cluster0.sjcw7.mongodb.net/Brewmuse?retryWrites=true&w=majority";
let bodyparser = require('body-parser');
let cors = require('cors');
let port=process.env.PORT || 8210;
var db;

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())
app.use(cors())

// Base Route
app.get('/',(req,res)=>{
    res.send('Welcome to BrewMuse');
})

// Retrieveing sub-category (Food/Drinks)
app.get('/category',(req,res)=>{
    let categoryId=Number(req.query.id);
    let category_type = req.query.type;
    let query={};

    if(categoryId && category_type){
        query={
            id:categoryId,
            type:category_type
        }
    }
    else if(categoryId){
        query={
            id:categoryId
        }
    }
    else if(category_type){
        query={
            type:category_type
        }
    }
    
    db.collection('category').find(query).toArray((err,result)=>{
        if(err) console.log(err)
        res.send(result);
    })
})

// Find a Store Api
app.get('/store',(req,res)=>{
    let city=Number(req.query.city_id);
    let cityname=req.query.city_name;
    let name=req.query.name;
    let query={};
    if(city && cityname && name){
        query={
            city_id:city, 
            city_name:cityname
        }
    }
    else if(city){
        query={city_id:city}
    }
    else if(cityname){
        query={city_name:cityname}
    }
    else if(name){
        query={name:name}
    }

    db.collection('coffeestores').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Menu for Coffee and food 
app.get('/item/:id',(req,res)=>{
    let categoryId=Number(req.params.id);
    
    db.collection('menu').find({"category_id":categoryId}).toArray((err,result)=>{
        if(err) console.log(err)
        res.send(result);
    })
})


//Fetch Jobs Data
app.get('/jobs',(req,res)=>{
    let cityId = Number(req.query.city_id);
    let cityname = req.query.city_name;
    let profile = req.query.profile;
    let query = {};
    if(cityId && profile){
        query = {city_id:cityId,
            profile:profile
            };
    }
    else if(cityname && profile){
        query = {city_name:cityname,
            profile:profile
        };
    }
    else if(cityId){
        query = {city_id:cityId};
    }
    else if(cityname){
        query = {city_name:cityname};
    }
    else if(profile){
        query = {profile:profile};
    }
    
    db.collection('jobs').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Api for name animation
app.post('/name',(req,res)=>{
    db.collection('names').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Fetching name for animation from database
app.get('/fetchname/:id',(req,res)=>{
    let userId = mongo.ObjectId(req.params.id);
    db.collection('names').find({_id:userId}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Coffee finder Api
app.get('/ourcoffee/:id',(req,res)=>{
    let optid=Number(req.params.id);

    db.collection('coffeebeans').find({"opt_id":optid}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


// Gift cards
app.get('/cards/:id',(req,res)=>{
    let card_id=Number(req.params.id);
  
    db.collection('giftCards').find({"gift_id":card_id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);    
    })
})

// Gift card based on user's selection
app.post('/giftcard',(req,res)=>{
    console.log(req.body);
    db.collection('giftCards').find({_id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Placing Order For gift cards
app.post('/giftcardOrder',(req,res)=>{
    db.collection('giftcardOrders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order for gift card successful.");
    })
})

// Update Api for gift cards
app.put('/updategiftOrder/:id',(req,res)=>{
    let oId=mongo.ObjectId(req.params.id)

    let status=req.query.status?req.query.status:'Pending'
    db.collection('giftcardOrders').updateOne(
        {_id:oId},
        {$set:{
                "status":status,
                "bank_name":req.body.bank_name,
                "bank_status":req.body.bank_status
            
        }},(err,result)=>{
            if(err) throw err
            res.send(`status updated to ${status}`);
            
        }
    )
})

// Deleting Order for gift cards
app.delete('/deletegiftOrder',(req,res)=>{
    let email=req.query.email;
    let query={}
    if(email){
        query={"email":email}
    }
    db.collection('giftcardOrders').remove(query,(err,result)=>{
       if(err) console.log(err)
       res.send("Gift card orders deleted.")
    })
})

// Filter for Coffee and food
app.get('/filter/:id',(req,res)=>{
    let categoryID=Number(req.params.id);
    console.log(">>>>>categoryID",categoryID);
    let item_type=req.query.type;
    let sort = {Ratings:1}
    let bprice = Number(req.query.bprice);  
    let aprice = Number(req.query.aprice);
    let arate=Number(req.query.arate);
    let brate=Number(req.query.brate);
    let query={}
    if(sort){
        sort={Ratings:req.query.sort}
    }
    if(bprice && aprice){
        query={$and:[{Price:{$gt:bprice,$lt:aprice}}],category_id:categoryID}
    }
    else if(arate){
        query={Ratings:{$gte:arate},category_id:categoryID}
    }
    else if(brate){
        query={Ratings:{$lte:brate},category_id:categoryID}
    }
    if(item_type){
        query={type:item_type,category_id:categoryID}
    }
       
    
    db.collection('menu').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })

})


// Place order from menu (Coffee/Food)
app.post('/placeOrder',(req,res)=>{
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order Added.");
    })
})

// Menu item based on user's selection
app.post('/menuItem',(req,res)=>{
    console.log(req.body);
    db.collection('menu').find({_id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Update orders
app.put('/updateOrder/:id',(req,res) => {
    let oId = mongo.ObjectId(req.params.id)
    let status = req.query.status?req.query.status:'Pending'
    db.collection('orders').updateOne(
        {_id:oId},
        {$set:{
            "status":status,
            "bank_name":req.body.bank_name,
            "bank_status":req.body.bank_status
        }},(err,result)=>{
            if(err) throw err;
            res.send(`Status Updated to ${status}`)
        }
    )
})

// Delete orders
app.delete('/deleteOrder',(req,res)=>{
    let email=req.query.email;
    let query={}
    if(email){
        query={"email":email}
    }
    db.collection('orders').remove({},(err,result)=>{
        if(err) throw err;
        res.send("Order(s) deleted.");
    })
})

MongoClient.connect(mongoUrl,(err,client)=>{
    if(err) console.log("Error While Connecting.");
    db = client.db("Brewmuse");
    app.listen(port,()=>{
        console.log(`Listening on Port ${port}`)
    })
})