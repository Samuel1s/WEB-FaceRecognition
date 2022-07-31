# WEB-FaceRecognition

## Introdução
O reconhecimento facial tornou-se presente e versátil em várias aplicações existentes atualmente. Da modelagem dinâmica em projetos de realidade aumentada a desbloqueios de tela por _smartphones_, essa tecnologia apresenta-se como uma solução viável e eficiente. Entretanto, para serviços de autenticação no ambiente _web_ ela ainda é pouco explorada, sendo uma ferramenta eficaz no combate a crimes cibernéticos como o preenchimento de credenciais _"credential stuffing"_(do inglês) facilitado pelo hábito comum em criar credenciais fracas. Portanto, este projeto consistiu no aprimoramento do processo de autenticação em aplicações _web_ usando o reconhecimento facial como uma segunda camada de segurança pós etapa de identificação(_login_). Para isso, foi desenvolvido um sistema que buscou viabilizar o uso da referida tecnologia através de experimentos submetidos a uma base de dados construída a partir da coleta das imagens faciais dos usuários que usufruíram da aplicação, mapeando a eficiência e a confiabilidade com a validação da operação de verificação facial utilizada no processo completo de autenticação. Por fim, os resultados mostraram que o desempenho adquirido viabiliza a expansão do uso da tecnologia por outros desenvolvedores em seus projetos.

![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/Web-FaceRec.png)
---

## Sumário
Os cabeçalhos de suas seções serão usados para referenciar o local de destino.

- [Descrição](#Descrição)
- [Como Usar](#Uso)
- [Referências](#Referências)
- [Créditos](#Créditos)
- [Informações do Autor](#author-info)

---

## Descrição

Este projeto foi totalmente pensado para disponibilizar para o público uma forma simples e eficiente do uso do reconhecimento facial como autenticador em aplicação _web_. Contudo, para isso, faz-se necessário uma breve discussão das possíveis tecnologias que deverão existir para que o funcionamento seja efetivo. Neste projeto, foi utilizado o serviço cognitivo(_cognitive services_) da  **Microsoft Azure** como uma API dedicada a detectar e verificar a face dos usuários que irão usufruir da aplicação. Para tal, torna-se necessário uma conta no **Microsoft Azure**, mas não se preocupe para esse protótipo a criação da conta bem como o serviço da API utilizado são 100% gratuitos, limitando-se apenas à quantidade disponível no número de requisições por minuto que são 20 por minuto. Portanto, crie uma conta no [Azure](https://azure.microsoft.com/pt-br/) para usar o serviço. **OBS: Não se preocupe, pois mesmo pedindo o seu número de cartão de crédito, para este serviço nenhum valor será cobrado.** 

Após a criação da sua conta entre no _Portal Azure_ na barra de pesquisa e digite **Face API** e crie um serviço de Reconhecimento Facial. É importante definir bem a região onde o serviço utilizado será hospedado. Vale destacar, **para a utilização de 20 chamadas por minuto de forma gratuita é necessário escolher a região _EAST-US_**. O restante como nome e o Grupo de Recurso(_Resource Group_) irão variar conforme o seu gosto. Não se preocupe com detalhes como _TAGs_ entre outras, sempre utilize uma nomenclatura que irá te ajudar a memorizar.

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

Com o final destes processos você estará apto a utilizar a API. Para isso, basta utilizar o seu _ENDPOINT_ e a sua _KEY_ que estará em "_Keys and Endpoints_" na plataforma. É importante manter essa chave em segredo então utilize de forma secreta em sua aplicação. Por exemplo, no seguinte código abaixo nota-se o uso do _Endpoint_ em **API_URL** e da chave em **KEY** passadas por parâmetro pelo _BackEnd_ ao renderizar o _FrontEnd_ da aplicação.

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
Ademais, as outras tecnologias utilizadas ficam a critério do desenvolvedor. No projeto em questão foram utilizadas tecnologias que facilitaram a implementação da aplicação como, por exemplo, a linguagem _JavaScript_ tanto no _FrontEnd_ quanto no _BackEnd_ do projeto. Por norma, tornam-se necessários com exclusividade apenas o **FaceAPI** da **Azure** e a linguagem **JavaScript** no _FrontEnd_ da aplicação para fazer as requisições _REST_  necessárias via **HTTP** da **API**. Outras tecnologias como **Pug**, **Express** e o **MongoDB - Atlas** ficam a critério do desenvolvedor, podendo ser substituídas.
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

Com o ambiente node instalado em sua máquina tornam-se necessários apenas o clone desse repositório em um diretório e o uso do comando **npm install** nele. Com isso, todas as dependências necessárias do projeto contidas no _package.json_ serão instaladas em sua máquina e a tornará apta ao funcionamento da aplicação em ambiente local. Entretanto, como dito anteriormente, as tecnologias poderão ser substituídas, caso a sua opção seja a de manter as tecnologias presentes nesse repositório, é necessário a troca de alguns parâmetros para o funcionamento efetivo da aplicação. Um exemplo é a _string_ de conexão ao banco de dados **mongodb atlas** presente no diretório _"./app/src/config/db.js"_ podemos notar que o **URI** necessita de uma _string_ que vem por parâmetro pelo **.env** do projeto. 

Ademais as outras strings necessárias para o funcionamento da aplicação estão mencionadas no arquivo exemplo(_.env-ex_) em "_app/.env-ex_". Vale destacar que todas _strings_ que serão necessárias para todo o projeto sendo duas delas opcionais como a **PORT** e a **LOCAL_URL** e três obrigatórias como **DB_CONNECTION**, **KEY** e **API_URL**.

![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/env_ex.png)
---

Após a verificação das strings pendentes bem como a conclusão de sua alteração, basta renomear esse arquivo **.env-ex** para **.env**. Com as dependências instaladas anteriormente com o comando **npm install** basta digitar o comando **npm run start** no diretório _/app_ (onde ficará o package.json) para iniciar a aplicação em seu ambiente local. Em seu navegador entre no seu servidor local( **https://localhost/**) e depois coloque o endereço do diretório padrão de execução **+/login/** ou seja,  **https://localhost/login** para utilizar a aplicação.

![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/terminal_ex.png)
---
![Project Image](https://github.com/Samuel1s/WEB-FaceRecognition/blob/main/project-img/tela_login.png)
---

### Installation
1. [node](https://nodejs.org/en/)
2. npm install
3. **Se prefeir utilizar o gerenciador yarn basta fazer as alterações necessárias no script** [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

---

## Referências

"O serviço de Detecção Facial do Azure fornece algoritmos de IA para detectar, reconhecer e analisar rostos humanos em imagens. O software de reconhecimento facial é importante em muitos cenários diferentes, como verificação de identidade, controle de acesso sem toque e desfoque de rosto para maior privacidade." - [FaceAPI](https://docs.microsoft.com/pt-br/azure/cognitive-services/face/overview). Para mais informações há um link para o artigo deste projeto, nele contém maiores explicações das motivações que levaram ao desenvolvimento e a análise dos testes feitos. [Thesis](https://drive.google.com/drive/folders/1wur9Fs2khqkXSBf6mOQttqadIywU3e6u?usp=sharing)

#### API Reference

Toda a documentação da API utilizada encontra-se em [FaceAPI](https://docs.microsoft.com/pt-br/azure/cognitive-services/face/overview). 

[Voltar para cima](#web-facerecognition)

---

## Créditos

CEFET-MG (Centro federal de educação tecnológica de minas gerais)

Este trabalho foi produzido durante o período de formação na faculdade situada em Belo Horizonte conhecida como _Cefet-MG_. O trabalho foi utilizado para obtenção do título de bacharel em _engenharia da computação_. Menções honrosas à todo corpo docente formador e principalmente ao meu orientador, Mateus Felipe Tymburibá Ferreira _mateustymbu@cefetmg.br_ que me deu a oportunidade de ser seu orientando me concedendo todo o arquétipo de linha de pesquisa e proposta de projeto.

Copyright (c) [2022] [Samuel F Santos]


[Voltar para cima](#web-facerecognition)

---

## Informações do Autor

- LinkedIn - [MeuPerfil](https://www.linkedin.com/in/samuel-dos-santos-29863113b/)
- GitHub - [This](https://github.com/Samuel1s)

[Voltar para cima](#web-facerecognition)
