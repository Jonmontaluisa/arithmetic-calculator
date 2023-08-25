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
curl --location --request GET 'https://arithmetic-calculator-4s2q.onrender.com/request-operation' \
--header 'user_id: fa698c66-89d2-4010-a729-a0d6cb97c611' \
--header 'Content-Type: application/json' \
--data '{
    "operand_one":2,
    "operand_two":3,
    "operation_type": "addition"
}'
```
another operation

the user_id is needed because that is how we nknow which user to charge