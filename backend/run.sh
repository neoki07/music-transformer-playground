NAME='music-transformer-playground-backend'
trap "docker stop $NAME" SIGINT
if [ "$(docker ps -q -a -f name=$NAME)" ];then
  echo 'run local docker container'
  docker start $NAME && docker logs -f $NAME
exit 1
else
  docker build -t $NAME .
  docker run --log-opt max-size=10m --log-opt max-file=3 --name $NAME -v ${PWD}/src/:/src -p 8080:8080 $NAME
fi