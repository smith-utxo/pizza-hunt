const { Pizza } = require('../models');

const pizzaController = {
  // the function will go here as methods 
  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err); 
      res.status(400).json(err);
    });
  }, 

  // get 1 pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({_id: params.id })
    .then(dbPizzaData => {
      // If no pizza is found, send 404 error
      if (!dbPizzaData){
        res.status(404).json({ message: 'No Pizza found with this id!'});
        return; 
      }
      res.json(dbPizzaData);
    })
    .catch(err => {
      console.log(err); 
      res.status(400).json(err);
    })
  }, 

  // create a Pizza
  createPizza({ body }, res) {
    Pizza.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.status(400).json(err)); 
  }, 
  // update pizza by id
updatePizza({ params, body }, res) {
  // new: true 3rd parameter means it will return the updated document vs. the original document. 
  Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
},
// delete pizza
deletePizza({ params }, res) {
  Pizza.findOneAndDelete({ _id: params.id })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
}
};

module.exports = pizzaController; 