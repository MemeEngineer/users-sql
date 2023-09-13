const express = require('express');
const sequelizeDB = require('./utils/db');
const User = require('./models/User')

const app = express()
const PORT = 4000;

//middleware
app.use(express.json());

//Routes

//GET
app.get('/users', async (req,res) => {
    try{
        const user = await User.findAll()
        res.status(200).json(user)
    }catch(error){
        console.log(error)
    }
});

// find by primary key
app.get('/users/:id', async (req,res) => {
    try{
        const user = await User.findByPK(req.params.id)
        res.status(200).json(user)
    }catch(error){
        console.log(error)
    }
});

//create
app.post('/users', async(req, res) => {
    try{
        const user = await User.create(req.body)
        res.status(200).json(user)
    }catch(error){
        console.log(error)
    }
});

//update
app.put("/users/:id", async (req, res) => {
    try {
      const user = await User.update({
          name: req.body.name,
          department: req.body.department,
          salary: req.body.salary,
      }, {
        where: {
          id: req.params.id,
        },
      });
      
      res.json(user);
    } catch (error) {
      console.log(error);
    }
  });

//delete

app.delete('/users/:id', async(req, res)=> {
    try{
        const user = await User.destory({
            where: {
                id: req.params.id
            }
        })
        res.json(user)
    }catch(error){
        console.log(error)
    }
});

(async function(){
    try{
        //sync function will create a table for each of our models
        const result = await sequelizeDB.sync()
        console.log(result)

        //run the server
        app.listen(PORT, () => console.log(`server running on port: ${PORT}`))

    }catch(error){
        console.log(error)
    }
})();