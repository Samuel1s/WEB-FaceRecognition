import { getFrame, makeBlobFromFrame } from './general_functions.js'

// Control variables.
const setAttEl = document.querySelector('ul')
const video = document.querySelector('#video')

// General Variables.
let currentFrame

// Detect face attribute from Blob archive.
const detectFaceAttributes = (function() {
    let template = ''

    function setFaceAttribute(data) {
        template = `
            <li>Idade(Apx): ${data.faceAttributes.age}</li>
            <li>Sexo: ${data.faceAttributes.gender}</li>
            <li>Sorriso: ${data.faceAttributes.smile}</li>
            <li>Bravo: ${data.faceAttributes.emotion.anger}</li>
            <li>Feliz: ${data.faceAttributes.emotion.happiness}</li>
            <li>Triste: ${data.faceAttributes.emotion.sadness}</li>
            <li>Neutro: ${data.faceAttributes.emotion.neutral}</li>
            <li>Surpreso: ${data.faceAttributes.emotion.surprise}</li>
        `
        setAttEl.innerHTML = template
    }

    return {
        processFaceAttribute: async function(blob) {    
            const param = {
                'detectionModel': 'detection_01',
                'recognitionModel': 'recognition_04',
                'returnFaceAttributes': 'age, gender, smile, emotion'
            }
            try {
                const { data } = await axios({
                    method: 'POST',
                    url: API_URL + 'detect', 
                    headers: { 'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': KEY },
                    params: param,
                    data: blob,
                })
    
                if (data.length == 1) {
                    setFaceAttribute(data[0])
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
})()

// Start camera with navigator js and get frame by frame to build a user face image.
void async function startCamera() {
    if (!'mediaDevices' in navigator || 
        !'getUserMedia' in navigator.mediaDevices
    ){
        alert('O Browser nao pode abrir a camera')
        return
    } 

    // General variables.
    const constraints = {
        video: {
            width: {
                min: 1280,
                ideal: 1920,
                max: 2560
            },
            height: {
                min: 720,
                ideal: 1080,
                max: 1440
            },
            facingMode: 'user'
        }
    }

    try {
        let videoStream = await navigator.mediaDevices.getUserMedia(constraints)
        video.srcObject = videoStream

    } catch (err) {
        alert('Sem acesso a camera')
    }

    const callDetectFaceAPI = () => {
        detectFaceAttributes.processFaceAttribute(makeBlobFromFrame(currentFrame))
    }

    setInterval(() => {
        currentFrame = getFrame()
        getCurrentImage(currentFrame)
    }, 500)

    setTimeout(() => {
        callDetectFaceAPI()
    }, 1000)

    setInterval(() => {
        callDetectFaceAPI()
    }, 4000)

}().catch(err => {
    console.log('Error:' + err)
})