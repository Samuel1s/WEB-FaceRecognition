// Control variables.
const setAttEl = document.querySelector('ul')

const detectFaceAttributes = async (blob) => {
    const processImage = async (sourceImage) => {    
        var param = {
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
        setAttEl.innerHTML += `<li>Idade(Apx): ${data.faceAttributes.age}</li>`
        setAttEl.innerHTML += `<li>Sexo: ${data.faceAttributes.gender}</li>`
        setAttEl.innerHTML += `<li>Sorriso: ${data.faceAttributes.smile}</li>`
        setAttEl.innerHTML += `<li>Bravo: ${data.faceAttributes.emotion.anger}</li>`
        setAttEl.innerHTML += `<li>Feliz: ${data.faceAttributes.emotion.happiness}</li>`
        setAttEl.innerHTML += `<li>Triste: ${data.faceAttributes.emotion.sadness}</li>`
        setAttEl.innerHTML += `<li>Neutro: ${data.faceAttributes.emotion.neutral}</li>`
        setAttEl.innerHTML += `<li>Surpreso: ${data.faceAttributes.emotion.surprise}</li>`

    }

    // Start Azure REST API.
    processImage(blob)
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
        img.src = canvas.toDataURL('image/jpeg')
        getCurrentImage(img.src) // Current Face Image(Base64) getted every time.
        let blob = makeBlob(img.src) // Convert Image(Base64) to Blob type.
        detectFaceAttributes(blob)
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
    }, 5000)
}()