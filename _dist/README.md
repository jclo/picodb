# PicoDB

[![NPM version][npm-image]][npm-url]
[![GitHub last commit][commit-image]][commit-url]
[![Travis CI][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependencies status][dependencies-image]][dependencies-url]
[![Dev Dependencies status][devdependencies-image]][devdependencies-url]
[![npm bundle size][npm-bundle-size-image]][npm-bundle-size-url]
[![License][license-image]](LICENSE.md)


PicoDB is an in-memory database that stores JSON like documents. It runs both on Node.js and in the ES6 compliant browsers.

PicoDB manages the documents as MongoDB for a collection. It provides a flexible API (MongoDB like) to insert, update, delete and find documents.

PicoDB is useful when you want to manage documents directly inside your Web App.

Nota:
From PicoDB 1.x IE browsers aren't supported. PicoDB 0.12 is the latest version that is IE compliant.


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
const PicoDB = require('picodb');

const db = PicoDB();
```

In the browser:
```javascript
const db = PicoDB();
```

### Listen for a Response

There is now three ways to listen a response from a `PicoDB` instance:

  * Via Callback:
  ```javascript
  db.find({}).toArray((err, resp) => {
      // your code
  });
  ```

  * Via then/catch
  ```javascript
  db.find({}).toArray()
      .then((resp) => {
        // your code
      })
      .catch((err) => {
        // your code
      });
  ```

  * Via async/await
  ```Javascript
  async function aaa() {
      ...
      const resp = await db.find({}).toArray();
      ...
  }
  ```



### Insert documents

PicoDB provides two methods for inserting documents.

A method for inserting one document:
```javascript
const doc = await db.insertOne({ a: 1 });
// doc contains the inserted document with its unique id.
```

And a method for inserting a set of documents:
```javascript
const docs = await db.insertMany([{ a: 1 }, { a: 2, b: 2 }]);
// docs contains the inserted documents with their unique id.
```

### Update documents

PicoDB provides two methods for updating documents.

A method for updating the first document that matches the query:
```javascript
const doc = await db.updateOne({ a: 1 }, { c: 'aaa' });
// doc contains the updated document.
```

And a method for updating all the documents that match the query:
```javascript
const docs = await db.updateMany({ a: 1 }, { c: 'aaa' });
// docs contains the updated documents.
```

The first method replaces the first document (the oldest one) into the database that contains the key-value pair `{ a: 1 }` by the new document ` { c: 'aaa' }` while the second method replaces all the documents that contain this key-value pair by the new document.

These methods replace the document(s) but they do not alter their `_id`.

The update methods provide the two operators `$set` and `$unset` for a finest update granularity.

The following operation:
```javascript
const docs = await db.updateOne({ a: 1 }, { $set: { c: 'new' }});
```
selects the first document into the database that contains the field `a = 1` (or the key-value pair `a = 1`) and replaces the value of the field `c` by `new` or adds the field if it doesn't exist.

while the following operation:
```javascript
const docs = await db.updateOne({ a: 1 }, { $unset: { c: 'aaa' }});
```
removes the field `c = 'aaa'`.


### Delete documents

PicoDB provides two methods for deleting documents.

A method for deleting the first document that matches the query:
```javascript
const num = await db.deleteOne({ a: 1 });
// num contains the number of deleted documents (here 0 or 1).
```

And a method for deleting all the documents that match the query:
```javascript
const num = await db.deleteMany({ a: 1 });
// num contains the number of deleted documents.
```

### Count documents

PicoDB provides one method to count the number of the documents into the database that match the query.
```javascript
const count = await db.count({ a: 1 });
// num contains the number of documents that match the query.
```

### Find documents

PicoDB provides one method to dump the documents that match the query.

The following instruction:
```javascript
const docs = await db.find({}).toArray();
```
dumps all the documents into the database as the query `{}` does not filter anything.

While the instruction:
```javascript
const docs = await db.find({ a: 1 }).toArray();
// docs is an array of documents that match the query.
```
dumps the documents that contain the field `a` with the value `1`.


#### Select the fields to extract

PicoDB allows selecting the fields to extract from the database.

The following instruction:
```javascript
const docs = await db.find({}, { c: 1, d: 1 }).toArray();
```

dumps all the documents but extracts only the fields `_id`, `c` and `d`. The field `_id` is extracted by default. You can reject it by adding `_id: 0` to the expression:
```javascript
const docs = await db.find({}, { _id: 0, c: 1, d: 1 }).toArray();
// docs is an array of documents that match the query.
```

Instead of defining the fields to extract, you can set the fields to exclude. This instruction:
```javascript
const docs = await db.find({}, { c: 0, d: 0 }).toArray();
// docs is an array of documents that match the query.
```

dumps all the documents with all the fields except `c` and `d`.


### Query Operators

PicoDB provides a subset of MongoDB's Query Operators like $eq, $gt, $gte, $lt, etc.

These operators allow more sophisticated queries.

The following instruction:
```javascript
const docs = await db.find({ a: { $gt: 1 }, b: { $lt : 6 }}).toArray();
```
dumps all the documents with the field `a` having a value `greater than` `1` AND the field `b` having a value `lower than` `6`.


### Listen

PicoDB provides, through a plugin, the following custom events `change`, `insert`, `update` and `delete` that are fired when a document into the database is modified.

The following instruction:
```javascript
const docs = db.on('change');
```
is executed when documents are inserted, updated or deleted.

This option uses the NPM package `@mobilabs/messenger`. You need to install it before instantiating `PicoDB` like that:

```javascript
import Messenger from 'path/to/@mobilabs/messenger';

PicoDB.plugin({ messenger: Messenger });
const db = PicoDB();
```

## API

### Constructor

```
Constructor   | Description
```
```
PicoDB        | Creates the PicoDB object (without the operator new).
```

### Static Methods

```
Static methods | Description
```
```
plugin         | Adds and external library.
```


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
$and     | Joins query clauses with a logical AND returns all documents that match the conditions of either clause.
$or      | Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
$not     | Inverts the effect of a query expression and returns documents that do not match the query expression.
```

#### Geospatial Operators

```
Operator       | Description
```
```
$geoWithin     | Selects geometries within a bounding GeoJSON geometry.
$geoIntersects | Selects geometries that intersect with a GeoJSON geometry.
$near          | Selects geometries that are inside limits on the Earth sphere.
```

`$geoWithin` and `$geoIntersects` GeoJSON geometries could only by `Polygon` and `MultiPolygon`.

`geoWithin` supports `Point`, `LineString`, `MultiPoint`, `MultiLineString` and `Polygon` geometries.

`geoIntersects` supports `LineString` and `Polygon` geometries.


##### Geometry Specifiers

`$geoWithin` could be used with the legacy shape operators:

```
$box           | Specifies a rectangle to return documents that are within the rectangle.
$polygon       | Specifies a rectangle to return documents that are within the polygon.
$center        | Specifies a circle to return documents that are within the circle.
$centerSphere  | Specifies a earth-like sphere to return documents that are within the sphere.
```

`$near` could be used with the following operators:

```
$minDistance   | Specifies a minimum distance to limit the results of queries.
$maxDistance   | Specifies a maximum distance to limit the results of queries
```

`$minDistance` and `$maxDistance` specify the distance in meters.


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


### Events (optional)

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
[release-image]: https://img.shields.io/github/release/jclo/picodb.svg?include_prereleases&style=flat-square
[commit-image]: https://img.shields.io/github/last-commit/jclo/picodb.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/jclo/picodb.svg?style=flat-square
[coveralls-image]: https://img.shields.io/coveralls/jclo/picodb/master.svg?style=flat-square
[dependencies-image]: https://david-dm.org/jclo/picodb/status.svg?theme=shields.io
[devdependencies-image]: https://david-dm.org/jclo/picodb/dev-status.svg?theme=shields.io
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/minzip/picodb.svg?style=flat-square
[license-image]: https://img.shields.io/npm/l/picodb.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/picodb
[release-url]: https://github.com/jclo/picodb/tags
[commit-url]: https://github.com/jclo/picodb/commits/master
[travis-url]: https://travis-ci.org/jclo/picodb
[coveralls-url]: https://coveralls.io/github/jclo/picodb?branch=master
[dependencies-url]: https://david-dm.org/jclo/picodb
[devdependencies-url]: https://david-dm.org/jclo/picodb?type=dev
[license-url]: http://opensource.org/licenses/MIT
[npm-bundle-size-url]: https://img.shields.io/bundlephobia/minzip/picodb
