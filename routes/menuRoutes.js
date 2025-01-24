const express=require('express');
const router=express.Router();

const Menu=require('./../models/Menu');

router.get('/',async(req,res)=>{
    try{
        const data=await Menu.find();
        console.log('Data fetched');
        res.status(200).json(data)
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
    
})

router.post('/',async(req,res)=>{
    try{
        const data=req.body;
        const newMenu=new Menu(data);
        const response=await newMenu.save();
        console.log('Data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/:tasteCheck',async(req,res)=>{
    try{
        const tasteCheck=req.params.tasteCheck;
        if(tasteCheck=='salty'){
            const response=await Menu.find({taste:tasteCheck});
            console.log('Data fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error:'Internal taste'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const personupdateddata=req.body;

        const response=await Menu.findByIdAndUpdate(personId,personupdateddata,{
            new:true,
            runValidators:true
        })

        if(!response){
            res.status(404).json('Person not found')
        }
        console.log('Person updated')
        res.status(200).json(response);
        
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Menu.findByIdAndDelete(personId);

        if(!response){
            res.status(404).json('Person not found')
        }
        console.log('Person updated')
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})
module.exports=router;
