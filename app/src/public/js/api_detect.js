// Cognitive Services variables.
const API_URL = "https://rf2serverapi.cognitiveservices.azure.com/face/v1.0/"
const KEY = "ce043ddf151e40abb10c4e4e8f6dd770"

// Control variables.
const setAttEl = document.querySelector('ul')

const processImage = async (sourceImage) => {    
    var param = {
        "detectionModel": "detection_01",
        "returnFaceId": "true",
        "returnAge": "true",
        "returnFaceRectangle": "true",
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
    setAttEl.innerHTML = ''
    setAttEl.innerHTML += `<li>Idade: ${data.faceAttributes.age}</li>`
    setAttEl.innerHTML += `<li>Sexo: ${data.faceAttributes.gender}</li>`
    setAttEl.innerHTML += `<li>Sorriso: ${data.faceAttributes.smile}</li>`
    setAttEl.innerHTML += `<li>Bravo: ${data.faceAttributes.emotion.anger}</li>`
    setAttEl.innerHTML += `<li>Feliz: ${data.faceAttributes.emotion.happiness}</li>`
    setAttEl.innerHTML += `<li>Neutro: ${data.faceAttributes.emotion.neutral}</li>`
}
