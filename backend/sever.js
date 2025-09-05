//importando os módulos
const express = require("express");
const cors = require("cors")

//criando a instancia da aplicação
const app = express();

//define a porta em que o servidor vai rodar
const port = 3001;

//configura o express para analisar requisições no corpo da pagina no formato JSON
app.use(express());
//habilita o CORS para todas as rotas da aplicação, permitindo acesso de outros dominios
app.use(cors());

//criando o objeto que servirá como tabela

const precos={
    bicicleta:1.10, //Preço por KM para bike
    moto:1.50, //Preço por KM para moto
    drone:2.50 //Preço por KM para drone
}
    
//criando a função para rota calcular frete
app.post("/calcularfrete",(req,res)=>{
    // desestrutura o corpo da requisição para extrair os dados
    const{distancia,tipoTransporte} = req.body;

    // verifica se distancia ou tipo de transporte não forem validos na requisição

    if(distancia === undefined || tipoTransporte === undefined){
        return res.status(400).json({error:"distancia e tipo de transporte são obrigratórios"})
    }
    // Busca o preço por km no objeto "precos" convertendo o tipo de transport para minúsculas.
    const precoPorKm = precos[tipoTransporte.toLowerCase()];

    if(precoPorKm === undefined){
          return res.status(400).json({error:"tipo de transporte inválido"})
    }
    // calculo para o valor total do frete 
    const valorTotal= distancia * precoPorKm;

    //Envia a resposta como objeto json e formato para trazer apenas 2 casas decimais
    res.json({valorTotal: valorTotal.toFixed(2)})
})


//Iniciando o servidor para que possa escutar as requisições
app.listen(port,()=>{
    console.log("servidor rodando na porta https://localhost:3001")
})
