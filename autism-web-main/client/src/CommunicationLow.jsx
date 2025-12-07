import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaPlay, FaStar, FaHome, FaBook, FaSmile } from "react-icons/fa";
import basicConvo from "./images/basic-convo.jpg"
import feelings from "./images/feelings.jpg"
import variousRole from "./images/various-role.jpg"
import fighting from "./images/fighting.webp"
import multipleChoices from "./images/multiple-choices.jpg"
import failureSuccess from "./images/failure-success.jpg"

function CommunicationLowModule() {
  const getUserToken = localStorage.getItem("token");
  const getUserData = JSON.parse(localStorage.getItem("userData"));
  const autism_level = localStorage.getItem("autism-level");

  const [video, setVideo] = useState();
  const [isVisible, setIsvisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  const videosData = [
    { id: 1, video: "topBLaz4zgk", title: "Basic Conversation", description: "Learn how to talk with friends and make new ones!", icon: "💬", color: "#FFD166" },
    { id: 2, video: "-KP-5fnir48", title: "Feelings & Emotions", description: "Discover all the amazing feelings we can have!", icon: "😊", color: "#EF476F" },
    { id: 3, video: "Myf2CUx9E60", title: "Role Playing", description: "Try being different people in fun situations!", icon: "🎭", color: "#06D6A0" },
    { id: 4, video: "K_iudcQ0Mj0", title: "Solving Arguments", description: "Learn how to handle tough situations with friends.", icon: "🤝", color: "#118AB2" },
    { id: 5, video: "mJxk5cQULh4", title: "Making Choices", description: "Practice making good choices in different situations.", icon: "🔄", color: "#8338EC" },
    { id: 6, video: "UX5cgiaEGMQ", title: "Learning from Mistakes", description: "Everyone makes mistakes - let's learn from them!", icon: "🌟", color: "#FF9E00" },
  ];

  const imageMap = {
    1: basicConvo,
    2: feelings,
    3: variousRole,
    4: fighting,
    5: multipleChoices,
    6: failureSuccess
  };

  function handleClick(id) {
    const selectedVideo = videosData.find(item => item.id === id);
    if (selectedVideo) {
      setIsvisible(true);
      setVideo(selectedVideo.video);
    }
  }

  function handleClose() {
    setIsvisible(false);
  }

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-content">
          <h2 className="title">My Communication Adventures</h2>
          <div className="character-container">
            <div className="character"></div>
          </div>
        </div>
        <nav className="main-nav">
          <ul>
            {!getUserToken ? <li><Link to={"/"} className="nav-link"><FaHome /> Join Us</Link></li> : null}
            {getUserToken ? <li><Link to={"/dashboard"} className="nav-link"><FaHome /> My Home</Link></li> : null}
            {getUserToken && getUserData.name === "parent" ? <li><Link to={"/survey"} className="nav-link"><FaBook /> Parent Survey</Link></li> : null}
            {getUserToken ? <li><Link to={"/study/module"} className="nav-link"><FaBook /> Learning Center</Link></li> : null}
            {getUserToken && autism_level <= 60 ? <li><Link to={"/communication/low/module"} className="nav-link active"><FaSmile /> Communication Fun</Link></li> : null}
            {getUserToken && autism_level > 60 ? <li><Link to={"/communication/high/module"} className="nav-link"><FaSmile /> Communication Skills</Link></li> : null}
            {getUserToken ? <li><Link to={"/test/module"} className="nav-link"><FaStar /> Test Your Skills</Link></li> : null}
          </ul>
        </nav>
      </header>

      <div className="page-content">
        {!isVisible ? (
          <>
            <div className="welcome-banner">
              <h1>Welcome to Communication Fun!</h1>
              <p>Pick a fun video to watch and learn with!</p>
            </div>
            
            <main className="video-grid">
              {videosData.map((item) => (
                <section 
                  key={item.id} 
                  className={`video-container ${activeCard === item.id ? 'active' : ''}`}
                  style={{ backgroundColor: `${item.color}20`, borderColor: item.color }}
                  onMouseEnter={() => setActiveCard(item.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div className="video-icon" style={{ backgroundColor: item.color }}>
                    <span role="img" aria-label={item.title}>{item.icon}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <div className="video-box">
                    <img
                      src={imageMap[item.id]}
                      alt={item.title}
                      className="video-thumbnail"
                    />
                    <button
                      className="watch-now-btn"
                      style={{ backgroundColor: item.color }}
                      onClick={() => handleClick(item.id)}
                    >
                      <FaPlay /> Watch Now
                    </button>
                  </div>
                </section>
              ))}
            </main>
          </>
        ) : (
          <div className="video-player">
            <div className="video-title">
              <h3>{videosData.find(item => item.video === video)?.title || "Learning Video"}</h3>
              <button className="close-button" onClick={handleClose}>
                <IoMdClose />
              </button>
            </div>
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${video}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="video-controls">
              <button className="control-button back-button" onClick={handleClose}>
                Back to Videos
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="footer">
        <div className="footer-characters">
          <div className="footer-character character-1"></div>
          <div className="footer-character character-2"></div>
          <div className="footer-character character-3"></div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

          :root {
            --primary-color: #4D6DE3;
            --secondary-color: #8338EC;
            --accent-color: #FF9E00;
            --background-color: #F0F7FF;
            --card-background: #FFFFFF;
            --text-color: #333333;
            --light-text: #6B7280;
            --border-radius: 18px;
            --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }

          body {
            font-family: 'Nunito', sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--background-color);
            color: var(--text-color);
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }

          .app-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }

          .main-header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 15px 20px;
            border-radius: 0 0 var(--border-radius) var(--border-radius);
            box-shadow: var(--box-shadow);
            position: relative;
            overflow: hidden;
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .character-container {
            position: relative;
            width: 80px;
            height: 80px;
          }

          .character {
            width: 80px;
            height: 80px;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23FFDE59'/%3E%3Ccircle cx='35' cy='40' r='8' fill='%23333'/%3E%3Ccircle cx='65' cy='40' r='8' fill='%23333'/%3E%3Cpath d='M35 70 Q50 85 65 70' stroke='%23333' stroke-width='4' fill='none'/%3E%3C/svg%3E");
            background-size: contain;
            position: absolute;
            transition: all 0.3s ease;
          }

          .character:hover {
            transform: scale(1.1) rotate(5deg);
          }

          .title {
            font-size: 2.2rem;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            font-weight: 700;
            letter-spacing: 1px;
          }

          .main-nav {
            margin-top: 15px;
          }

          .main-nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            gap: 15px;
            flex-wrap: wrap;
          }

          .nav-link {
            color: white;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 600;
            padding: 8px 15px;
            border-radius: 30px;
            background-color: rgba(255, 255, 255, 0.2);
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .nav-link:hover, .nav-link.active {
            background-color: white;
            color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .page-content {
            flex: 1;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
          }

          .welcome-banner {
            background: linear-gradient(135deg, #FFD166, #FF9E00);
            border-radius: var(--border-radius);
            padding: 20px;
            margin-bottom: 30px;
            text-align: center;
            color: white;
            box-shadow: var(--box-shadow);
            animation: pulse 3s infinite;
          }

          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 158, 0, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(255, 158, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 158, 0, 0); }
          }

          .welcome-banner h1 {
            margin: 0 0 10px;
            font-size: 2rem;
          }

          .welcome-banner p {
            margin: 0;
            font-size: 1.2rem;
          }

          .video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            justify-content: center;
          }

          .video-container {
            background-color: var(--card-background);
            border-radius: var(--border-radius);
            padding: 25px;
            box-shadow: var(--box-shadow);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            border: 3px solid transparent;
            position: relative;
            overflow: hidden;
          }

          .video-container:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.15);
          }

          .video-container.active {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.15);
          }

          .video-icon {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            font-size: 30px;
          }

          .video-container h3 {
            color: var(--text-color);
            font-size: 1.5rem;
            margin: 0 0 10px;
            font-weight: 700;
          }

          .video-container p {
            color: var(--light-text);
            margin: 0 0 20px;
            font-size: 1rem;
            line-height: 1.5;
          }

          .video-box {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-top: auto;
          }

          .video-thumbnail {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: calc(var(--border-radius) - 5px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .video-container:hover .video-thumbnail {
            transform: scale(1.05);
          }

          .watch-now-btn {
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            border-radius: 30px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            width: 80%;
            justify-content: center;
          }

          .watch-now-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }

          .video-player {
            background-color: var(--card-background);
            border-radius: var(--border-radius);
            padding: 25px;
            box-shadow: var(--box-shadow);
          }

          .video-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .video-title h3 {
            font-size: 1.8rem;
            margin: 0;
            color: var(--primary-color);
          }

          .close-button {
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .close-button:hover {
            background: var(--secondary-color);
            transform: rotate(90deg);
          }

          iframe {
            border-radius: calc(var(--border-radius) - 5px);
            box-shadow: var(--box-shadow);
          }

          .video-controls {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }

          .control-button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 12px 30px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            border-radius: 30px;
            transition: all 0.2s ease;
          }

          .control-button:hover {
            background-color: var(--secondary-color);
            transform: translateY(-2px);
          }

          .footer {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            padding: 20px;
            color: white;
            text-align: center;
            margin-top: 40px;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
            position: relative;
          }

          .footer-characters {
            display: flex;
            justify-content: space-around;
            margin-bottom: -35px;
          }

          .footer-character {
            width: 60px;
            height: 60px;
            background-size: contain;
            position: relative;
            bottom: -30px;
            transition: all 0.3s ease;
          }

          .character-1 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23FF6B6B'/%3E%3Ccircle cx='35' cy='40' r='8' fill='%23FFF'/%3E%3Ccircle cx='65' cy='40' r='8' fill='%23FFF'/%3E%3Cpath d='M35 65 Q50 80 65 65' stroke='%23FFF' stroke-width='4' fill='none'/%3E%3C/svg%3E");
          }

          .character-2 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%234ECDC4'/%3E%3Ccircle cx='35' cy='40' r='8' fill='%23FFF'/%3E%3Ccircle cx='65' cy='40' r='8' fill='%23FFF'/%3E%3Cpath d='M30 60 Q50 75 70 60' stroke='%23FFF' stroke-width='4' fill='none'/%3E%3C/svg%3E");
          }

          .character-3 {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%23FFD166'/%3E%3Ccircle cx='35' cy='40' r='8' fill='%23FFF'/%3E%3Ccircle cx='65' cy='40' r='8' fill='%23FFF'/%3E%3Cpath d='M40 70 Q50 60 60 70' stroke='%23FFF' stroke-width='4' fill='none'/%3E%3C/svg%3E");
          }

          .footer-character:hover {
            transform: translateY(-10px) scale(1.2);
            cursor: pointer;
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            .title {
              font-size: 1.8rem;
            }
            
            .character-container {
              display: none;
            }
            
            .video-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
            
            iframe {
              height: 400px;
            }
          }

          @media (max-width: 480px) {
            .title {
              font-size: 1.5rem;
            }
            
            .nav-link {
              font-size: 0.9rem;
              padding: 6px 12px;
            }
            
            .video-grid {
              grid-template-columns: 1fr;
            }
            
            .welcome-banner h1 {
              font-size: 1.6rem;
            }
            
            iframe {
              height: 300px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default CommunicationLowModule;