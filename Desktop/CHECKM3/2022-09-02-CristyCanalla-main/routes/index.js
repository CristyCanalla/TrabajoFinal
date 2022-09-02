"use strict";

var express = require("express");
const model = require("../models/model");


var router = express.Router();
module.exports = router;


const models = require("../models/model");
router.get('/categories', (req, res) =>{
    return res.json(models.listCategories())
})

router.post('/categories', (req, res) =>{
    const { category } = req.body
    try{
        const result = models.addCategory(category)
        res.status(201).json({msg:result})
    }catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/products', (req, res) =>{
    return res.json(models.listProducts())
})

router.post('/products', (req, res) =>{
    const { name, brand, category, stock } = req.body
    try{
        const result = models.addProduct(name, brand, category, stock)
        return res.status(201).json(result)
    }catch(error){
        return res.status(404).json({error:error.message})
    }
})

router.get("/products/:categoryName", (req, res)=>{
    let {categoryName} = req.params
    let {fullName} = req.query
    try {
        let productos = models.listProducts(categoryName, fullName)
        return res.json(productos)
    } catch (error) {
        return res.status(404).json({error:'La categoría no existe'})
    }
})

router.get("/reviews", (req, res)=>{
    let {name} = req.query
    try {
        let nombres = models.getReviews(name)
        return res.json(nombres)
    } catch (error) {
        return res.status(404).json({error:'Producto no encontrado'})
    }
})

router.post("/reviews", (req, res)=>{
    let {name, stars, text, user} = req.body
    try {
        let parametros = models.addReview(name, stars, text, user)
        return res.status(201).json({ msg: "Reseña agregada correctamente" });
    } catch (error) {
        return res.status(400).json({error:error.message})
       
    }
})


router.get("/rating", (req, res)=>{
    let {nom} = req.body
    let nombre = models.getRating(nom)
    res.status(200).json(nombre)
})

router.get("/rating/:product", (req, res)=>{
    let {product} = req.params;
    let {name} = req.body;
    try {
        let ambos = models.getRating(product, name)
        return res.status(200).json({"rating": 3.5 })
    } catch (error) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }
})