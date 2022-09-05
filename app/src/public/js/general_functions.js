// Control variables.
const video = document.querySelector('#video')
const canvas = document.querySelector('#canvas')

// To get current frame from video in progress.
export const getFrame = function() {
    const { videoWidth, videoHeight } = video

    const img = document.createElement('img')
    canvas.width = videoWidth
    canvas.height = videoHeight
    canvas.getContext('2d').drawImage(video, 0 ,0)
    img.src = canvas.toDataURL('image/jpeg')

    return img.src
}

// To transform frame in Blob type archive, necessary to use face API.
export const makeBlobFromFrame = (blobData) => {
    const BASE64_MAKER = ';base64,'
    const parts = blobData.split(BASE64_MAKER)
    const contentType = parts[0].split(':')[1]
    const raw = window.atob(parts[1])
    const rawLength = raw.length
    const uInt8Array = new Uint8Array(rawLength)

    for (let i=0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
    }
    return new Blob([uInt8Array], { type: contentType })
}
