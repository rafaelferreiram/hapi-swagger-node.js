const BaseRoute = require('./base/baseRoute')
const Joi = require('joi');
const boom = require('boom');
const failAction = (request, headers, error) => {
    throw error;
}
class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }
    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                tags:['api'],
                description:'Deve listar os herois',
                validate: {
                    failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(50),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const { skip, limit, nome } = request.query;
                    const query = nome ? { nome: { $regex: `.*${nome}*.` } } : {}
                    return this.db.read(query, skip, limit);

                } catch (error) {
                    console.error('Deu ruim -> ', error);
                    return boom.internal();
                }
            }
        }
    }
    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                tags:['api'],
                description:'Deve cadastrar novos herois',
                validate: {
                    failAction,
                    payload:{
                        nome:Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(20)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder });
                    //console.log('Result -> ',result);
                    return { 
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }
                } catch (error) {
                    console.error('Deu ruim -> ', error);
                    return boom.internal()
                }
            }
        }
    }
    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags:['api'],
                description:'Deve atualizar os herois',
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: {
                        nome: Joi.string().min(3).max(100),
                        poder: Joi.string().min(2).max(20)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params;
                    const {payload} = request;
                    const dadosString = JSON.stringify(payload);
                    const dados = JSON.parse(dadosString);
                    // fazendo esse parse ele retira as propriedades undefined , assim atualizando so o que vier dado
                    const result = await this.db.update(id,dados);
                    //console.log('result -> ',result);
                    if(result.nModified !== 1)return{
                        message:'Nao foi possivel atualizar!'
                    }
                    return {
                        message:'Heroi atualizado com sucesso!'
                    }
                } catch (error) {
                    console.error('Deu ruim no atualizar-> ');
                    return boom.internal()
                }
            }
        }
    }
    delete(){
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags:['api'],
                description:'Deve deletar os herois',
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const {id} = request.params;
                    const result = await this.db.delete(id);
                   // console.log('result -> ',result);
                    return {
                        message:'Heroi removido com sucesso!'
                    }
                } catch (error) {
                    console.error('Deu ruim no Deletar-> ');
                    return boom.internal()
                }
            }
        }  
    }
}

module.exports = HeroRoutes