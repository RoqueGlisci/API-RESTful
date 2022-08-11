class ProductosApi {
  constructor() {
    this.productos = [];
    this.id = 0;
  }

  listar(id) {
    try {
      return this.productos.find((x) => x.id === id);
    } catch (error) {
      console.error("error:", error);
    }
  }

  listarAll() {
    try {
      return this.productos;
    } catch (error) {
      console.error("error:", error);
    }
  }

  guardar(product) {
    try {
      this.id++;
      this.productos.push({ ...product, id: this.id });
    } catch (error) {
      console.error("error:", error);
    }
  }

  actualizar(prod, id) {
    try {
      const productoId = this.productos.find((x) => x.id === id);
      return Object.assign(productoId, prod);
    } catch (error) {
      console.error("error:", error);
    }
  }

  borrar(id) {
    try {
      const productoIndex = this.productos.findIndex((x) => x.id === id);
      this.productos.splice(productoIndex, 1);
    } catch (error) {
      console.error("error:", error);
    }
  }
}

module.exports = ProductosApi;
