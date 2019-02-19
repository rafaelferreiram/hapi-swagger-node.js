const Hapi = require('hapi');
const MongoDb = require('./../../db/strategies/mongodb/mongodb')
const Context = require('./../../db/strategies/base/contextStrategy')
const Schema = require('./../../db/strategies/mongodb/schemas/heroiSchame')
const app = new Hapi.Server({
    port:5000
});

async function main(){
    const connection = MongoDb.connect();
    const context = new Context(new MongoDb(connection,Schema));

    app.route([
        {
            path:'/herois',
            method:'GET',
            handler:(req,head) => {
                return context.read()
            }
        }
    ])

    await app.start();
    console.log('Servidor rodando na porta -> ',app.info.port);
}
main()