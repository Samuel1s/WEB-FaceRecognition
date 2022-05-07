# WEB-FaceRecognition

## Introdução
<div style='text-align: justify'>
O presente trabalho tem como intuito utilizar a tecnologia de reconhecimento facial para autenticar
usuários no ambiente web. É muito comum a utilização neste ambiente a autenticação por dois fatores 
(2FA) para aprimorar o processo.Todavia, este trabalho não busca a substituição da tecnologia existente de aprimoramento mas apresenta a oportunidade de analisarmos a performance e viabilidade do uso da tecnologia de reconhecimento facial no ambiente web como um segunda forma de aprimorarmos o processo de autenticação. 

![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/Web-FaceRec.png)
---

## Sumário
Os cabeçalhos de suas seções serão usados para referenciar o local de destino.

- [Descrição](#Descrição)
- [Como Usar](#Uso)
- [Referências](#Referencias)
- [Créditos](#Créditos)
- [Informações do Autor](#author-info)

---

## Descrição

Este projeto foi totalmente pensado para disponibilizar para o público uma forma simples e eficiente do uso do reconhecimento facial como autenticador em aplicações web. Contudo para isso, faz-se necessário uma breve discussão das possíveis tecnologias que deverão existir para que o funcionamento seja efetivo. Neste projeto, foi utilizado o serviço cognitivo(_cognitive services_) da  **Microsoft Azure** como uma API dedicada a detectar e verificar a face dos usuários que irão usufruir da aplicação. Para tal, torna-se necessário uma conta no **Microsoft Azure**, mas não se preocupe para esse protótipo a criação da conta bem como o serviço da API utilizado são 100% gratuitos, limitando-se apenas à quantidade disponível no número de requisições por minuto(20 por minuto). Portanto crie uma conta no [Azure](https://azure.microsoft.com/pt-br/) para usar este serviço. **OBS: Não se preocupe, pois mesmo pedindo o seu número de cartão de crédito, para este serviço nenhum valor será cobrado.**

Após a criação da sua conta entre no _Portal Azure_ na barra de pesquisa e digite **Face API** e crie um novo serviço de Reconhecimento Facial. É importante definir bem a região na qual o serviço utilizado será hospedado. Vale destacar, **para a utilização de 20 chamadas por minuto de forma gratuita é necessário escolher a região _EAST-US_**. O restante como nome e o Grupo de Recurso(_Resource Group_) irão variar conforme o seu gosto. Não se preocupe com detalhes como TAGs e outras coisas, vá no automático e sempre utilize uma nomenclatura que irá te ajudar a lembrar.

### Etapa 1 
#### Dentro do Portal Azure.
![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/Portal_Azure.png)
---

### Etapa 2
#### Criação de um novo serviço. 
![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/Create_Details.png)
---

### Etapa 3
#### Detalhe do projeto - Deve-se escolher a região EAST-US para ter o serviço gratuito. 
![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/Project_FaceAPI_Details.png)
---

### Etapa 4
#### Com o processo realizado com sucesso deve aparecer algo semelhante a isto. 
![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/RFA_Details.png)
---

Com o final destes processos você estará apto a utilizar a API. Para isso, basta utilizar o seu _ENDPOINT_ e a sua _KEY_ que estará em _Keys and Endpoints_. É importante manter essa chave em segredo então utilize uma forma de utilizá-la de forma secreta em sua aplicação. Por exemplo, no seguinte código abaixo nota-se o uso do _Endpoint_ em **API_URL** e da chave em **KEY** que são passadas por parâmetro ao renderizar o _FrontEnd_ da aplicação.  

```html
    <script>
        const processImage = async (sourceImage) => {    
            var param = {
                'detectionModel': 'detection_01',
                'returnFaceId': 'true',
                'returnAge': 'true',
                'returnFaceRectangle': 'true',
                'returnFaceAttributes': 'age, emotion, gender, smile', 
                'recognitionModel': 'recognition_01'
            }
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: API_URL + 'detect', 
                    headers: { 'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': KEY },
                    params: param,
                    data: sourceImage,
                })

                if (data.length == 1) {
                    return data[0].faceId
                }
            } catch (error) {
                console.error(error)
            }
        }
    </script>
```
Ademais, as outras tecnologias utilizadas ficam a critério do desenvolvedor. No projeto em questão foram utilizadas tecnologias que facilitaram a implementação da aplicação como por exemplo a linguagem _JavaScript_ tanto no _FrontEnd_ quanto no _BackEnd_ do projeto. Via de regra, tornam-se necessários com exclusividade apenas o **FaceAPI** da **Azure** e a linguagem **JavaScript** no _FrontEnd_ da aplicação para fazer as requisições da **API** necessárias. A outras como **Pug**, **Express** e o **MongoDB - Atlas** ficam a critério do desenvolvedor, podendo ser substituídas. 

### Tecnologias

- Microsoft Azure - Face API.   [Link FaceAPI-Docs](https://docs.microsoft.com/pt-br/azure/cognitive-services/face/overview)
- MongoDB Atlas.   [Link MongoDB](https://www.mongodb.com/pt-br/cloud/atlas/)
- Node JS.   [Link Node](https://nodejs.org/en/)
- Express JS.   [Link Express](https://expressjs.com/pt-br/)
- Pug Engine.   [Link Pug](https://pugjs.org/api/getting-started.html)
- JavaScript + CSS3.   [Link JS+CSS](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

[Voltar para cima](#web-facerecognition)

---

## Uso

Com o ambiente node instalado em sua máquina tornam-se necessários apenas o clone desse repositório em um diretório e o uso do comando **npm install** neste. Com isso, todas as dependências necessárias do projeto contidas no _package.json_ serão instaladas em sua máquina e tornará apto o funcionamento da aplicação em seu computador. Entretanto, como dito anteriormente, as tecnologias poderão ser substituídas, caso a sua opção seja a de manter as tecnologias presentes neste repositório é necessário a troca de alguns parâmetros para o funcionamento efetivo desta aplicação. Um exemplo é a string de conexão ao banco de dados mongodb atlas presente em _app/src/config/db.js_ podemos notar que a **URI** necessita de uma string que vem por parâmetro pelo **.env** do projeto.

Ademais as outras strings necessárias para o funcionamento da aplicação estão mencionadas no arquivo _app/.env-ex_. Podemos notar todas strings que serão necessárias para todo o projeto sendo duas delas opcionais como a **PORT** e a **LOCAL_URL** e três obrigatórias como **DB_CONNECTION**, **KEY** e **API_URL**.
![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/env-ex.png)
---

Portanto, com essa etapa concluída basta renomear esse arquivo para **.env** e com as dependências instaladas basta digitar o comando **npm run start** dentro do diretório _/app_ (onde ficará o package.json) para iniciar a aplicação em um ambiente local. Em seu navegador de preferência entre no seu servidor local + _/login_ para utilizar a aplicação. 

![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/terminal-ex.png)
![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/tela_login.png)

### Installation
1. [node](https://nodejs.org/en/)
2. npm install


#### API Reference

```html
    <p>dummy code</p>
```
[Voltar para cima](#web-facerecognition)

---

## Referências
[Voltar para cima](#web-facerecognition)

---

## Créditos

MIT License

Copyright (c) [2017] [James Q Quick]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Voltar para cima](#web-facerecognition)

---

## Informações do Autor

- LinkedIn - [MeuPerfil](https://www.linkedin.com/in/samuel-dos-santos-29863113b/)
- GitHub - [This](https://github.com/Samuel1s)

[Voltar para cima](#web-facerecognition)
</div>
