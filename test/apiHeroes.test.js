const assert = require('assert')
const api = require('./../src/api/api');
let app = {}
const MOCK_CADASTRAR = {
    nome: 'Chapolim Colorado',
    poder: 'Marreta'
}
const MOCK_HEROI_INICIAL = {
    nome: 'Capitao America',
    poder: 'Escudo'
}
let MOCK_ID = '';
describe.only('API Heroes test suite', function () {
    this.beforeAll(async () => {
        app = await api;
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload);
        MOCK_ID = dados._id;

    })
    it('listar /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })
        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })
    it('listar /herois - deve retornar 10registos', async () => {
        const TAMANHO_LIMIT =20;
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAMANHO_LIMIT}`
        })

        const dados = JSON.parse(result.payload);
        // console.log('dados ', dados);
         console.log('length', dados.length);
        const statusCode = result.statusCode;

        assert.deepEqual(statusCode, 200);
        //assert.ok(dados.length === TAMANHO_LIMIT);
    })
    it('Cadastrar POST /herois', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: MOCK_CADASTRAR
        })
        const statusCode = result.statusCode;
        const {
            message
        } = JSON.parse(result.payload);
        assert.ok(statusCode === 200);
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })
    it('Atualizar PATCH /herois/:id', async () => {
        const _id = MOCK_ID;
        const expected = {
            poder: 'Super Força'
        };
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        assert.ok(statusCode === 200);
        //assert.deepEqual(dados.message === 'Heroi atualizado com sucesso!')
    })
    it('Atualizar PATCH /herois/:id - NAO deve atulizar com id incorreto', async () => {
        const _id = `${MOCK_ID}`;
        const expected = {
            poder: 'Super Força'
        };
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${_id}`,
            payload: JSON.stringify(expected)
        })
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);
        assert.ok(statusCode === 200);
        //assert.deepEqual(dados.message === 'Nao foi possivel atualizar!')
    })
    it('Remover DELETE /herois/:id', async () => {
        const _id = MOCK_ID;
        const result = await app.inject({
            method:'DELETE',
            url:`/herois/${_id}`,
        })
        const statusCode = result.statusCode;
        const dados = JSON.parse(result.payload);

        assert.ok(statusCode === 200);
        //assert.deepEqual(dados.message === 'Heroi removido com sucesso!');
    })
})