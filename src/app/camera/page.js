// Runs in the browser (needed for hooks, clicks, and the camera)
"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import styles from '@/app/styles/camera.module.css'
import Capture from '@/assets/camera/take-pic.png'
import Caption from '@/assets/camera/caption.png'
import Text from '@/assets/camera/whitebullets.png'
import StartLoading from '@/components/Start/StartLoading'

const Page = () => {
const router = useRouter();
// Points at the real <video> element so we can plug the camera into it
const videoRef = useRef(null);
const [photo, setPhoto] = useState(null)
const [loading, setLoading] = useState(false)

// Runs once when the page loads: turn the camera on
useEffect(() => {
    //An empty box declared up here so the cleanup function at the bottom can see it later.
    let stream

    // Ask the browser for the camera (shows the browser's permission popup). Video true means camera only, no audio.
    navigator.mediaDevices.getUserMedia({ video: true })
    // Returns a promise "i'll get back to you ticket" because it may take the user a moment to allow
    .then((s)=> {
        // s is the live stream. You save it in stream, then plug it into the video tag with srcObject
        stream = s
        // Plug the live camera feed into the <video> tag
        videoRef.current.srcObject = stream
    })
    // Runs if something goes wrong e.g. the user blocked the camera, or there is no camera
    .catch((err) => console.log('Camera error', err))
// Cleanup: runs when leaving the page, turns the camera (and its light) off
return () => stream?.getTracks().forEach((track) => track.stop())
// [] = only run once, on first load
}, [])

// Runs when the capture button is clicked: take a still picture from the video since you can't save a video directly
const handleCapture = () => {
    const video = videoRef.current
    // An invisible canvas to draw the picture on
    const canvas = document.createElement('canvas')
    // Make the canvas the same size as the camera image
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    // freeze the current frame. Picks up pen for drawing flat "2d" images drawImage(video, 0, 0) copies whatever the video is showing at this exact moment, starting at the top-left corner (0, 0). That’s the snapshot.
    canvas.getContext('2d').drawImage(video, 0, 0)
    // Turn the drawing into a base64 string
    const image = canvas.toDataURL('image/jpeg')
    console.log("Captured", image)
    // Save it, so the page re-renders and shows the preview
    setPhoto(image)
}

// Runs when "Use this photo" is clicked: send the selfie to the AI (same as the upload on /start)
async function sendPhoto(photo) {
    setLoading(true)
    // POST the image to the Phase 2 API and wait for its answer
    const res = await fetch (
                     "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
                     {
                        method: "POST",
                        // Tells the API we're sending JSON
                        headers: { "Content-Type": "application/json" },
                        // The API expects { image: "data:image/jpeg;base64,..." }
                        body: JSON.stringify({ image: photo }),
                     }
                )
                // Stop here if the API returned an error
                if(!res.ok) throw new Error("Request failed");
                // Turn the API's response into an object (race / age / gender scores)
                const data = await res.json()
                console.log('uploaded', data)
                // Save the results so the demographics page can read them
                localStorage.setItem("analysis", JSON.stringify(data))
                // Go to the analysis page
                router.push('/analysis')
}

  return (
    <>
    {loading ? (<StartLoading />) : (<div className={styles['camera__page']}>
     {/* Live camera feed (mirrored in CSS like a selfie) */}
     <video ref={videoRef} autoPlay playsInline muted className={styles['camera__video']}/>
     {/* Still photo sits on top of the live video */}
     {photo && (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="Your photo" className={`${styles['camera__video']} ${styles['camera__preview']}`} />
            <Image src={Caption} alt="Great shot!"  className={styles['caption']} />
        </>
     )}
     {/* Photo taken → show Retake / Use this photo. No photo yet → show the capture button */}
     {photo ? (
        <div className={styles['button__options']}>
            {/* Clearing the photo shows the live camera again */}
            <button onClick={() => setPhoto(null)} className={styles['button__retake']}>Retake</button>
            <button onClick={() => sendPhoto(photo)} className={styles['button__use']}>Use this photo</button>
        </div>
     ) : (
        <button className={styles['capture__button']} onClick={handleCapture}>
            <Image src={Capture} alt="Take picture"/>
        </button>
     )}
    {/* Tips at the bottom; the --none class hides them once a photo is taken */}
    <div className={`${styles['instructions__wrapper']} ${photo ? styles['instructions__wrapper--none'] : ''}`}>
        <Image src={Text} alt="For best results" />
    </div>
    </div>)}
    </>
  )
}

export default Page
