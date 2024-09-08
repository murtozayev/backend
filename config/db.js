import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://jahongirmurtozayev777:ofNNaFkbvsJKnICh@cluster0.nolvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Mongo db connected: " + connect.connection.host);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}