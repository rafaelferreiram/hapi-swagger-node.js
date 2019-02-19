// docker ps

// docker exec -it 533f74d2705d mongo -u rafael -p rafael --authenticationDatabase herois

//show dbs
//use herois
//show collection

//db.herois.insert({nome:'Flash',poder:'Velocidade',dataNascimento:'1998-01-01'})
//db.herois.find()

//COMANDO JS NO MONGO
for(let i = 0 ; i < 1000 ; i++){
    db.herois.insert({
        nome:`Clone-${i}`,
        poder:'Velocidade',
        dataNascimento:'1998-01-01'
    })
}

//create 
db.herois.insert({nome:'Flash',poder:'Velocidade',dataNascimento:'1998-01-01'})

//read
db.herois.find({_id: ObjectId("5c656c359c4fe90811c55c5d")})
db.herois.find()

//update
db.herois.update({ _id: ObjectId("5c656c359c4fe90811c55c5d") },
    { $set: { nome: 'Lanterna Verde' } }) // assim so modifica o primeiro que encontrar, mesmo passando o nome ao inves do objectId
db.herois.update({ poder: 'Velocidade' },
    { $set: { poder: 'Forca' } }, { multi: true }
) // usa o multi:true pra atualizar todos

//delete
db.herois.remove({nome: 'Lanterna Verde'})
//
//use herois


// create
db.herois.create({ nome: 'Iron man', poder: 'Rico'})

// read
db.herois.find({})

// update
db.herois.update({_id: id}, {$set: {nome: 'papaleguas'}})

// delete
db.herois.delete({_id: id})

