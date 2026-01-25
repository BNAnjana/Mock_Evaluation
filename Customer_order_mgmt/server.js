import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

 app.use((req,res) => {
    try {
        process.env.SUPABASE_URL,
        process.env.SECRET_KEY
    }catch(err){
        res.send(500).json({message:"Something went wrong! Please try again"});
    }
}
 );

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});