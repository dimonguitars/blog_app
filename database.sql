CREATE TABLE posts (
  id primary key
  username text not null unique,
  message TEXT
  DATATIME
  );


  create table posts (
 id serial primary key,
 username text not null,
 title TEXT,
 message TEXT
);
INSERT INTO posts (id, username, message) VALUES (1, 'Cheese', 'Hello Word');
