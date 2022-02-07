import * as msRest from "@azure/ms-rest-js"
import * as Face from "@azure/cognitiveservices-face"

const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': process.env.KEY} })
const client = new Face.FaceClient(credentials, process.env.ENDPOINT)
const image_base_url = process.env.IMAGE_BASE_URL

const DetectFaceExtract = async () => {
    console.log("========DETECT FACES========")
    console.log()

    // Create a list of images
    const image_file_names = [
        "me2.png"
    ]

    // NOTE await does not work properly in for, forEach, and while loops. Use Array.map and Promise.all instead.
    await Promise.all (image_file_names.map (async function (image_file_name) {
        let detected_faces = await client.face.detectWithUrl(image_base_url + image_file_name,
            {
                returnFaceAttributes: ["Accessories","Age","Blur","Emotion","Exposure","FacialHair","Gender","Glasses","Hair","HeadPose","Makeup","Noise","Occlusion","Smile"],
                // We specify detection model 1 because we are retrieving attributes.
                detectionModel: "detection_01"
            })
        console.log (detected_faces.length + " face(s) detected from image " + image_file_name + ".")
        console.log("Face attributes for face(s) in " + image_file_name + ":")

        // Parse and print all attributes of each detected face.
        detected_faces.forEach (async function (face) {
            // Get the bounding box of the face
            console.log("Bounding box:\n  Left: " + face.faceRectangle.left + "\n  Top: " + face.faceRectangle.top + "\n  Width: " + face.faceRectangle.width + "\n  Height: " + face.faceRectangle.height)

            // Get the accessories of the face
            let accessories = face.faceAttributes.accessories.join()
            if (0 === accessories.length) {
                console.log ("No accessories detected.")
            }
            else {
                console.log ("Accessories: " + accessories)
            }

            // Get face other attributes
            console.log("Age: " + face.faceAttributes.age)
            console.log("Blur: " + face.faceAttributes.blur.blurLevel)

            // Get emotion on the face
            let emotions = ""
            let emotion_threshold = 0.0
            if (face.faceAttributes.emotion.anger > emotion_threshold) { emotions += "anger, " }
            if (face.faceAttributes.emotion.contempt > emotion_threshold) { emotions += "contempt, " }
            if (face.faceAttributes.emotion.disgust > emotion_threshold) { emotions +=  "disgust, " }
            if (face.faceAttributes.emotion.fear > emotion_threshold) { emotions +=  "fear, " }
            if (face.faceAttributes.emotion.happiness > emotion_threshold) { emotions +=  "happiness, " }
            if (face.faceAttributes.emotion.neutral > emotion_threshold) { emotions +=  "neutral, " }
            if (face.faceAttributes.emotion.sadness > emotion_threshold) { emotions +=  "sadness, " }
            if (face.faceAttributes.emotion.surprise > emotion_threshold) { emotions +=  "surprise, " }
            if (emotions.length > 0) {
                console.log ("Emotions: " + emotions.slice (0, -2))
            }
            else {
                console.log ("No emotions detected.")
            }
            
            // Get more face attributes
            console.log("Exposure: " + face.faceAttributes.exposure.exposureLevel)
            if (face.faceAttributes.facialHair.moustache + face.faceAttributes.facialHair.beard + face.faceAttributes.facialHair.sideburns > 0) {
                console.log("FacialHair: Yes")
            }
            else {
                console.log("FacialHair: No")
            }
            console.log("Gender: " + face.faceAttributes.gender)
            console.log("Glasses: " + face.faceAttributes.glasses)

            // Get hair color
            var color = ""
            if (face.faceAttributes.hair.hairColor.length === 0) {
                if (face.faceAttributes.hair.invisible) { color = "Invisible" } else { color = "Bald" }
            }
            else {
                color = "Unknown"
                var highest_confidence = 0.0
                face.faceAttributes.hair.hairColor.forEach (function (hair_color) {
                    if (hair_color.confidence > highest_confidence) {
                        highest_confidence = hair_color.confidence
                        color = hair_color.color
                    }
                })
            }
            console.log("Hair: " + color)

            // Get more attributes
            console.log("Head pose:")
            console.log("  Pitch: " + face.faceAttributes.headPose.pitch)
            console.log("  Roll: " + face.faceAttributes.headPose.roll)
            console.log("  Yaw: " + face.faceAttributes.headPose.yaw)
 
            console.log("Makeup: " + ((face.faceAttributes.makeup.eyeMakeup || face.faceAttributes.makeup.lipMakeup) ? "Yes" : "No"))
            console.log("Noise: " + face.faceAttributes.noise.noiseLevel)

            console.log("Occlusion:")
            console.log("  Eye occluded: " + (face.faceAttributes.occlusion.eyeOccluded ? "Yes" : "No"))
            console.log("  Forehead occluded: " + (face.faceAttributes.occlusion.foreheadOccluded ? "Yes" : "No"))
            console.log("  Mouth occluded: " + (face.faceAttributes.occlusion.mouthOccluded ? "Yes" : "No"))

            console.log("Smile: " + face.faceAttributes.smile)
            console.log()
        })
    }))
}

const Extract = () => {
    return DetectFaceExtract()
}

export default Extract