import * as msRest from "@azure/ms-rest-js"
import * as Face from "@azure/cognitiveservices-face"

const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': process.env.KEY} })
const client = new Face.FaceClient(credentials, process.env.ENDPOINT)
const image_base_url = process.env.IMAGE_BASE_URL

const DetectFaceRecognize = async (url) => {
    // Detect faces from image URL. Since only recognizing, use the recognition model 4.
    // We use detection model 3 because we are not retrieving attributes.
    let detected_faces = await client.face.detectWithUrl(url,
        {
            detectionModel: "detection_03",
            recognitionModel: "recognition_04"
        })
    return detected_faces
}

const FindSimilar = async () => {
    console.log("========FIND SIMILAR========")
    const source_image_file_name = "me1.png"
    const target_image_file_names = [
        "me2.png",
        "test3.jpeg",
        "teste1.jpeg",
        "teste2.jpeg",
        "detection1.jpeg",
    ]

    let target_face_ids = (await Promise.all (target_image_file_names.map (async function (target_image_file_name) {
        // Detect faces from target image url.
        var faces = await DetectFaceRecognize(image_base_url + target_image_file_name)
        console.log(faces.length + " face(s) detected from image: " +  target_image_file_name + ".")
        return faces.map (function (face) { 
            console.log(face)
            return face.faceId })
    }))).flat()

    // Detect faces from source image url.
    let detected_faces = await DetectFaceRecognize(image_base_url + source_image_file_name)

    // Find a similar face(s) in the list of IDs. Comapring only the first in list for testing purposes.
    let results = await client.face.findSimilar(detected_faces[0].faceId, { faceIds : target_face_ids })
    console.log(results)
    results.forEach (function (result) {
        console.log("Faces from: " + source_image_file_name + " and ID: " + result.faceId + " are similar with confidence: " + result.confidence + ".")
    })
}

const Find = () => {
    return FindSimilar()
}

export default Find