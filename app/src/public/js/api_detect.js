// Cognitive Services variables.
const API_URL = "https://rf2serverapi.cognitiveservices.azure.com/face/v1.0/"
const KEY = "ce043ddf151e40abb10c4e4e8f6dd770"

// Control variables.
const ulEl = document.querySelector('ul')

const processImage = async (sourceImage) => {    
    var param = {
        "detectionModel": "detection_01",
        "returnFaceId": "true",
        "returnAge": "true",
        "returnFaceAttributes": "age, emotion, gender, smile", 
        "recognitionModel": "recognition_01"
    }
    try {
        const { data } = await axios({
            method: 'POST',
            url: API_URL + "detect", 
            headers: { "Content-Type": "application/octet-stream", "Ocp-Apim-Subscription-Key": KEY },
            params: param,
            data: sourceImage,
        })

        if (data.length == 1) {
            setFaceAttribute(data[0])
        }
    } catch (error) {
        console.error(error)
    }
}

const setFaceAttribute = (data) => {
    ulEl.innerHTML = ''
    ulEl.innerHTML += `<li>Idade: ${data.faceAttributes.age}</li>`
    ulEl.innerHTML += `<li>Sexo: ${data.faceAttributes.gender}</li>`
    ulEl.innerHTML += `<li>Sorriso: ${data.faceAttributes.smile}</li>`
    ulEl.innerHTML += `<li>Bravo: ${data.faceAttributes.emotion.anger}</li>`
    ulEl.innerHTML += `<li>Feliz: ${data.faceAttributes.emotion.happiness}</li>`
    ulEl.innerHTML += `<li>Neutro: ${data.faceAttributes.emotion.neutral}</li>`
}
