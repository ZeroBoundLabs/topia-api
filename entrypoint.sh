#!/bin/sh
npm i
npx sequelize db:migrate
node ./dist/bundle.js
