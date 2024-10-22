<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Description

In this project we will see an Api to manage a list of Services, assign them to Users, and will allow a user to query and manage their services.

## Requirements

- NestJs
- Docker
- Some Rest-Client (Postman/Insomnia)

## Steps to use

#### 1. Clone the repository

```shell
 git clone https://github.com/Julian-Escobar-E3/simphony-technical-test.git
```

#### 2. Install the dependencies

```shell
npm install
```

#### 3. Copy the `.env.template` file and rename it to `.env`.

#### 4. Set your environment variables

#### 5. Set up database

```shell
docker compose up -d
```

#### 6. Run the project

```shell
npm run start:dev
```

#### 7. Run Seed

```shell
http://localhost:3000/api/seed
```

#### 8. Enjoy 😁

## Http Requests File

[To import in a rest client](http-requests.json)

## Swagger documentation endpoint

```shell
http://localhost:3000/api
```
