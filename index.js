const express=require("express");
const app=express();
const cors=require("cors");
const connectDatabse=require("./config/dbConnection");
const dotenv=require("dotenv");
dotenv.config({path:"config/config.env"});
const userRouter=require("./routes/user");
const authUser=require("./routes/auth");
const productRoute=require("./routes/product");
const cartRoute=require("./routes/cart");
const orderRoute=require("./routes/order");
const categoryRoute=require("./routes/category");
const addressRoute=require("./routes/address");

//Call to connect Mongo Database
connectDatabse();
//END Call to connect Mongo Database
//app.use(express.json());
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cors());
app.use("/api/v1/auth",authUser)
app.use("/api/v1/users",userRouter);
app.use("/api/v1/products",productRoute)
app.use("/api/v1/cart",cartRoute);
app.use("/api/v1/orders",orderRoute)
app.use("/api/v1/categories",categoryRoute);
app.use("/api/v1/address",addressRoute);


// mongoose.connect(process.env.MONGO_URI).then(()=>{
//     console.log("MongoDb Database Connected successfully...");
// }).catch((err)=>{
//     console.log(err);
// })

app.listen(process.env.PORT || 5000,()=>{
    console.log("Server Running...")
})

