// npm i vision inert hapi-swagger

const Hapi = require('hapi');
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')
const Schema = require('./../db/strategies/mongodb/schemas/heroiSchame')
const HeroRoutes = require('./../routes/heroRoute');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');
const inert = require('inert');
const app = new Hapi.Server({
    port:5000
});

function mapRoutes(instance, methods){   
    return methods.map(method => instance[method]());
}

async function main(){
    const connection = MongoDb.connect()
    const mongoDb = new Context(new MongoDb(connection, Schema))
    const swaggerOption = {
        info: {
            title: 'API Herois',
            version: 'V1.0'
        },
        lang: 'pt'
    }
    await app.register([
        vision,
        inert,
        {
            plugin: hapiSwagger,
            option: swaggerOption
        }
    ])
    app.route(mapRoutes(new HeroRoutes(mongoDb), HeroRoutes.methods()))

    await app.start()
    console.log('server running at', app.info.port)

    return app;
}
module.exports = main()