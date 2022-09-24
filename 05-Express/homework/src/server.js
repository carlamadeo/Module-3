// const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
let id = 1;

const createPost = (author, title, contents) => {
  const post = {
    id: id++,
    author,
    title,
    contents
  }
  return post;
}

const findByString = (searchString) => {
  return posts.filter(post =>
    post.title.includes(searchString) ||
    post.contents.includes(searchString))
}

const findByKey = (key, type) => {
  return posts.filter(post =>
    post[type] === key
  )
}

const findByAuthorTitle = (author, title) => {
  return posts.filter(post =>
    post.author === author && post.title === title
  )
}

const deletePosts = (postsArray) => {
  postsArray.forEach(post => {
    posts.splice(posts.indexOf(post), 1)
  });
}

server.post('/posts/', (req, res) => {
  const {author, title, contents} = req.body;

  if(author && title && contents) {
    const post = createPost(author, title, contents);
    posts.push(post);
    return res.json(post);
  }

  res.status(STATUS_USER_ERROR).json({
    error: 'No se recibieron los parámetros necesarios para crear el Post'
  });

});

server.post('/posts/author/:author', (req, res) => {
  const {title, contents} = req.body;
  const {author} = req.params;

  if(author && title && contents) {
    const post = createPost(author, title, contents);
    posts.push(post);
    return res.json(post);
  }

  res.status(STATUS_USER_ERROR).json({
    error: 'No se recibieron los parámetros necesarios para crear el Post'
  });

});

server.get('/posts/', (req, res) => {
  const {term} = req.query;

  term ? res.json(findByString(term)) : res.json(posts);
});

server.get('/posts/:author', (req, res) => {
  const authorPosts = findByKey(req.params.author, 'author');

  if(authorPosts.length) return res.json(authorPosts);

  res.status(STATUS_USER_ERROR).json({
    error: 'No existe ningun post del autor indicado'
  });

});

server.get('/posts/:author/:title', (req, res) => {
  const authorTitlePosts = findByAuthorTitle(req.params.author, req.params.title);

  if(authorTitlePosts.length) return res.json(authorTitlePosts);

  res.status(STATUS_USER_ERROR).json({
    error: 'No existe ningun post con dicho titulo y autor indicado'
  });

});

server.put('/posts/', (req, res) => {
  const {id, title, contents} = req.body;

  if(id && title && contents) {
    const post = findByKey(parseInt(id), 'id')[0];

    if(post) {
      post.title = title;
      post.contents = contents;
      return res.json(post);
    }
    return res.status(STATUS_USER_ERROR).json({
      error: `No se encontró el post con id ${id}`
    });
  }

  res.status(STATUS_USER_ERROR).json({
    error: 'No se recibieron los parámetros necesarios para modificar el Post'
  });


});

server.delete('/posts/', (req, res) => {
  const {id} = req.body;

  if(id) {
    const posts = findByKey(parseInt(id), 'id');
    if(posts.length) {
      deletePosts(posts);
      return res.json({success: true});
    }
    return res.status(422).json({error: "No existe un Post con ese id"});
  }
  res.status(422).json({error: "Debe indicarse un id"});

});

server.delete('/author/', (req, res) => {
  const {author} = req.body;

  if(author) {
    const posts = findByKey(author, 'author');
    if(posts.length) {
      deletePosts(posts);
      return res.json(posts);
    }
    return res.status(422).json({error: "No existe el autor indicado"});
  }

  res.status(422).json({error: "No existe el autor indicado"});

})

module.exports = {posts, server};