"use client";

import { useChat } from "ai/react";
import { useState, useEffect } from "react";
import { useRouter }  from "next/navigation";

export default function Home() {
  const [base64String, setBase64String] = useState("");
  const [description, setDescription] = useState("");
  const [descString, setDescString] = useState<string | null>(null);
  const [descIsLoading, setDescIsLoading] = useState(false);
  const [audioIsLoading, setAudioIsLoading] = useState(false);
  const [audio, setAudio] = useState(null);
  const {messages, append} = useChat();
  const router = useRouter();

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        if (base64Data) setBase64String(base64Data.toString());
      };
      reader.readAsDataURL(file);
    };
  };

  const generateDescription = async() => {
    setDescIsLoading(true);
    const response = await fetch("http://127.0.0.1:7861/interrogator/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: base64String,
        clip_model_name: "ViT-L-14/openai",
        mode: "fast",
      }),
    });
    const data = await response.json();
    setDescription(data.prompt);
  };

  useEffect(() => {
    if (description && messages.length === 0) {
      append({
        role: "user",
        content: `Following paragraph of the enumeration of phrases is extracted from an image. \
        Convert it into descriptive sentences connecting each phrase smoothly. Paragraph: ${description}`
      });
    }
  }, [description, append]);

  useEffect(() => {
    if (messages.length === 2) {
      setDescString(messages[messages.length - 1].content);
    setDescIsLoading(false);
     }
  }, [messages]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-24">

      {/* Input field */}
      {!base64String && (
        <div className="mb-5 flex flex-col">
          <p className="font-bold"> Upload an image </p>
          <input
            className="mb-5"
            type="file"
            onChange={handleFileInputChange}
          />
        </div>
      )}

      {/* Display image uploaded */}
      {base64String &&  (
        <div className="mb-5">
          <img src={base64String} alt="Uploaded Image" />
        </div>
      )}

      {/* Generate description button */}
      {!descString && (
        <button
          className="bg-blue-500 w-30 p-2 text-white rounded shadow-x1 disabled:bg-blue-500/20"
          onClick={generateDescription}
          disabled={!base64String}
          hidden={descIsLoading}
        >
          Generate Description
        </button>
      )}

      {/* Loading indicator */}
      {descIsLoading && (
        <div className="flex justify-center items-center mt-8">
          <div className="loader flex flex-col items-center">
            <p className="mb-4"> Generating description... </p>
            <div className="animate-pulse">
              <div className="rounded-full bg-slate-700 h-7 w-7"> </div>
            </div>
          </div>
        </div>
      )}

      {/* Display description string */}
      {descString && (
        <div className="place-items-center">
          <p className="font-bold"> Description </p>
          <p className="bg-slate-700 p-3 m-4 rounded-lg text-white"> {descString} </p>
        </div>
      )}

      {/* Display audio */}
      <div className="flex flex-col justify-center mb-2 items-center">
        {!audio && !audioIsLoading && (
          <div className="text-center p-8">
            <button
              className="bg-blue-500 w-30 p-2 text-white rounded shadow-x1 disabled:bg-blue-500/20"
              hidden={!descString}
              onClick={async () => {
                setAudioIsLoading(true);
                const response = await fetch("/api/audio", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    message: descString,
                  })
                });
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudio(audioUrl);
                setAudioIsLoading(false);
              }}
            >
              Read the Text
            </button>
          </div>
        )}
        {audioIsLoading && (
          <div className="flex justify-center items-center mt-8">
            <div className="loader flex flex-col items-center">
              <p className="mb-4"> Audio is being generated... </p>
              <div className="animate-pulse">
                <div className="rounded-full bg-slate-700 h-7 w-7"> </div>
              </div>
            </div>
          </div>
        )}
        {audio && (
         <div className="w-full max-w-4xl px-4">
          <p className="p-3 font-semibold"> Listen to the text: </p>
          <audio
            controls
            src={audio}
            className="w-full h-12 md:h-16"
            style={{minWidth: '400px'}}
          >
          </audio>
         </div>
        )}
      </div>
    </div>
  );
}
