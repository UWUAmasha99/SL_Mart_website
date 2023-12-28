import mongoose from "mongoose";


const RatingSchema = new mongoose.Schema({

      userId:{
        type: String,
        required: true, 
      },

      productId: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
 
});




export default mongoose.model("Rating", RatingSchema);