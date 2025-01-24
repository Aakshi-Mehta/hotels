const express=require('express');
const router=express.Router();
const Person = require('./../models/Person');

router.post('/',async(req,res)=>{
    try{
      const data=req.body
      const newPerson=new Person(data);
      const response=await newPerson.save();
      console.log('Data saved successfully');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
})

router.get('/',async(req,res)=>{
  try{
    const data=await Person.find();
    console.log('Data fetched successfully');
    res.status(200).json(data);

  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/:namecheck',async(req,res)=>{
    try{
      const namecheck=req.params.namecheck;
      if(namecheck=='Aakshi'){
        const response=await Person.find({name:namecheck})
        console.log('Data fetched');
        res.status(200).json(response)
      }else{
        res.status(404).json({error:'Invalid name'})
      }
  
    }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;
    const updatedpersondata=req.body;

    const response=await Person.findByIdAndUpdate(personId,updatedpersondata,{
      new:true,
      runValidators:true
    });

    if(!response){
      res.status(404).json('Person not found')
    }
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'})
  }
})

router.delete('/:id',async(req,res)=>{
  try{
    const personId=req.params.id;
    const response=await Person.findByIdAndDelete(personId);

    if(!response){
      res.status(404).json('Person not found')
    }
    console.log('Data deleted');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'})
  }
})


module.exports=router;