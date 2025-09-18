//balada.js 
const sqlite3 = require('sqlite3').verbose();
const dbPath = './infra/database.db';

// Função para abrir conexão com o banco de dados 
function openDbConnection() {
    let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error('Erro ao abrir o banco de dados:', err.message);
        }
    });
    return db;
}

// Função para buscar todas as baladas 
function getAllBaladas(callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Baladas", [], (err, rows) => {
        db.close();
        callback(err, rows);
    });
}

// Função para buscar uma balada por ID 
function getBaladaById(id, callback) {
    const db = openDbConnection();
    db.get("SELECT * FROM Baladas WHERE id = ?", [id], (err, row) => {
        db.close();
        callback(err, row);
    });
}

// Função para buscar uma balada por Data 
function getBaladaByData(data, callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Baladas WHERE data = ?", [data], (err, row) => {
        db.close();
        callback(err, row);
    });
}

// Função para buscar uma balada por Cidade 
function getBaladaByCity(cidade, callback) {
    const db = openDbConnection();
    db.all("SELECT * FROM Baladas WHERE UPPER (cidade) = ?", [cidade], (err, row) => {
        db.close();
        callback(err, row);
    });
}

// Função para criar uma nova balada
function createBalada(balada, callback) {
    const { nome, endereco, data, tipo, cidade } = balada;
    const db = openDbConnection();
    db.run("INSERT INTO Baladas (nome, cidade, data, tipo, endereco  ) VALUES (?, ?, ?, ?, ?)", [nome, cidade, data, tipo, endereco], function (err) {
        db.close();
        callback(err, { id: this.lastID });
    });
}

// Função para atualizar uma balada existente 
function updateBalada(id, balada, callback) {
    // Array para armazenar os campos que serão atualizados
    const fields = [];
    // Array para armazenar os valores correspondentes aos campos
    const values = [];

    // Verifica se o campo 'nome' foi fornecido e o adiciona para atualização
    if (balada.nome) {
        fields.push("nome = ?");
        values.push(balada.nome);
    }
    // Verifica se o campo 'cpf' foi fornecido e o adiciona para atualização
    if (balada.cidade) {
        fields.push("cidade = ?");
        values.push(balada.cidade);
    }
    // Verifica se o campo 'email' foi fornecido e o adiciona para atualização
    if (balada.data) {
        fields.push("data = ?");
        values.push(balada.data);
    }
    // Verifica se o campo 'telefone' foi fornecido e o adiciona para atualização
    if (balada.tipo) {
        fields.push("tipo = ?");
        values.push(balada.tipo);
    }

    if (balada.endereco) {
        fields.push("endereco = ?");
        values.push(balada.endereco);
    }

    // Se nenhum campo foi fornecido, retorna sem fazer alterações
    if (fields.length === 0) {
        return callback(null, { changes: 0 });
    }

    // Abre a conexão com o banco de dados
    const db = openDbConnection();
    // Monta a string de comando SQL para a atualização
    const comando = `UPDATE baladas SET ${fields.join(", ")} WHERE id = ?`;
    // Adiciona o ID do balada ao final do array de valores
    values.push(id);

    // Executa o comando SQL de atualização
    db.run(comando, values, function (err) {
        db.close(); // Fecha a conexão com o banco de dados
        // Retorna o erro (se houver) e o número de linhas alteradas
        callback(err, { changes: this.changes });
    });
}
// Função para deletar uma balada 
function deleteBalada(id, callback) {
    const db = openDbConnection();
    db.run("DELETE FROM Baladas WHERE id = ?", [id], function (err) {
        db.close();
        callback(err, { changes: this.changes });
    });
}

module.exports = {
    getAllBaladas,
    getBaladaByCity,
    getBaladaByData,
    getBaladaById,
    createBalada,
    updateBalada,
    deleteBalada
};
