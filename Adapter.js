var  _ = require('underscore');

/**
 * Adapter.js
 * to-do:
 *   return promises for everything.
 */
function Adapter(db) {
  this._db = db;
}

_(Adapter.prototype).extend({

  /**
   * Find all records of given type.
   */
  findAll: function(type) {

    var map = function(doc, emit) {
      if (doc.type === type) {
        emit(doc.name, null);
      }
    };

    var options = {
      include_docs: true,
      reduce: false,
    };

    var promise = this._db.query({map:map}, options);

    promise.then(function(resp) {
      return resp;
    }).catch(function(err) {
      console.log(err);
      return err;
    });
    return promise;

    // var data;
    // if (type == 'field') {
    //   data = [
    //     { type: 'field', _id: 'mythology', values: ['11','12'], name: 'mythology'},
    //     { type: 'field', _id: 'sex', values: ['13','14'], name: 'sex'},
    //     { type: 'field', _id: 'hobbies', values: ['15','16','17','18','19'], name: 'hobbies'},
    //     { type: 'field', _id: 'subject', values: ['191', '192'], name: 'subject'},
    //   ];
    // } else if(type == 'value') {
    //   data = [
    //     { type: 'value', _id: '11', root: true, name: 'greek', },
    //     { type: 'value', _id: '12', root: true, name: 'norse', },
    //     { type: 'value', _id: '13', root: true, name: 'f', },
    //     { type: 'value', _id: '14', root: true, name: 'm', },
    //     { type: 'value', _id: '15', root: true, name: 'riddles', },
    //     { type: 'value', _id: '16', root: true, name: 'coiling', },
    //     { type: 'value', _id: '17', root: true, name: 'luring', },
    //     { type: 'value', _id: '18', root: true, name: 'staring', },
    //     { type: 'value', _id: '19', root: true, name: 'growing', },
    //     { type: 'value', _id: '191', root: true, name: 'scary things', children: ['192'] },
    //     { type: 'value', _id: '192', root: false, name: 'monsters', },
    //   ];
    // } else if(type == 'node') {
    //   data = [
    //     { type: 'node', _id: '1', name: "sphinx", 'mythology': '11', 'sex': '13', 'hobbies': '15' },
    //     { type: 'node', _id: '2', name: "hydra", 'mythology': '11', 'sex': '14', 'hobbies': '16' },
    //     { type: 'node', _id: '3', name: "huldra", 'mythology': '12', 'sex': '13', 'hobbies': '17' },
    //     { type: 'node', _id: '4', name: "cyclops", 'mythology': '11', 'sex': '14', 'hobbies': '18' },
    //     { type: 'node', _id: '5', name: "fenrir", 'mythology': '12', 'sex': '14', 'hobbies': '19' },
    //     { type: 'node', _id: '6', name: "medusa",  'mythology': '11', 'sex': '13', 'hobbies': '16' },
    //   ];
    // }
    // return data;
  },

  find: function(type, ids) {

  },

});

module.exports = Adapter;
