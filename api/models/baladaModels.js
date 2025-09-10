//balada.js 
const sqlite3 = require('sqlite3').verbose(); 
const dbPath = './infra/baladas.db'; 

// Função para abrir conexão com o banco de dados 
function openDbConnection() { 
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => { if (err) { 
console.error('Erro ao abrir o banco de dados:', err.message); 
} 
}); 
return db; 
} 

// Função para buscar todas as baladas 
function getAllBaladas(callback) { 
const db = openDbConnection(); 
db.all("SELECT * FROM baladas", [], (err, rows) => {
db.close(); 
callback(err, rows); 
}); 
} 

// Função para buscar uma balada por ID 
function getBaladaById(id, callback) { 
const db = openDbConnection(); 
db.get("SELECT * FROM baladas WHERE id = ?", [id], (err, row) => { 
db.close(); 
callback(err, row); 
}); 
} 

// Função para buscar uma balada por Data 
function getBaladaByData(data, callback) { 
const db = openDbConnection(); 
db.get("SELECT * FROM baladas WHERE data = ?", [data], (err, row) => { 
db.close(); 
callback(err, row); 
}); 
} 

// Função para buscar uma balada por Cidade 
function getBaladaByCidade(cidade, callback) { 
const db = openDbConnection(); 
db.get("SELECT * FROM baladas WHERE cidade = ?", [cidade], (err, row) => { 
db.close(); 
callback(err, row); 
}); 
} 

// Função para criar uma nova balada
function createBalada(balada, callback) { 
const { nome , endereco , data , tipo } = balada; 
const db = openDbConnection(); 
db.run("INSERT INTO baladas (nome, cidade, data, tipo  ) VALUES (?, ?, ?, ?)", [ nome , cidade , data ,  tipo], function (err) { 
db.close(); 
callback(err, { id: this.lastID }); 
}); 
} 

// Função para atualizar uma balada existente 
function updateBalada(id, cliente, callback) { 
const { nome , endereco , data , tipo  } = cliente; 
const db = openDbConnection(); 
db.run("UPDATE baladas SET nome = ?, cidade = ?, data = ?, tipo = ?  WHERE id = ?", [nome , endereco , data,  tipo , id], function (err) { 
db.close(); 
callback(err, { changes: this.changes }); 
}); 
} 

// Função para deletar uma balada 
function deleteBalada(id, callback) { 
const db = openDbConnection(); 
db.run("DELETE FROM baladas WHERE id = ?", [id], function (err) { 
db.close(); 
callback(err, { changes: this.changes }); 
}); 
} 

module.exports = { 
getAllBaladas, 
getBaladaById, 
createBalada, 
updateBalada, 
deleteBalada 
};
