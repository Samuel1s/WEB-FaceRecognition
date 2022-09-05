import { getFrame, makeBlobFromFrame } from './general_functions.js'

// Control variables.
const video = document.querySelector('#video')

// General Variables.
let currentFrame
let currentBlobFromFrame
let blobFromDatabaseFrame 

// Detect face attribute from Blob archive.
const verifyFaceAndAuth = (function() {
    async function detectFaceAndReturnId(blob) {
        const param = { 'detectionModel': 'detection_01', 'recognitionModel': 'recognition_04'}
        try {
            const { data } = await axios({
                method: 'POST',
                url: API_URL + 'detect', 
                headers: { 'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': KEY },
                params: param,
                data: blob,
            })

            if (data.length == 1) {
                return data[0].faceId
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function faceVerify(currentFaceId, databaseFaceId) {    
        try {
            const { data } = await axios({
                method: 'POST',
                url: API_URL + 'verify',
                headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': KEY },
                params: '',
                data: {'faceId1': currentFaceId, 'faceId2': databaseFaceId },
            })
            if (data) {
                return data
            }
        } catch (error) {
            console.log(error.status, error.message)
        }
    }  
    
    return {
        authenticate: async function() {
            let currentFrameId
            let databaseFrameId

            const response = await Promise.all
            ([
                currentFrameId = await detectFaceAndReturnId(currentBlobFromFrame),
                databaseFrameId = await detectFaceAndReturnId(blobFromDatabaseFrame),
                faceVerify(currentFrameId, databaseFrameId),
            ])

            try {
                const { data } = await axios({
                    method: 'POST',
                    url: LOCAL_URL, 
                    headers: {'Content-Type': 'application/json' }, 
                    data: response[2],
                })
                
                if(data.redirect) {
                    window.location = `${data.redirect}`
        
                } else if (data.log_error_msg) {
                    document.querySelector('#error_alert').innerText = `${data.log_error_msg}`
                }

            } catch (err) {
                console.log(err.message)
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

    const callVerifyFaceAPI = () => {
        currentBlobFromFrame = makeBlobFromFrame(currentFrame)
        blobFromDatabaseFrame = makeBlobFromFrame(IMAGE_FROM_DB)
        verifyFaceAndAuth.authenticate() 
    }  

    setInterval(() => {
        currentFrame = getFrame()
    }, 500)

    setTimeout(() => {
        callVerifyFaceAPI()
    }, 1000)

    setInterval(() => {
        callVerifyFaceAPI()
    }, 4000)

}().catch(err => {
    console.log('Error:' + err)
})