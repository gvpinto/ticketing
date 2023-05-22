# General Notes


## Install modules

`npm install typescript ts-node-dev express @types/express`

## Initialize TypeScript

`$ tsc --init`

## Start
`"start": "ts-node-dev --respawn --transpile-only src/index.ts"`

`"start" : "ts-node-dev --respawn --poll --inspect --exit-child src/index.ts`

## Check the container

`kubectl exec -it -c <container-name> <pod-name>`
