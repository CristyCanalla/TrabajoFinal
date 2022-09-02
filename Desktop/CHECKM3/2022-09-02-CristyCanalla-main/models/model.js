
'use strict'

let products = []
let categories = []


module.exports = {

  reset: function () {
    // No es necesario modificar esta función.
    products = []
    categories = []
  },

  // ==== COMPLETAR LAS SIGUIENTES FUNCIONES (vean los test de `model.js`) =====

  addCategory: function (category) {
    // Agrega el nombre de una nueva categoría verificando que no exista anteriormente.
    // Debe retornar el string 'Categoría creada correctamente'.
    // En caso de existir, no se agrega y debe arrojar el Error 'La categoría ya existe' (ver JS throw Error)
    if(categories.includes(category)){
      throw Error('La categoría ya existe')
    }
    categories.push(category)
    return 'Categoría creada correctamente'
  },

  listCategories: function () {
    // Devuelve un arreglo con todas las categorías
      return categories
  },

  addProduct: function (name, brand, category, stock) {
    // Agrega un nuevo producto.
    // Si la categoría no existe (según el arreglo de categorías), no agrega el producto y arroja un Error 'La categoría ingresada no existe'
    // Inicialmente su propiedad reviews (reseñas) debe ser un arreglo vacío.
    // Va a ser necesario guardar, en su propiedad categoryId, el número (id) de la categoría y NO su nombre (que es lo que recibimos por parámetros).
    // El ID de categoría debe empezar desde 1 y no desde 0.
    // Su propiedad 'available' (disponible) debe ser un booleano (true o false) de acuerdo al stock.
    // Su propiedad rating (puntaje) será inicialmente 0.
    // Si el producto es agregado con éxito debe retornar el producto creado.
    let filtro = categories.filter(e => e === category)
    if(filtro.length != 0){
      let boleano = false
      let categoryId = categories.indexOf(category) + 1
      if(stock > 0) boleano = true
      let obj = {
        name,
        brand,
        categoryId,
        reviews : [],
        available : boleano,
        rating : 0,
        stock
      }
      products.push(obj)
      return obj
    }
    throw Error('La categoría ingresada no existe')
  },

  listProducts: function (category, fullName) {
    // Devuelve un arreglo con todos los productos.
    // Si recibe un nombre de categoría (category) como parámetro, debe filtrar sólo los productos pertenecientes a la misma.
    // Si la categoría no existe, arroja un Error 'La categoría no existe'
    // Si ADEMÁS de la categoría, también recibe un segundo parámetro (fullName) en 'true', debe devolver únicamente la denominación completa (Marca + Nombre) de los productos.
    // let pepe = categories.indexOf(category) + 1
    // if(category){
    //   let pepa = products.filter(e => e.)
    // }
    let cosa2 = categories.indexOf(category) + 1
    if(category){
      let cosa1 = products.filter((e) => e.categoryId === cosa2)
      if(cosa1.length == 0){
        throw Error('La categoría no existe')
      }
      if(fullName){
        let cosa3 = cosa1.map((e) => e.brand + ' ' + e.name)
        return cosa3
      }
      return cosa1
    }
      return products
  },

  addReview: function (name, stars, text, user) {
    // Recibe: nombre de producto (name), cantidad estrellas dadas al producto (stars), comentario (text) y nombre del comprador (user).
    // Debe encontrar el producto que coincida con el nombre recibido (name).
    // Si no existe el producto, arroja un Error 'Producto no encontrado'
    // Si falta algún parámetro (stars, text o user) no agrega la reseña y arroja el Error 'Faltan parámetros'
    // El puntaje (stars) debe tener un rango válido entre 1 y 5 inclusive. En caso contrario no se guarda la reseña y arroja el Error 'Puntaje inválido'.
    // Debe agregar a la propiedad 'reviews' del producto (recordemos que es un arreglo), un objeto con la siguiente forma:
    // { stars: stars, text: text, user: user }
    // En caso de agregar correctamente, debe devolver el string "Reseña agregada correctamente".
    // Además debe actualizar el puntaje (rating) del producto, según el promedio de todas las reseñas obtenidas hasta el momento (stars).
    let Review = products.find((e) => e.name === name)
    if(Review === undefined){
      throw Error('Producto no encontrado')
    }
    if(!stars || !text || !user){
      throw Error('Faltan parámetros')
    }
    if(stars >= 1 && stars <= 5){
      Review.reviews.push({ stars: stars, text: text, user: user })  
      let acumulador = 0
      for(let i = 0; i < Review.reviews.length; i++){
        acumulador += Review.reviews[i].stars
      }
      acumulador = acumulador / Review.reviews.length
      Review.rating = acumulador 
      return "Reseña agregada correctamente"
    }
    throw Error('Puntaje inválido')
  },

  getReviews: function (name) {
    // Devuelve las reseñas (reviews) de un producto en particular.
    // Si no existe el producto, arroja un Error 'Producto no encontrado.'
    // Si el producto existe pero no tiene reseñas, devuelve un arrego vacío.'
    let reseñas= products.find((e) => e.name === name)
    if(reseñas === undefined) throw Error('Producto no encontrado.')
    return reseñas.reviews
  },

  getRating: function (name) {
    // Devuelve el puntaje (rating) de un producto en particular.
    // Si no existe el producto, arroja un Error 'Producto no encontrado'
    // Si no tiene reseñas, se espera que el rating sea 0.
    // Si no recibe parámetros (name) devuelve sólo el nombre de los 5 productos mejor puntuados, ordenados de mayor a menor puntaje.
    if(name === undefined){
      let MejorPunteados = []
      for(let i = 0; i < products.length; i++){
        MejorPunteados.push(products[i].name)
      } 
      return MejorPunteados.slice(0, 5)
    }
    let Ratings = products.find((e) => e.name === name)
    if(Ratings === undefined){
      throw Error('Producto no encontrado')
    }
    if(name){
      return Ratings.rating
    }


  }
}