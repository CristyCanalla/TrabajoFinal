/* 
  Importante: 
  No modificar ni el nombre ni los argumetos que reciben las funciones, sólo deben escribir
  código dentro de las funciones ya definidas. 
  No comentar la funcion 
*/

const { TestScheduler } = require("jest");

// ----- Closures -----

// EJERCICIO 5

// Enunciado:

// Implementar la función mayorMenorOIgual que recibe un parámetro
// (numFijo) y que debe retornar otra función con otro (parametro)
// En caso de que la suma de ambos parámetros sea menor a 10 retorna un string --> "la suma es menor a 10",
// en caso de que sea mayor a 10 retorna un string --> "la suma es menor a 10"
// en caso de que sea igual a 10 retorna 10
// y si el parametro numFijo es igual a null o undefined debe retornar un arreglo vacio.


function mayorMenorOIgual(numFijo) {
  // Tu código aca:
  let suma = numFijo
return function (numFijo){
  if (suma + numFijo < 10){
    return "la suma es menor a 10";}
    if (suma + numFijo > 10){
      return "la suma es mayor a 10";}
      if (suma + numFijo == 10){
        return 10;}
        else{numFijo === "null" || numFijo ==="undefined"}
        return [];
      }
      }


// No modifiques nada debajo de esta linea //

module.exports = mayorMenorOIgual;
