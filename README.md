Create a env file based on the example file
run:
export $(cat .env) to get all the envs
run npm start to start the server
create users, by default all have 100 balance at the start

```
curl --location 'localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username":"jonmontaluisa1@gmail.com",
    "password":"12345",
    "status":"active"
}'
```


create operations
```
curl --location 'localhost:3000/operations' \
--header 'Content-Type: application/json' \
--data '{
    "type":"random_string",
    "cost":1
}'
```
The operations that should be created are addition, substraction, multiplication, division sqr_root, random_string


request a operation
```
curl --location --request GET 'localhost:3000/request-operation' \
--header 'user_id: abcb1764-3952-4cbb-987c-6b7aed510275' \
--header 'Content-Type: application/json' \
--data '{
    "operation_type": "random_string"
}'
```
another operation
```
curl --location --request GET 'localhost:3000/request-operation' \
--header 'user_id: abcb1764-3952-4cbb-987c-6b7aed510275' \
--header 'Content-Type: application/json' \
--data '{
    "operand_one":2,
    "operand_two":3,
    "operation_type": "addition"
}'
```


the user_id is needed because that is how we nknow which user to charge