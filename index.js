const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

//localhost ou 127.0.0.1
// const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL =
  "mongodb+srv://admin:oitgUbLNtlWkTVZV@cluster0.f91fnru.mongodb.net/";
const DB_NAME = "primeiro-banco-de-dados-09-02-23";

async function main() {
  //Conexao com Banco de Dados
  console.log("Conectando com o banco de dados...");
  const client = await MongoClient.connect(DB_URL);
  const db = client.db(DB_NAME);
  const collection = db.collection("itens");
  console.log("Banco de dados conectado com sucesso!");

  const app = express();

  //O que vier no body da requisição, é JSON
  app.use(express.json());

  //endpoint / -> Hello World
  app.get("/", function (req, res) {
    res.send("Hello World!");
  });

  //endpoint /oi -> Olá Mundo!
  app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
  });

  //Lista de informações

  const itens = [
    "Kratos",
    "Mario",
    "Sonic",
    "Luigi",
    "Peach",
    "Alucard",
    "Toad",
  ];
  //

  // CRUD -> Lista de Informações

  //Endpoint Read All -> [GET] /item
  app.get("/item", async function (req, res) {
    const documentos = await collection.find().toArray();
    res.send(documentos);
  });

  //Endpoin Read Single By Id -> [GET] /item/:id
  app.get("/item/:id", async function (req, res) {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });
    res.send(item);
  });

  //Endpoint Create -> [POST] /item
  app.post("/item", async function (req, res) {
    const item = req.body;
    await collection.insertOne(item);
    res.send(item);
  });

  //Endpoint Update -> [PUT] /item/:id
  app.put("/item/:id", async function (req, res) {
    const id = req.params.id;
    const body = req.body;

    //console.log(id, body);

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: body });

    res.send(body);
  });

  //Endpoint Delete -> [DELETE] /item/:id
  //Exercicio:
  // - pesquisar sobre a operacao de remover itens
  // - implementar o endpoint de delete
  // - realizar a operação de excluir item

  app.listen(3000);
}

main();
