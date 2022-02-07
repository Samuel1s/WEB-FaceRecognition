
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const endpoint = process.env.ENDPOINT 
const image_base_url = process.env.IMAGE_BASE_URL 

const FaceApi = () => {
    const [data, setData] = useState([])

    const detectExtractFace = async () => {
        try {
            const { responseData } = await axios({
                method: 'post',
                url: endpoint + 'face/v1.0/detect',
                params :
                {
                    detectionModel: "detection_01",
                    returnFaceId: true,
                    returnFaceAttributes: "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
                },
                data: { url: image_base_url + 'me1.png' },
                headers: { 'Ocp-Apim-Subscription-Key': process.env.KEY }
            })
            setData(responseData)
        } catch (error) {
            console.error(error)
        }
    }

    const findSimilarFace = async () => {
        try {
            const call = await axios({
                method: 'post',
                url: endpoint + 'face/v1.0/findsimilars',
                params : 
                {  
                    "faceId": data.faceId,
                    "faceIds": "me2.png, test3.jpeg, teste1.jpeg, teste2.jpeg, detection1.jpeg",
                    "largeFaceListId": "sample_list",
                    "maxNumOfCandidatesReturned": 10,
                    "mode": "matchPerson"
                },
                data: { url: image_base_url + 'me1.png' },
                headers: { 'Ocp-Apim-Subscription-Key': process.env.KEY }
            })

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        detectExtractFace()
    },[])
}

export default FaceApi