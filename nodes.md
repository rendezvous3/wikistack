rm -rf .git/
npm install --save sequelize pg pg-hstore


- Setting Up Models

create folder models/index.js

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

- Terminal
createdb wikistack