function Adapter(pouch) {
  if (!(this instanceof Adapter)) return new Adapter(pouch);
  this._db = pouch;
}

// return promise for all records of given type
Adapter.prototype.findAll = function(type) {

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

};

Adapter.prototype.find = function(type, ids) {

};

Adapter.prototype.saveNode = function() {

};

/**
 * create node and metadata
 *
 * nodeData is hash of embedded attributes on node doc, no id or type.
 *
 * metadata is an array with objects like:
 * [ {field: 'something', value: 'something'} ]
 */
Adapter.prototype.createNode = function(nodeData, metadata) {

  var values = metadata.map(function(pair) {
    return {
      name: pair.value,
      _id: 'value'+pair.value,
      type: 'value',
      belongsTo: 'field'+pair.field,
    };
  });

  var fields = metadata.map(function(pair) {
    return {
      name: pair.field,
      _id: 'field' + pair.field,
      type: 'field',
    };
  });

  nodeData._id = 'node'+nodeData.name;
  nodeData.tyoe = 'node';
  nodeData.metadata = metadata.map(function(pair) {
    return {
      field: createId('field', pair.field),
      value: createId('value', pair.value)
    };
  });

  var opts = {
    include_docs: true
  };

  return this._db.bulkDocs(values.concat(fields, nodeData), opts)
    .then(function(resp) {
      console.log(resp);
    })
    .catch(function(err) {
      console.log(err);
    });
};

function createId(type, name) {
  return type+name;
}

module.exports = Adapter;
