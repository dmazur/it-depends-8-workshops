# IT Depends #8 CDC Workshops

## Prequisites

To run this workshop you need several tools installed:

1. The [Docker Engine](https://docs.docker.com/engine/install/)
1. The [Docker Compose](https://docs.docker.com/compose/install/)

## How to

### Run the application

```sh
# start all services defined in the docker-compose.yaml
docker-compose -f docker-compose.yaml up
```

### Connect to the database

```sh
docker-compose -f docker-compose.yaml exec postgres env PGOPTIONS="--search_path=campaigns" bash -c 'psql -U $POSTGRES_USER postgres'
```

### Consume messages from the Kafka topic

```sh
docker-compose -f docker-compose.yaml exec kafka /kafka/bin/kafka-console-consumer.sh \
    --bootstrap-server kafka:9092 \
    --from-beginning \
    --property print.key=true \
    --topic dbserver1.campaigns.customers
```

TODO: Quick guide to psql

## Useful documentation

TODO

## TODOs

1. aaaa

## Acknowledgements

For the workshop we used the config files and images from the [Debezium Team Repositories](https://github.com/debezium). Cheers!
