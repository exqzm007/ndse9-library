## Mongo requests

### 1) To insert documents
> **db.books.insertMany([\
  { title: "Book 1", description: "About book 1", authors: "Author 1" },\
  { title: "Book 2", description: "About book 2", authors: "Author 2" }\
])**

### 2) To search by title
> **db.books.find({ "title": "Book 1" })**

### 3) To update by id
> **db.books.updateOne(\
  { "_id": ObjectId(ID) },\
  {\
    $set: {\
      "title": "Updated title",\
      "description": "Updated description"\
    }\
  }\
)**
