# WEB-FaceRecognition

## Introdução

O presente trabalho tem como intuito utilizar a tecnologia de reconhecimento facial para autenticar
usuários no ambiente web. É muito comum a utilização neste ambiente a autenticação por dois fatores 
(2FA) para aprimorar o processo.Todavia, este trabalho não busca a substituição da tecnologia existente de aprimoramento mas apresenta a oportunidade de analisarmos a performance e viabilidade do uso da tecnologia de reconhecimento facial no ambiente web como um segunda forma de aprimorarmos o processo de autenticação. 

![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/Web-FaceRec.png)
---

## Sumário
Os cabeçalhos de suas seções serão usados para referenciar o local de destino.

- [Descrição](#Descrição)
- [Como Usar](#ComoUsar)
- [References](#references)
- [License](#license)
- [Author Info](#author-info)

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

Com o final destes processos você estará apto a utilizar a API. Para isso, basta utilizar o seu _ENDPOINT_ e a sua _KEY_ que estará em _Keys and Endpoints_ é importante manter essa chave em segredo então utilize uma forma de utilizá-la de forma secreta em sua aplicação. Por exemplo, no seguinte código abaixo nota-se o uso do endpoint em **'API_URL'** e da chave em **KEY** que são passadas por parâmetro ao renderizar o _FrontEnd_ da aplicação.  

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
Ademais, as outras tecnologias utilizadas ficam a critério do desenvolvedor. No projeto em questão foram utilizadas tecnologias que facilitaram a implementação da aplicação como por exemplo a linguagem _JavaScript_ tanto no _FrontEnd_ quanto no _BackEnd_ do projeto. Via de regra, tornam-se necessários com exclusividade apenas o **FaceAPI** da **Azure** e a linguagem **JavaScript** no _FrontEnd_ da aplicação para fazer as requisições da **API** necessárias. A outras como **Pug**, **Express** e o **MongoDB - Atlas** ficam a critério do desenvolvedor, podendo ser substituídos. 

### Tecnologias

- Microsoft Azure - Face API. [FaceAPI-Docs](https://docs.microsoft.com/pt-br/azure/cognitive-services/face/overview)
- MongoDB Atlas. [MongoDB](https://www.mongodb.com/pt-br/cloud/atlas/)
- Node JS. [Node](https://nodejs.org/en/)
- Express JS. [Express](https://expressjs.com/pt-br/)
- Pug Engine.[Pug](https://pugjs.org/api/getting-started.html)
- JavaScript + CSS3. [JS+CSS](https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

[Voltar para cima](#web-facerecognition)

---

## Como Usar

#### Installation



#### API Reference

```html
    <p>dummy code</p>
```
[Voltar para cima](#web-facerecognition)

---

## References
[Voltar para cima](#web-facerecognition)

---

## License

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

[Back To The Top](#web-facerecognition)

---

## Author Info

- Twitter - [@jamesqquick](https://twitter.com/jamesqquick)
- Website - [James Q Quick](https://jamesqquick.com)

[Back To The Top](#web-facerecognition)