const express= require("express"),
        app=express(),
        mongoose=require("mongoose"),
        bodyparser=require("body-parser"),
        expreeSanitizer=require("express-sanitizer"),
        methodOverride=require("method-override");
mongoose.connect("mongodb://localhost/route_blog_app",{useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyparser.urlencoded({extended:true}));
app.use(expreeSanitizer());
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.use(express.static("public"));
const blog_route=mongoose.model('blog_route',{title:String,image:String,body:String,created:{type:Date,default:Date.now}});
//blog_route.create({
  //  title:'table',
    //image:'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    //body:'This is our first  blog'

//});
app.get("/",(req,res)=>{
    res.redirect("/blogs");
});
app.get("/blogs",(req,res)=>{
    blog_route.find({},(err,blog)=>{
        if(err)
        {
            console.log(err);
        }else{
            res.render("index",{blog:blog});
        }

    });
});
app.get("/blogs/new",(req,res)=>{
    res.render("new");

});
app.post("/blogs",(req,res)=>{
    
    req.body.blog_route.body=req.sanitize(req.body.blog_route.body);
    
    blog_route.create(req.body.blog_route,(err, newBlog)=>{
        if(err)
        {
            console.log(err);
        }else{
            res.redirect("/blogs");
        }

    });

});
app.get("/blogs/:id",(req,res)=>{
    blog_route.findById(req.params.id,(err,foundBlog)=>{
        if(err)
        {
            console.log(err);
        }else{
            res.render("show",{foundBlog:foundBlog});
        }

    });
});
app.get("/blogs/:id/edit",(req,res)=>{
    blog_route.findById(req.params.id,(err,foundBlog)=>{
        if(err)
        {
            res.redirect("/blogs");
        }else{
            res.render("edit",{foundBlog:foundBlog});
        }
    });

});
app.put("/blogs/:id",(req,res)=>{
    blog_route.findByIdAndUpdate(req.params.id,req.body.blog_route,(err,updatedBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/"+ req.params.id);
        }
    });
app.delete("/blogs/:id",(req,res)=>{
    blog_route.findByIdAndRemove(req.params.id,(err)=>{
        if(err)
        {
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
    
});


});












app.listen(3000);
console.log("Server has started");

