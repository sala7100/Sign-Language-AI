import { useState, useEffect, useRef } from 'react';
import { Camera, Video, VideoOff, AlertCircle, Info, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export function CameraRecognition() {

  const [isActive, setIsActive] = useState(false);
  const [detectedSign, setDetectedSign] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number>(0);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const soundEnabledRef = useRef(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<any>(null);

  const lastSpokenRef = useRef<string | null>(null);

  // 🔊 نطق الحرف
  const speakLetter = (letter: string) => {

    if (!soundEnabledRef.current) return;

    if (lastSpokenRef.current === letter) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(letter);
    speech.lang = "en-US";
    speech.rate = 0.9;

    speech.onstart = () => {
      if (!soundEnabledRef.current) {
        window.speechSynthesis.cancel();
      }
    };

    window.speechSynthesis.speak(speech);

    lastSpokenRef.current = letter;

  };

  // 🔇 كتم الصوت
  const toggleSound = () => {

    if (soundEnabledRef.current) {

      // كتم كامل
      soundEnabledRef.current = false;
      window.speechSynthesis.cancel();
      setIsSoundOn(false);

    } else {

      soundEnabledRef.current = true;
      setIsSoundOn(true);

    }

    lastSpokenRef.current = null;

  };

  useEffect(() => {

    const startCamera = async () => {

      if (isActive) {

        try {

          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" }
          });

          streamRef.current = stream;

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          setHasPermission(true);
          setErrorMessage('');

          intervalRef.current = setInterval(() => {
            sendFrameToAI();
          }, 1000);

        } catch (error: any) {

          setHasPermission(false);
          setIsActive(false);

          if (error.name === 'NotAllowedError') {
            setErrorMessage('Camera access denied. Please allow camera permission.');
          } else if (error.name === 'NotFoundError') {
            setErrorMessage('No camera found.');
          } else if (error.name === 'NotReadableError') {
            setErrorMessage('Camera already in use.');
          } else {
            setErrorMessage('Unable to access camera.');
          }

        }

      }

    };

    startCamera();

    return () => {

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      window.speechSynthesis.cancel();

    };

  }, [isActive]);



  const sendFrameToAI = async () => {

    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {

      if (!blob) return;

      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {

        const res = await fetch("http://localhost:3000/ai/predict", {
          method: "POST",
          body: formData
        });

        const data = await res.json();

        if (data.prediction) {

          setDetectedSign(data.prediction);
          setConfidence(95);

          speakLetter(data.prediction);

        }

      } catch (err) {

        console.log("AI connection error", err);

      }

    }, "image/jpeg");

  };



  const toggleCamera = () => {

    if (isActive) {

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      window.speechSynthesis.cancel();

      setIsActive(false);
      setDetectedSign(null);
      setConfidence(0);
      setHasPermission(null);
      setErrorMessage('');
      lastSpokenRef.current = null;

    } else {

      setIsActive(true);

    }

  };



  return (
    <div className="space-y-4">

      <Card className="p-6">

        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">

          {isActive ? (

            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              <canvas ref={canvasRef} style={{ display: "none" }} />

            </>

          ) : (

            <div className="w-full h-full flex flex-col items-center justify-center text-white">
              <Camera className="size-16 mb-4 opacity-50" />
              <p className="text-lg opacity-75">Camera is off</p>
              <p className="text-sm opacity-50 mt-2">Click Start Camera</p>
            </div>

          )}

        </div>


        <div className="mt-4 flex items-center justify-between">

          <div className="flex gap-2">

            <Button onClick={toggleCamera} className="gap-2">

              {isActive ? (
                <>
                  <VideoOff className="size-4" />
                  Stop Camera
                </>
              ) : (
                <>
                  <Video className="size-4" />
                  Start Camera
                </>
              )}

            </Button>

            <Button
              variant="outline"
              onClick={toggleSound}
            >
              {isSoundOn ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            </Button>

          </div>


          <AnimatePresence mode="wait">

            {detectedSign && (

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >

                <div className="text-right">

                  <div className="text-sm text-gray-600">
                    Detected Sign
                  </div>

                  <div className="text-2xl font-bold text-green-600">
                    {detectedSign}
                  </div>

                </div>

                <Badge variant="secondary" className="text-sm">
                  {confidence}% confident
                </Badge>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </Card>

    </div>
  );

}