#! /bin/bash
docker run -d --net=host -p 8080:8080 \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:password@127.0.0.1:5432/postgres \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:v1.0.0-alpha45
