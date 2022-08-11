const express = require("express");
const { Router } = express;
const classProductos = require("./api/productos.js");

const app = express();
app.use(express.static("public"));
// router de productos

const productosApi = new classProductos();

const productosRouter = new Router();

productosRouter.use(express.json());
productosRouter.use(express.urlencoded({ extended: true }));

productosRouter.get("/", (req, res) => {
  res.json(productosApi.listarAll());
});

productosRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const r = productosApi.listar(id);
  r ? res.json(r) : res.json("no se encontro el producto");
});

productosRouter.post("/", (req, res) => {
  const form = req.body;
  productosApi.guardar(form);
  res.json(productosApi.listarAll());
});

productosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const obj = req.body;

  productosApi.actualizar(obj, id) != null
    ? res.json(productosApi.listarAll())
    : res.json("error de actualizacion");
});

productosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productosApi.borrar(id);

  res.json(productosApi.listarAll());
});

//rutas usando productosRouter

// servidor

app.use("/api/productos", productosRouter);

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
