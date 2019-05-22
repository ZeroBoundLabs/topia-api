#!/bin/sh

npx sequelize db:migrate
node ./dist/bundle.js
