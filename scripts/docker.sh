#!/bin/bash
# Author:   TripleZ<me@triplez.cn>
# Date:     2019-03-11

echo -e "\n Build, up, down, check logs for SafeU front-end development docker container.\n"

if [ "$1" == "build" ]
then
    sudo docker build --force-rm -t safeu-frontend:latest -f ../Dockerfile ..

elif [ "$1" == "run" ]
then
    sudo docker run -d -e TZ=Asia/Shanghai -p 8000:8080 --name safeu-frontend safeu-frontend
    echo -e " Your SafeU front-end container running on backgroud,
 served on http://127.0.0.1:8000\n"

elif [ "$1" == "stop" ]
then
    sudo docker stop safeu-frontend

elif [ "$1" == "logs" ]
then
    echo -e " Follow log output? (y/n, default: n): \c"
    read isF
    echo ""
    if [ "$isF" == "y" ] || [ "$isF" == "Y" ]
    then 
        sudo docker logs -f safeu-frontend
    else
        sudo docker logs safeu-frontend
    fi

elif [ "$1" == "rm" ]
then
    sudo docker rm safeu-frontend

elif [ "$1" == "help" ] || [ "$1" == "-h" ] || [ "$1" == "--help" ]
then
    echo -e " Usage:
  ./docker.sh [COMMAND]
  ./docker.sh -h|--help

 Commands:
   build      Build SafeU front-end container image.
   help       Show this help message.
   logs       View output from front-end container.
   rm         Remove SafeU front-end container.
   run        Run SafeU front-end container.
   stop       Stop SafeU front-end container.
"

else
    echo -e " Cannot match the command \"$1\", please type \"help\" command for help.\n"
fi
