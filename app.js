const express=require("express");
const ejs=require("ejs")
const app=express();
const port=3000;

app.use(express.static('public'));
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/add_post",(req,res)=>{
    res.render("add_post")
})
app.get("/post",(req,res)=>{
    res.render("post")
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.listen(port,()=>{
    console.log(`Our server is getting start with this port:${port}`);
})