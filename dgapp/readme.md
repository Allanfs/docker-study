## Docker Compose de Vue, Spring, Postgres

No `create-db.sql` possui os script que devem ser executados pela imagem do postgres.

> create-db.sql  ->  Dockerfile  ->  docker-compose.yml

Docker-compose define container para:
* Backend: em spring em imagem maven
* Frontend: em Vuejs em imagem node
* Database: em Postgres em imagem herdada de postgres