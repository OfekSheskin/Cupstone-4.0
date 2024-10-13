import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/",(req,res)=>{
    res.render("index.ejs");
    

});
app.get("/result", (req,res)=>{
    res.render("result.ejs")
});
app.post("/result", async(req,res)=>{
    const skinColor = req.body.skinTone;
    const location_lat = req.body.llat;
    const location_lng = req.body.llng;
    try{
        const result =  await axios.get("https://api.openuv.io/api/v1/uv?lat=" +location_lat + "&lng=" + location_lng + "&alt=&dt=",{headers:{
            "x-access-token":"openuv-jgbherm0s4jthj-io"
        }} );
   
        switch (skinColor) {
            case "1":
                var TimeToBurn = (200*2.5)/(3*result.data.result.uv);    

                break;
            case "2":
                var TimeToBurn = (200*3)/(3*result.data.result.uv);
                break;
            case "3":
                var TimeToBurn = (200*4)/(3*result.data.result.uv);               
                break;
            case "4":
                var TimeToBurn = (200*5)/(3*result.data.result.uv);               
                break;
            case "5":
                var TimeToBurn = (200*8)/(3*result.data.result.uv);               
                break;
            case "6":
                var TimeToBurn = (200*15)/(3*result.data.result.uv);               
                break;
            default:
                console.log(skinColor);
                break;
        }
        if(TimeToBurn > 1800){
        var needToPutSunScreen = "No Need To Use Sunscreen"; 
    }
    if(TimeToBurn <= 1800){
        var needToPutSunScreen = "Using Sunscreen Is Recommend ";
    }



        res.render("result.ejs", {content: needToPutSunScreen});
    }catch(error){
        res.status(404)
        console.log(error.message);

    }

    


});
app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
});
