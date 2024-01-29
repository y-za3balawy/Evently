import { connectToDatabase } from "../database"
import Category from "../database/models/category.model"



export const getAllEvents = async()=>{
    await connectToDatabase()
    const x = await Category.create({
        name:"Testing"
    })
    console.log("Created");
    
}