rsync -a --progress ./ deploy@api-staging.topia.us:/home/deploy/topia-api

ssh deploy@api-staging.topia.us 'cd /home/deploy/topia-api && sudo docker-compose down && sudo docker-compose up -d'
