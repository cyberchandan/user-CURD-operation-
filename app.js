const express = require('express')
const app = express()
const userModel=require('./userModel')
const ejs =require('ejs')
const path = require('path')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
     res.render('userCreate')
})

 //create new users
app.post('/create',async(req,res)=>{
  await userModel.create({
        name:req.body.name,
        email:req.body.email,
        Image:req.body.url 

    })
    res.redirect('/read')
})
// read user
app.get('/read',async(req,res)=>{
   let allusers= await userModel.find()
    res.render('userView',{users:allusers})
})

//delete user
app.get('/delete/:id',async(req,res)=>{
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/read')
})
//edit user request
app.get('/edit/:userid',async(req,res)=>{
   let userdata=await  userModel.findOne({_id:req.params.userid})
    res.render('edit',{userdata})
})

// update edit page
app.post('/update/:userid', async (req, res) => {
    await userModel.findByIdAndUpdate(req.params.userid, {
      name: req.body.name,
      email: req.body.email,
      Image: req.body.url
    });
    res.redirect('/read');
  });
  
app.listen(3000,function(){
    console.log('server is running ')
})

