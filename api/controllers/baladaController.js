const Balada = require('../models/balada');
// Controlador para obter todas as baladas
exports.getAllBaladas = (req, res) => {
Balada.getAllBaladas((err, baladas) => {
if (err) {
res.status(500).send(err);
} else {
res.json(baladas);
}
});
};
// Controlador para obter uma balada pela cidade
exports.getBaladaByCity = (req, res) => {
Balada.getBaladaByCity(req.params.cidade, (err, balada) => { if (err) {
res.status(500).send(err);
} else if (balada) {
res.json(balada);
} else {
res.status(404).send({ message: 'Balada não encontrado' }); }
});
};
// Controlador para obter uma balada pela data
exports.getBaladaByData = (req, res) => {
Balada.getBaladaByData(req.params.data, (err, balada) => { if (err) {
res.status(500).send(err);
} else if (balada) {
res.json(balada);
} else {
res.status(404).send({ message: 'Balada não encontrado' }); }
});
};
// Controlador para criar uma balada
exports.createBalada = (req, res) => {
Balada.createBalada(req.body, (err, result) => {
if (err) {
res.status(500).send(err);
} else {
res.status(201).json(result);
}
});
};
// Controlador para atualizar uma balada existente
exports.updateBalada = (req, res) => {
Balada.updateBalada(req.params.id, req.body, (err, result) => { if (err) {
res.status(500).send(err);
} else if (result.changes) {
res.status(200).json(result);
} else {
res.status(404).send({ message: 'Balada não encontrada' }); }
});
};
// Controlador para deletar uma balada
exports.deleteBalada = (req, res) => {
    Balada.deleteBalada(req.params.id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.changes) {
            res.status(200).json({ message: 'Balada deletada com sucesso' });
        } else {
            res.status(404).send({ message: 'Balada não encontrada' });
        }
    });
};


