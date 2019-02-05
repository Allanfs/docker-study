# Docker Study

# Configuração Docker em Proxy Interno
Com base na [documentação oficial do Docker sobre configuração de proxy HTTP e HTTPS](https://docs.docker.com/config/daemon/systemd/#httphttps-proxy).

## Conteúdo
- [Instruções de Configuração](#instru%C3%A7%C3%B5es-de-configura%C3%A7%C3%A3o) 
- [Senha e Encode de Caracter](#senha-e-encode-de-caracter) 

## Motivações
A motivação partiu da necessidade de utilizar o Docker dentro da rede da Dataprev sem utilização de proxy interno na máquina do usuario.

## Instruções de Configuração
### Arquivo de Configuração do Docker
1. Crie o arquivo `/etc/systemd/system/docker.service.d/http_proxy.conf`
2. Em seu conteúdo insira o seguinte:
```bash
[Service]
Environment="HTTP_PROXY=http://[[usuario][:senha]@ProxyAdress[:porta]]"
```
> Onde:`[usuario]` e `[senha]` são campos obrigatórios caso a máquina host esteja sob proxy que necessite autenticação.
`proxyAdress` é o endereço da maquina de proxy(testado apenas com nome do endereço)
### Reinicio do processo
3. Execute os comandos
```bash
$ sudo systemctl daemon-reload
$ sudo systemctl restart docker
```
```bash
$ systemctl show --property=Environment docker
```
O comando acima exibirá no console exatamente o valor de `Environment` em `http_proxy.conf`:
```
Environment="HTTP_PROXY=http://[[usuario][:senha]@ProxyAdress[:porta]]"
```
### Execução
4. Execute o comando
```bash
$ docker info | grep HTTP
``` 
5. verifique que será exibido:
```bash
# Caso [usuario] e [senha] tenham sido informados, ou pelo menos o @ esteja na url:
HTTP Proxy: http://xxxxx:xxxxx@ProxyAdress[:porta]]
```
ou
```bash
# Caso [usuario] e [senha] tenham sido informados, ou pelo menos o @ esteja na url:
HTTP Proxy: http://ProxyAdress[:porta]]
```
6. Realizar um `run` 
```bash
$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
1b930d010525: Pull complete 
Digest: sha256:2557e3c07ed1e38f26e389462d03ed943586f744621577a99efb77324b0fe535
Status: Downloaded newer image for hello-world:latest

Hello from Docker!

```
### Senha e Encode de Caracter
---
Recomenda-se que, caso a senha utilize algum caracter especial, a utilização do [HTML Encoding Reference](https://www.w3schools.com/tags/ref_urlencode.asp) para substituir o caracter em questão deve ser feita.
**Porém**, caso a senha inserida em `http_proxy.conf` contenha alguns destes caracteres, a variável será ignorada, e nem na execução do comando `docker info | grep HTTP` retornará o esperado. 
Para a definição da variável no arquivo **não é necessário utilizar HTML Encoding Reference**

Links de Referência
---
* [request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)](https://github.com/docker/kitematic/issues/2956)
* [Control Docker with systemd](https://docs.docker.com/config/daemon/systemd/)
* [Docker don't run with proxy [duplicate]](https://stackoverflow.com/questions/50766086/docker-dont-run-with-proxy)
* [Client.Timeout exceeded while awaiting headers](https://github.com/docker/for-win/issues/1534)
* [Using systemd to control the Docker daemon](https://success.docker.com/article/using-systemd-to-control-the-docker-daemon)


###### Referências:
[Docker Compose in 12 Minutes](https://www.youtube.com/watch?v=Qw9zlE3t8Ko)
