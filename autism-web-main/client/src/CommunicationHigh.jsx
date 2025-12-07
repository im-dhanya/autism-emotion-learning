import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import english1 from "./images/high-english1.avif";
import english2 from "./images/high-english2.avif";
import emotion1 from "./images/high-emotion1.avif";
import emotion2 from "./images/high-emotion2.jpg";

function CommunicationHighModule() {
  const getUserToken = localStorage.getItem("token");
  const getUserData = JSON.parse(localStorage.getItem("userData"));
  const autism_level = localStorage.getItem("autism-level");

  const datas = [
    { video1: "BeWWyjZqRyE" },
    { video2: "RiYzD1h-YVQ" },
    { video3: "jetoWelJJJk" },
    { video4: "MeNY-RxDJig" },
  ];

  const [video, setVideo] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [activeSection, setActiveSection] = useState("english");

  const handleWatch = (number) => {
    if (number === 1) {
      setVideo(datas[0]?.video1);
      setIsVisible(true);
    }
    if (number === 2) {
      setVideo(datas[1]?.video2);
      setIsVisible(true);
    }
    if (number === 3) {
      setVideo(datas[2]?.video3);
      setIsVisible(true);
    }
    if (number === 4) {
      setVideo(datas[3]?.video4);
      setIsVisible(true);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = true;
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onresult = (e) => {
        const current = e.resultIndex;
        const transcript = e.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.error("Speech Recognition not supported");
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <>
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <h1 className="title">
              <span className="title-icon">🌟</span> 
              Communication Adventures
              <span className="title-icon">🌟</span>
            </h1>
            <p className="subtitle">Learning made fun for everyone!</p>
          </div>
          
          <nav className="nav">
            <ul>
              {!getUserToken ? <li><Link to={"/"}>Register</Link></li> : null}
              {getUserToken ? <li><Link to={"/dashboard"}>Dashboard</Link></li> : null}
              {getUserToken && getUserData.name === "parent" ? <li><Link to={"/survey"}>Survey</Link></li> : null}
              {getUserToken ? <li><Link to={"/study/module"}>Study Module</Link></li> : null}
              {getUserToken && autism_level <= 60 ? <li><Link to={"/communication/low/module"}>Communication Low</Link></li> : null}
              {getUserToken && autism_level > 60 ? <li><Link to={"/communication/high/module"}>Communication High</Link></li> : null}
              {getUserToken ? <li><Link to={"/test/module"}>Test Module</Link></li> : null}
            </ul>
          </nav>
        </header>

        {!isVisible ? (
          <main className="content">
            <div className="section-tabs">
              <button 
                className={`tab-button ${activeSection === "english" ? "active" : ""}`}
                onClick={() => setActiveSection("english")}
              >
                <span className="tab-icon">📚</span> Learn English
              </button>
              <button 
                className={`tab-button ${activeSection === "speech" ? "active" : ""}`}
                onClick={() => setActiveSection("speech")}
              >
                <span className="tab-icon">🎤</span> Speech Magic
              </button>
              <button 
                className={`tab-button ${activeSection === "emotions" ? "active" : ""}`}
                onClick={() => setActiveSection("emotions")}
              >
                <span className="tab-icon">😊</span> Emotions
              </button>
            </div>

            {activeSection === "english" && (
              <section className="module-section english-section">
                <div className="section-header">
                  <h2 className="section-title">Learn English</h2>
                  <p className="section-subtitle">Fun videos to help you improve your English skills!</p>
                </div>
                
                <div className="video-container">
                  <div className="video-card">
                    <div className="video-card-inner">
                      <div className="video-image-container">
                        <img src={english1} alt="English lesson video" className="video-image" />
                        <div className="video-overlay">
                          <span className="video-play-icon">▶️</span>
                        </div>
                      </div>
                      <div className="video-info">
                        <h3>Basic English Conversation</h3>
                        <p>Learn everyday conversations in English!</p>
                        <button className="watch-btn" onClick={() => handleWatch(1)}>
                          Watch Video
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="video-card">
                    <div className="video-card-inner">
                      <div className="video-image-container">
                        <img src={english2} alt="English vocabulary video" className="video-image" />
                        <div className="video-overlay">
                          <span className="video-play-icon">▶️</span>
                        </div>
                      </div>
                      <div className="video-info">
                        <h3>Fun Vocabulary Games</h3>
                        <p>Learn new words through fun activities!</p>
                        <button className="watch-btn" onClick={() => handleWatch(2)}>
                          Watch Video
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "speech" && (
              <section className="module-section speech-section">
                <div className="section-header">
                  <h2 className="section-title">Speech Magic</h2>
                  <p className="section-subtitle">Watch your words appear like magic!</p>
                </div>
                
                <div className="speech-container">
                  <div className="speech-box">
                    <div className="microphone-animation">
                      {isListening ? (
                        <div className="listening-waves">
                          <div className="wave wave1"></div>
                          <div className="wave wave2"></div>
                          <div className="wave wave3"></div>
                        </div>
                      ) : (
                        <span className="mic-icon">🎤</span>
                      )}
                    </div>
                    
                    <button
                      className={`speech-btn ${isListening ? "listening" : ""}`}
                      onClick={isListening ? stopListening : startListening}
                    >
                      {isListening ? "I'm Listening..." : "Talk to Me!"}
                    </button>
                    
                    <div className="transcript-box">
                      <h3 className="transcript-title">Your Words:</h3>
                      <p className="transcript">
                        {transcript ? transcript : "Say something, and I'll write it down!"}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {activeSection === "emotions" && (
              <section className="module-section emotions-section">
                <div className="section-header">
                  <h2 className="section-title">Understanding Emotions</h2>
                  <p className="section-subtitle">Learn about different feelings and expressions!</p>
                </div>
                
                <div className="video-container">
                  <div className="video-card">
                    <div className="video-card-inner">
                      <div className="video-image-container">
                        <img src={emotion1} alt="Emotions video" className="video-image" />
                        <div className="video-overlay">
                          <span className="video-play-icon">▶️</span>
                        </div>
                      </div>
                      <div className="video-info">
                        <h3>Happy and Sad</h3>
                        <p>Learn to recognize basic emotions!</p>
                        <button className="watch-btn" onClick={() => handleWatch(3)}>
                          Watch Video
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="video-card">
                    <div className="video-card-inner">
                      <div className="video-image-container">
                        <img src={emotion2} alt="Complex emotions video" className="video-image" />
                        <div className="video-overlay">
                          <span className="video-play-icon">▶️</span>
                        </div>
                      </div>
                      <div className="video-info">
                        <h3>More Feelings</h3>
                        <p>Discover complex emotions and expressions!</p>
                        <button className="watch-btn" onClick={() => handleWatch(4)}>
                          Watch Video
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        ) : (
          <div className="video-player">
            <div className="video-player-container">
              <button className="close-btn" onClick={handleClose}>
                <IoMdClose />
              </button>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        <footer className="footer">
          <p>Made with ❤️ for special learners</p>
        </footer>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700&display=swap');
          
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          body {
            font-family: 'Baloo 2', cursive;
            background-color: #f9f7fe;
            margin: 0;
            padding: 0;
            color: #333;
          }
          
          .app-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          
          /* Header Styles */
          .header {
            background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
            color: white;
            padding: 20px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          
          .header-content {
            margin-bottom: 20px;
          }
          
          .title {
            font-size: 2.5rem;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          
          .title-icon {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1.2rem;
            margin-top: 5px;
            opacity: 0.9;
          }
          
          .nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .nav ul li a {
            color: white;
            text-decoration: none;
            font-size: 1.1rem;
            background-color: rgba(255, 255, 255, 0.2);
            padding: 8px 15px;
            border-radius: 50px;
            transition: all 0.3s ease;
            display: inline-block;
          }
          
          .nav ul li a:hover {
            background-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          
          /* Content Styles */
          .content {
            flex: 1;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
          }
          
          /* Section Tabs */
          .section-tabs {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }
          
          .tab-button {
            background-color: white;
            border: none;
            border-radius: 50px;
            padding: 12px 25px;
            font-size: 1.2rem;
            font-family: 'Baloo 2', cursive;
            color: #555;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .tab-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          }
          
          .tab-button.active {
            background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
            color: white;
            font-weight: 600;
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          }
          
          .tab-icon {
            font-size: 1.5rem;
          }
          
          /* Section Styles */
          .module-section {
            background-color: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
            margin-bottom: 30px;
            animation: fadeIn 0.5s ease;
          }
          
          .section-header {
            text-align: center;
            margin-bottom: 30px;
          }
          
          .section-title {
            font-size: 2rem;
            margin-bottom: 10px;
            position: relative;
            display: inline-block;
          }
          
          .section-title:after {
            content: "";
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(to right, #84fab0, #8fd3f4);
            border-radius: 2px;
          }
          
          .section-subtitle {
            color: #666;
            font-size: 1.1rem;
          }
          
          /* Video Container Styles */
          .video-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 30px;
            width: 100%;
          }
          
          .video-card {
            border-radius: 15px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .video-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          }
          
          .video-card-inner {
            background-color: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
            height: 100%;
          }
          
          .video-image-container {
            position: relative;
            overflow: hidden;
            border-radius: 15px 15px 0 0;
            aspect-ratio: 16 / 9;
          }
          
          .video-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }
          
          .video-card:hover .video-image {
            transform: scale(1.05);
          }
          
          .video-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .video-card:hover .video-overlay {
            opacity: 1;
          }
          
          .video-play-icon {
            font-size: 3rem;
          }
          
          .video-info {
            padding: 20px;
          }
          
          .video-info h3 {
            margin-bottom: 10px;
            color: #444;
          }
          
          .video-info p {
            color: #666;
            margin-bottom: 15px;
          }
          
          .watch-btn {
            background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
            color: white;
            border: none;
            padding: 10px 20px;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 50px;
            transition: all 0.3s ease;
            font-family: 'Baloo 2', cursive;
            width: 100%;
            font-weight: 600;
            display: block;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0, 115, 183, 0.2);
          }
          
          .watch-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 15px rgba(0, 115, 183, 0.3);
          }
          
          /* Speech Section Styles */
          .speech-section {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }
          
          .speech-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          
          .speech-box {
            background-color: white;
            border-radius: 20px;
            padding: 30px;
            width: 100%;
            max-width: 600px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          
          .microphone-animation {
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
          }
          
          .mic-icon {
            font-size: 4rem;
            opacity: 0.8;
          }
          
          .listening-waves {
            position: relative;
            width: 80px;
            height: 80px;
          }
          
          .wave {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: rgba(66, 133, 244, 0.2);
            animation: wave 2s infinite;
          }
          
          .wave2 {
            animation-delay: 0.5s;
          }
          
          .wave3 {
            animation-delay: 1s;
          }
          
          @keyframes wave {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(1.5);
              opacity: 0;
            }
          }
          
          .speech-btn {
            background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.2rem;
            cursor: pointer;
            border-radius: 50px;
            transition: all 0.3s ease;
            font-family: 'Baloo 2', cursive;
            font-weight: 600;
            margin-bottom: 20px;
            box-shadow: 0 5px 15px rgba(255, 154, 158, 0.4);
          }
          
          .speech-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(255, 154, 158, 0.5);
          }
          
          .speech-btn.listening {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            animation: pulse 1.5s infinite;
          }
          
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(245, 87, 108, 0.4);
            }
            70% {
              box-shadow: 0 0 0 15px rgba(245, 87, 108, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(245, 87, 108, 0);
            }
          }
          
          .transcript-box {
            background-color: #f9f9f9;
            border-radius: 15px;
            padding: 20px;
            min-height: 150px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .transcript-title {
            color: #555;
            margin-bottom: 10px;
            font-size: 1.2rem;
          }
          
          .transcript {
            font-size: 1.1rem;
            color: #333;
            line-height: 1.6;
          }
          
          /* Emotions Section */
          .emotions-section {
            background: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
          }
          
          /* Video Player Styles */
          .video-player {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            padding: 20px;
          }
          
          .video-player-container {
            position: relative;
            width: 100%;
            max-width: 900px;
            aspect-ratio: 16 / 9;
            background-color: #000;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          }
          
          .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 10;
            font-size: 1.5rem;
            transition: all 0.3s ease;
          }
          
          .close-btn:hover {
            background-color: rgba(255, 255, 255, 0.4);
            transform: rotate(90deg);
          }
          
          /* Footer Styles */
          .footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 15px;
            font-size: 1rem;
          }
          
          /* Animations */
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Responsive Styles */
          @media (max-width: 768px) {
            .title {
              font-size: 2rem;
            }
            
            .tab-button {
              padding: 10px 15px;
              font-size: 1rem;
            }
            
            .section-title {
              font-size: 1.8rem;
            }
            
            .module-section {
              padding: 20px;
            }
            
            .video-container {
              grid-template-columns: 1fr;
            }
            
            .speech-box {
              padding: 20px;
            }
          }

          @media (max-width: 480px) {
            .title {
              font-size: 1.6rem;
            }
            
            .section-tabs {
              flex-direction: column;
              gap: 10px;
            }
            
            .tab-button {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}

export default CommunicationHighModule;