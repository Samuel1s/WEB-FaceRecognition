// Open Camera and set functions near real time.
const faceAuth = async (current_blob, database_blob) => {
    // Azure API's - To Find.
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

    const findSimilarFace = async(faceId, faceIds) => {    
        try {
            const { data } = await axios({
                method: 'POST',
                url: API_URL + "findsimilars",
                headers: { "Content-Type": "application/json", "Ocp-Apim-Subscription-Key": KEY },
                params: "",
                data: {
                    "faceId": faceId,
                    "faceIds": [faceIds],
                    "maxNumOfCandidatesReturned": 1,
                    "mode": "matchPerson"
                },
            })
            if (data.length == 1) {
                return data[0]
            }
        } catch (error) {
            console.log(error.status, error.message)
        }
    }  

    // General Variables.
    let current_image_face_id = '' 
    let database_image_face_id = ''
    let user_data = {}

    const allPromises = Promise.all([
        current_image_face_id = await processImage(current_blob),
        database_image_face_id = await processImage(database_blob),
        user_data = await findSimilarFace(current_image_face_id, database_image_face_id),
    ])

    try {
        const response = await allPromises

        const { data } = await axios({
            method: 'POST',
            url: LOCAL_URL + 'login', 
            headers: {'Content-Type': 'application/json' }, 
            data: response[2],
        })
        if(data.redirect) {
            window.location = `${data.redirect}`
        }

    } catch (error) {
        console.log(error.message)
    }
}

// Camera start with navigator js.
void function() {
    if (!'mediaDevices' in navigator || 
        !'getUserMedia' in navigator.mediaDevices
    ){
        alert('O Browser nao pode abrir a camera')
        return
    } 

    // Control variables.
    const video = document.querySelector('#video')
    const canvas = document.querySelector('#canvas')

    // General variables.
    let videoStream
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
            }
        }
    }

    const makeBlob = (dataURL) => {
        const BASE64_MAKER = ';base64,'
        const parts = dataURL.split(BASE64_MAKER)
        const contentType = parts[0].split(':')[1]
        const raw = window.atob(parts[1])
        const rawLength = raw.length
        const uInt8Array = new Uint8Array(rawLength)
    
        for (let i=0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i)
        }
        return new Blob([uInt8Array], { type: contentType })
    }     

    const processFace = () => {
        const { videoWidth, videoHeight } = video

        const img = document.createElement('img')
        canvas.width = videoWidth
        canvas.height = videoHeight
        canvas.getContext('2d').drawImage(video, 0 ,0)
        img.src = canvas.toDataURL('image/jpg')
        let current_blob = makeBlob(img.src)
        let database_blob = makeBlob(image64)
        faceAuth(current_blob, database_blob) // Send current face 
    }

    const initializeCamera = async() => {
        constraints.video.facingMode = 'user'
       
        try {
            videoStream = await navigator.mediaDevices.getUserMedia(constraints)
            video.srcObject = videoStream
        } catch (err) {
            alert('Sem acesso a camera')
        }
    }

    initializeCamera()    

    setTimeout(function(){
        processFace()
    }, 2000)

    setInterval(function() {
        processFace()
    }, 8000)
}()