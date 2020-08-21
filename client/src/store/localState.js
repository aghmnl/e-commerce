export const loadCart = () => {
    try {
      const serializedData = localStorage.getItem('cart')
      if (!serializedData){
        return [] // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
      }
      return JSON.parse(serializedData) // Si encontramos con exito nuestro storage lo devolvemos.
    } catch (error) {
        console.log(error)
        return []// Si ocurre algun error, devuelvo undefined para cargar el state inicial.
    }
  }
export const loadTotal = () => {
    try {
      const serializedData = localStorage.getItem('total')
      if (!serializedData){
        return 0 // Si no existe el state en el local storage devolvemos undefined para que cargue el state inicial que hayamos definido
      }
      return JSON.parse(serializedData) // Si encontramos con exito nuestro storage lo devolvemos.
    } catch (error) {
        console.log(error)
      return 0 // Si ocurre algun error, devuelvo undefined para cargar el state inicial.
    }
  }
  export const saveCart = (state) => {
    try {
      let serializedData = JSON.stringify(state)
      localStorage.setItem('cart', serializedData)
    } catch (error) {
        console.log(error)
      // Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.    
    }
  }
  export const saveTotal = (state) => {
    try {
      let serializedData = JSON.stringify(state)
      localStorage.setItem('total', serializedData)
    } catch (error) {
        console.log(error)
      // Acá podemos capturar o crear cualquier log que deseemos en caso de que falle el salvado en el storage.    
    }
  }