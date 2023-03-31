import express from 'express';
import { param, body, validationResult, query } from 'express-validator';
import axios from 'axios';

const app  =  express ();

app.use(express.json());



const apiKey ="7ae4579d29e87d53b38102a2ede59b70" ;
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const randomUserApi = 'https://randomuser.me/api/';




app.get("/locations/:city", async ({params}, res) => {
    try{
    const {data} = await axios.get(
        `${baseUrl}/weather?q=${params.city}&appid=${apiKey}`
    );
    res.json(data);
    }catch{
        console.log("Error, city unsupported")
    }
});


app.get("/random", async (req, res) => {
    const {data} = await axios.get(randomUserApi);
    const obj = {
        name: data.results[0].name.first,
        surname: data.results[0].name.last,
        city: data.results[0].location.city,
        weather:"",
    }
    try{
        const response = await axios.get(
            `${baseUrl}/weather?q=${obj.city}&appid=${apiKey}`
        )
         obj.weather = response.data.weather[0].main;
    } catch (err) {
        obj.weather = "Not supported.."
    }
   
    res.json(obj);
});










app.listen(3000, () => {
    console.log("Server is running")
  }); 