# PicoDB

[![NPM version][npm-image]][npm-url]
[![Travis CI][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![License][license-image]](LICENSE.md)
<!--- [![node version][node-image]][node-url] -->

[![NPM install][npm-install-image]][npm-install-url]

PicoDB is an in-memory database that stores JSON like documents. It runs both on Node.js and in the browser.

PicoDB manages the documents that are similar to a MongoDB's collection. It provides a flexible API (MongoDB like) to insert, update, delete and find documents.

PicoDB is useful when you have a small set of documents to store and you don't want to setup a database server.


## Quick Startup

### Documents

A document is a Javascript literal object. It is similar to a JSON object. A set of key-value pairs.

When a document is inserted into the database, it gets an unique id that is a string of 16 characters. Thus, a document into the database looks like:
```javascript
{ _id: 'atpl4rqu8tzkt9', name: { first: 'John', last: 'Doe' }, email: 'john@doe.com' }
```


### Create the database

On Node.js:
```javascript
PicoDB = require('picodb');

var db = PicoDB.Create();
```

In the browser:
```javascript
var db = PicoDB.Create();
```


### Insert documents

PicoDB provides two methods for inserting documents. A method for inserting one document:
```javascript
db.insertOne({ a: 1 }, function(err, doc){
  // doc contains the inserted document with its unique id.
});
```

And a method for inserting a set of documents:
```javascript
db.insertMany([{ a: 1 }, { a: 2, b: 2 }], function(err, docs) {
  // docs contains the inserted documents with their unique id.
});
```

### Update documents

PicoDB provides two methods for updating documents. A method for updating the first document that matches the query:
```javascript
db.updateOne({ a: 1 }, { c: 'aaa' }, function(err, doc) {
  // doc contains the updated document.
});
```

And a method for updating all the documents that match the query:
```javascript
db.updateMany({ a: 1 }, { c: 'aaa' }, function(err, docs) {
  // docs contains the updated documents.
});
```

The first method replaces the first document (the oldest one) into the database that contains the key-value pair `{ a: 1 }` by the new document ` { c: 'aaa' }` while the second method replaces all the documents that contain this key-value pair by the new document.

These methods replace the document(s) but they do not alter their `_id`.

The update methods provide the two operators `$set` and `$unset` for a finest update granularity.

The following operation:
```javascript
db.updateOne({ a: 1 }, { $set: { c: 'new' }}, function(err, docs) {
  //
});
```
selects the first document into the database that contains the field `a = 1` (or the key-value pair `a = 1`) and replaces the value of the field `c` by `new` or adds the field if it doesn't exist.

while the following operation:
```javascript
db.updateOne({ a: 1 }, { $unset: { c: 'aaa' }}, function(err, docs) {
  //
});
```
removes the field `c = 'aaa'`.


### Delete documents

PicoDB provides two methods for deleting documents. A method for deleting the first document that matches the query:
```javascript
db.deleteOne({ a: 1 }, function(err, num) {
  // num contains the number of deleted documents (here 0 or 1).
});
```

And a method for deleting all the documents that match the query:
```javascript
db.deleteMany({ a: 1 }, function(err, num) {
  // num contains the number of deleted documents.
});
```

### Count documents

PicoDB provides one method to count the number of the documents into the database that match the query.
```javascript
db.count({ a: 1 }, function(err, num) {
  // num contains the number of documents that match the query.
});
```

### Find documents

PicoDB provides one method to dump the documents that match the query.

The following instruction:
```javascript
db.find({}).toArray(function(err, docs) {
  // docs is an array of documents that match the query.
});
```
dumps all the documents into the database as the query `{}` does not filter anything.

While the instruction:
```javascript
db.find({ a: 1 }).toArray(function(err, docs) {
  // docs is an array of documents that match the query.
});
```
dumps the documents that contain the field `a` with the value `1`.


### Query Operators

PicoDB provides a subset of MongoDB's Query Operators like $eq, $gt, $gte, $lt, etc.

These operators allow more sophisticated queries.

The following instruction:
```javascript
db.find({ a: { $gt: 1 }, b: { $lt : 6 }}).toArray(function(err, docs) {
  //
});
```
dumps all the documents with the field `a` having a value `greater than` `1` AND the field `b` having a value `lower than` `6`.


### Listen

PicoDB provides the following custom events `change`, `insert`, `update` and `delete` that are fired when a document into the database is modified.

The following instruction:
```javascript
db.on('change', function(docs) {
  // docs contains the altered documents.
});
```
is executed when documents are inserted, updated or deleted.


## API

### Methods

PicoDB implements the following methods:

```
Method     | Description
```
```
count      | Counts number of matching documents into the db.
deleteMany | Deletes multiple matching documents into the db.
deleteOne  | Deletes the first matching document into the db.
insertMany | Inserts an array of documents into the db.
insertOne  | Inserts one document into the db.
updateMany | Updates multiple matching documents into the db.
updateOne  | Updates the first matching documents into the db.
find       | Finds multiple matching documents into the db.
toArray    | Returns the array of documents selected with the find method.
on         | Adds an event listener (alias of addEventListener).
one        | Adds an event listener that fires once (alias of addOneTimeEventListener).
off        | Removes the event listener (alias of removeEventListener).
```


### Query Operators

#### Comparison Operators

PicoDB implements the following Comparison Operators:

```
Operator | Description
```
```
$eq      | Matches values that are equal to a specified value.
$gt      | Matches values that are greater than a specified value.
$gte     | Matches values that are greater than or equal to a specified value.
$lt      | Matches values that are less than a specified value.
$lte     | Matches values that are less than or equal to a specified value.
$ne      | Matches all values that are not equal to a specified value.
$in      | Matches any of the values specified in an array.
$nin     | Matches none of the values specified in an array.
```


#### Element Operators

```
Operator | Description
```
```
$exists  | Matches documents that have the specified field.
```


#### Logical Operators

```
Operator | Description
```
```
$or      | Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
$not     | Inverts the effect of a query expression and returns documents that do not match the query expression.
```

#### Geospatial Operators

```
Operator | Description
```
```
$geoWithin     | Selects geometries within a bounding GeoJSON geometry.
$geoIntersects | Selects geometries that intersect with a GeoJSON geometry.
```

`$geoWithin` and `$geoIntersects` GeoJSON geometries could only by `Polygon` and `Multipolygon`.

`geoWithin` only work with `Point` geometry.

`geoIntersects` work with `LineString` and `Polygon` geometries.


##### Shape Operators

`$geoWithin` could be used with the legacy shape operators:

```
$box           | Specifies a rectangle to return documents that are within the rectangle.
$polygon       | Specifies a rectangle to return documents that are within the polygon.
$center        | Specifies a circle to return documents that are within the circle.
$centerSphere  | Specifies a earth-like sphere to return documents that are within the sphere.
```


### Update Operators

#### Field Operators

```
Operator     | Description
```
```
$inc         | Increments the value of the field by the specified amount.
$mul         | Multiplies the value of the field by the specified amount.
$rename      | Renames a field.
$set         | Sets the value of a field in a document or adds it.
$unset       | Removes the specified field from a document.
$min         | Updates the field if the specified value is less than the existing field value.
$max         | Updates the field if the specified value is greater than the existing field value.
$currentDate | Sets the value of a field to current date.
```


#### Array Operators

```
Operator     | Description
```
```
$pop         | Removes the first or last item of an array.
$pullAll     | Removes all matching values from an array.
$pull        | Removes all the array elements that match a specified query.
$push        | Adds an item to an array.
```

##### Array Update Operator Modifiers

`$push` operator can be used with the following modifiers:

```
Operator     | Description
```
```
$each        | Modifies the $push and operator to append multiple items for array updates.
$slice       | Modifies the $push operator to limit the size of updated arrays.
$position    | Modifies the $push operator to specify the position in the array to add elements.
```

##### Array Update Comparison Operators

`pull` operator can be used with the following comparison operators:

```
Operator     | Description
```
```
$eq          | Matches values that are equal to a specified value.
$gt          | Matches values that are greater than a specified value.
$gte         | Matches values that are greater than or equal to a specified value.
$lt          | Matches values that are less than a specified value.
$lte         | Matches values that are less than or equal to a specified value.
$ne          | Matches all values that are not equal to a specified value.
$in          | Matches any of the values specified in an array.
$nin         | Matches none of the values specified in an array.
```


### Events

```
Event type   | Description
```
```
change       | Fires when a document is modified with the methods insert, update or delete.
insert       | Fires when a document is inserted into the db.
update       | Fires when one or multiple documents are updated into the db.
delete       | Fire when one or multiple documents are deleted from the db.
```


## License

[MIT](LICENSE.md).

<!--- URls -->

[npm-image]: https://img.shields.io/npm/v/picodb.svg?style=flat-square
[npm-install-image]: https://nodei.co/npm/picodb.png?compact=true
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/picodb.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/picodb.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/picodb/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/picodb/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/picodb/dev-status.svg?theme=shields.io
[license-image]: https://img.shields.io/npm/l/picodb.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/picodb
[npm-install-url]: https://nodei.co/npm/picodb
[node-url]: http://nodejs.org/download
[download-url]: https://www.npmjs.com/package/picodb
[travis-url]: https://travis-ci.org/jclo/picodb
[coveralls-url]: https://coveralls.io/github/jclo/picodb?branch=master
[dependencies-url]: https://david-dm.org/jclo/picodb#info=dependencies
[devdependencies-url]: https://david-dm.org/jclo/picodb#info=devDependencies
[license-url]: http://opensource.org/licenses/MIT
