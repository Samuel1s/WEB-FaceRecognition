import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from './Button'
import Find from './modules/Find'
import Extract from './modules/Extract'
import FaceApi from './modules/api'

const App = () => {
    const endpoint = process.env.ENDPOINT 
    const image_base_url = process.env.IMAGE_BASE_URL 

    const [data, setData] = useState([])

    const detectExtractFace = async () => {
        try {
            const response  = await axios({
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
            setData(response.data[0].faceId)
        } catch (error) {
            console.error(error)
        }
    }

    const findSimilarFace = async () => {
        try {
            await axios({
                method: 'post',
                url: endpoint + 'face/v1.0/findsimilars',
                params : 
                {  
                    "faceId": data,
                    "largeFaceListId": "sample_list",
                    "maxNumOfCandidatesReturned": 1,
                    "mode": "matchPerson"
                },
                headers: { 'Ocp-Apim-Subscription-Key': process.env.KEY }
            })

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        detectExtractFace()
    },[])
    
    return (
        <div>
            <Button onClick={() => findSimilarFace()} name={'Press ME'}></Button>
        </div>
    )
}

export default App