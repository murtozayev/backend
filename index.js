import express from "express"
import { connectDb } from "./config/db.js"
import { ProductSchema } from "./model/Product.model.js"
const app = express()
import cors from "cors"


app.use(express.urlencoded({ extended: false }))

app.use(cors())

app.use(express.json())

app.get("/", async (req, res) => {
    try {
        const found = await ProductSchema.find({})
        res.status(201).json(found)
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })

    }
})

app.post("/api/products", async (req, res) => {
    const postProducts = req.body
    if (!postProducts.name || !postProducts.price || !postProducts.image) {
        return res.status(400).json({ success: false, message: "Something went wrong" })
    }
    const newProduct = new ProductSchema(postProducts)
    try {
        await newProduct.save()
        res.status(201).json({ success: true, message: "Product created successfully", data: newProduct })
    } catch (error) {
        res.status(400).json({ success: false, message: error })
    }

})

app.delete("/api/products/:id", async (req, res) => {
    try {
        const id = req.params.id
        await ProductSchema.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: "Product deleted successfully" })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
})

app.listen(2005, () => {
    connectDb()
})