const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String, 
      required: true, 
      trim: true
    },
    createdBy: {
      type: String, 
      required: true, 
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      required: true, 
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);


// get total count of comments and replies on retrieval
// reduce method takes 2 params => an accumulator and currentValue. The accumulator is total and the currentValue is comment. As reduce() walks through the array, it passess the accumlating total and the current value of comment into the function, with the return of the function revising the total for the next iteration through the array. 

PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;