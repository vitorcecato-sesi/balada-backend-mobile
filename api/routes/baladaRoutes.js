const express = require("express");
const router = express.Router();
const baladaController = require("../controllers/baladaController");
//Lembrando que a rota raiz tem a palavra balada, definido no app.js

// Rota para obter todas as baladas
router.get("/", baladaController.getAllBaladas);

// Rota para obter uma única balada pelo ID
router.get("/:id", baladaController.getBaladaById);

// Rota para criar uma nova balada
router.post("/", baladaController.createBalada);

// Rota para atualizar uma balada existente
router.put("/:id", baladaController.updateBalada);

// Rota para deletar uma balada
router.delete("/:id", baladaController.deleteBalada);

module.exports = router;
