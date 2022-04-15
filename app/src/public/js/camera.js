void function() {
    if (!"mediaDevices" in navigator || 
        !"getUserMedia" in navigator.mediaDevices
    ){
        alert("O Browser nao pode abrir a camera")
        return
    } 

    // Control variables.
    const video = document.querySelector("#video")
    const canvas = document.querySelector("#canvas")

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
        const BASE64_MAKER = ";base64,"
        const parts = dataURL.split(BASE64_MAKER)
        const contentType = parts[0].split(":")[1]
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

        const img = document.createElement("img")
        canvas.width = videoWidth
        canvas.height = videoHeight
        canvas.getContext("2d").drawImage(video, 0 ,0)
        img.src = canvas.toDataURL("image/jpg")
        getImageAtNow(img.src) // Current Face Image(Base64) getted every time.
        var blob = makeBlob(img.src) // Convert Image(Base64) to Blob type.
        processImage(blob)
    }

    const initializeCamera = async() => {
        constraints.video.facingMode = "user"
       
        try {
            videoStream = await navigator.mediaDevices.getUserMedia(constraints)
            video.srcObject = videoStream
        } catch (err) {
            alert("Sem acesso a camera")
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