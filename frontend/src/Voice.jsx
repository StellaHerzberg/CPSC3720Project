import { useState } from "react";

export default function VoiceTest({onTranscribe}) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("Click 'Start Listening' to use voice text to search events in the text box above!");

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    //short required beep noise
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
 

    setListening(true);
    setStatus("Listening...");
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.trim();
      setTranscript(text);
      setStatus("Done");
      setListening(false);

      if (typeof onTranscribe === "function") onTranscribe(text)
    };

    

    recognition.onerror = (e) => {
      setStatus("Error: " + e.error);
      setListening(false);
    };
  };

  return (
    <div style={{ textAlign: "center", padding: "10px" }}>
      <button
        onClick={startListening}
        disabled={listening}
        style={{
          padding: "12px 24px",
          fontSize: "2rem",
          background: listening ? "#4b4b4bff" : "#efbbfdff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: listening ? "not-allowed" : "pointer",
        }}
      >
        {listening ? "Listening..." : "Start Listening"}
      </button>

      {/* <div style={{ marginTop: "20px", fontSize: "22px", fontStyle: "Verdana" }}>
        {transcript ? `You said: "${transcript}"` : null }
      </div> */}

      <p style={{ color: "gray", fontSize: "2rem" }}>{status}</p>
    </div>
  );
}
