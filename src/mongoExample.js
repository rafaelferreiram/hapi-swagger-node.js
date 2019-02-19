const mongoose = require('mongoose');

mongoose.connect('mongodb://rafael:rafael@localhost:27017/herois',
    { useNewUrlParser: true },(error) => {
        if (!error) return;
        console.error('Falha na conexao ', error);
    });

const connection = mongoose.connection;
connection.once('open', () => console.log('Database rodando'));

const heroisSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder:{
        type:String,
        required:true
    },
    insertAt:{
        type: Date,
        default: new Date()
    }
});

const model = mongoose.model('herois',heroisSchema);


async function main(){
    const resultCadastrar = await model.create({
        nome:'Batman',
        poder:'Grana'
    });
    console.log('Resultado cadastrar ', resultCadastrar);
    const listItens = await model.find().limit(10);
    console.log('Find -> ',listItens);
    process.exit();
}
main();