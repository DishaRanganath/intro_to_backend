import dotenv from "dotenv"
import connectDB from "./config/database.js";
import app from "./app.js";
dotenv.config({
    path: './.env'
});
const startserver=async() =>{
    try {
        await connectDB();
        app.on("error",(error) => {
            console.log("ERROR",error);

        });
        const PORT = process.env.PORT || 8000;
        app.listen(PORT, () =>{
            console.log(`server is running on port: ${PORT}`);
        }); //if port 4000 is busy ,default port is 8000
       
    } catch (error) {
        console.log("mongoDb connection failed");
    }

}
startserver();