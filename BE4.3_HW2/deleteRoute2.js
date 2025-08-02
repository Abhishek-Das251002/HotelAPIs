const {connectToDB} = require("./dbConnection")
const Hotel = require("./hotel.model")

const express = require("express")
const app = express()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json())

connectToDB()

async function readAll(){
    try{
        const allHotels = await Hotel.find()
        return allHotels
    }catch(error){
        console.log(error)
    }
}

app.get("/hotels", async (req, res) => {
    try{
        const hotelList = await readAll()
        if(hotelList.length != 0){
            res.json(hotelList)
        }else{
            res.status(404).json({error: "hotel not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch hotels."})
    }
})

const deleteHotel = async (hotelid) => {
    try{
        const deleteHotelById = await Hotel.findByIdAndDelete(hotelid)
    }catch(error){
        throw error
    }
}

app.delete("/hotels/:hotelId", (req, res) => {
    try{
        const rqdhotelId = req.params.hotelId
        const deletedHotel = deleteHotel(rqdhotelId)
        res.status(200).json({message: "hotel deleted successfully."})
    }catch(error){
        res.status(500).json({error: error.message})
    }
})


const PORT = 3000

app.listen(PORT, () => {
    console.log("server is running on port", PORT)
})