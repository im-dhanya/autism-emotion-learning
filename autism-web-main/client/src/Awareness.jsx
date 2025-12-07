import { Link } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { FaBrain, FaSearch, FaClipboardCheck, FaHandHoldingHeart } from "react-icons/fa";

function Awareness() {
  const getUserToken = localStorage.getItem("token");
  const getUserData = JSON.parse(localStorage.getItem("userData"));
  const autism_level = localStorage.getItem("autism-level");

  return (
    <div className="awareness-container">
      <header className="awareness-header">
        <div className="title-container">
          <FiInfo className="title-icon" />
          <h2>Autism Awareness</h2>
        </div>
        <nav className="main-nav">
          <ul>
            {!getUserToken ? <li><Link to={"/"} className="nav-link register-link">Register</Link></li> : null}
            {getUserToken ? <li><Link to={"/dashboard"} className="nav-link dashboard-link">Dashboard</Link></li> : null}
            {getUserToken ? <li><Link to={"/awareness"} className="nav-link active-link">Awareness</Link></li> : null}
            {getUserToken ? <li><Link to={"/survey"} className="nav-link survey-link">Survey</Link></li> : null}
            {getUserToken && getUserData?.name === "children" ? <li><Link to={"/study/module"} className="nav-link study-link">Study Fun</Link></li> : null}
            {getUserToken && autism_level <= 60 && getUserData?.name === "children" ? <li><Link to={"/communication/low/module"} className="nav-link comm-link">Talk Time</Link></li> : null}
            {getUserToken && autism_level > 60 && getUserData?.name === "children" ? <li><Link to={"/communication/high/module"} className="nav-link comm-link">Talk Time</Link></li> : null}
            {getUserToken && getUserData?.name === "children" ? <li><Link to={"/test/module"} className="nav-link test-link">Fun Quiz</Link></li> : null}
            {getUserToken && getUserData?.name === "parent" ?  <li><Link to={"/parent"} className="nav-link parent-link">Parent</Link></li> : null}
          </ul>
        </nav>
      </header>
      
      <main className="awareness-main">
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2>Understanding Autism: A Guide for Parents</h2>
            <p>Learn about autism spectrum disorder and how to support your child's development.</p>
          </div>
        </div>

        <section className="content-section what-is-section">
          <div className="section-header">
            <FaBrain className="section-icon" />
            <h3>What is Autism?</h3>
          </div>
          <div className="section-content">
            <p>
              Autism Spectrum Disorder (ASD) is a developmental condition that affects communication, behavior, and social interactions.
              Each child with autism is unique, and the spectrum can range from mild to severe.
            </p>
          </div>
        </section>

        <section className="content-section signs-section">
          <div className="section-header">
            <FaSearch className="section-icon" />
            <h3>Recognizing the Signs</h3>
          </div>
          <div className="section-content">
            <ul className="awareness-list">
              <li>Delayed speech or language skills</li>
              <li>Difficulty making eye contact</li>
              <li>Repetitive behaviors or intense focus on specific interests</li>
              <li>Sensitivity to sensory inputs like sound, light, or textures</li>
              <li>Challenges in social interactions</li>
            </ul>
          </div>
        </section>

        <section className="content-section diagnosis-section">
          <div className="section-header">
            <FaClipboardCheck className="section-icon" />
            <h3>Seeking a Diagnosis</h3>
          </div>
          <div className="section-content">
            <p>
              If you notice signs of autism in your child, consult with a pediatrician or a specialist.
              A formal diagnosis can open the door to various resources and interventions that can help your child thrive.
            </p>
          </div>
        </section>

        <section className="content-section support-section">
          <div className="section-header">
            <FaHandHoldingHeart className="section-icon" />
            <h3>Supporting Your Child</h3>
          </div>
          <div className="section-content">
            <ul className="awareness-list">
              <li><strong>Create a Structured Environment:</strong> Clear routines help children with autism thrive.</li>
              <li><strong>Use Visual Supports:</strong> Visual schedules and picture cards assist with understanding daily activities.</li>
              <li><strong>Encourage Communication:</strong> Support alternative ways for your child to express themselves.</li>
              <li><strong>Promote Social Interaction:</strong> Encourage playdates and group activities.</li>
            </ul>
          </div>
        </section>
      </main>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&family=Bubblegum+Sans&display=swap');

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Comic Neue', cursive;
          }

          body {
            background-color: #f0f7ff;
            color: #333;
            line-height: 1.6;
          }

          .awareness-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          /* Header Styling */
          .awareness-header {
            background: linear-gradient(135deg, #FF758C 0%, #FF7EB3 100%);
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            margin-bottom: 30px;
          }

          .title-container {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
          }

          .title-icon {
            font-size: 2.5rem;
            color: #fff;
            margin-right: 15px;
          }

          .awareness-header h2 {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 2.8rem;
            color: #fff;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          }

          .main-nav ul {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            list-style: none;
            padding-top: 10px;
            gap: 15px;
          }

          .nav-link {
            display: inline-block;
            color: #fff;
            font-size: 1.1rem;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 50px;
            background-color: rgba(255,255,255,0.2);
            transition: all 0.3s ease;
            font-weight: bold;
          }

          .nav-link:hover {
            background-color: rgba(255,255,255,0.4);
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }

          .active-link {
            background-color: #fff;
            color: #FF758C;
          }

          .register-link { background-color: rgba(255, 102, 102, 0.7); }
          .dashboard-link { background-color: rgba(102, 204, 255, 0.7); }
          .survey-link { background-color: rgba(255, 204, 102, 0.7); }
          .comm-link { background-color: rgba(153, 102, 255, 0.7); }
          .test-link { background-color: rgba(102, 255, 153, 0.7); }
          .study-link { background-color: rgba(255, 153, 255, 0.7); }
          .parent-link { background-color: rgba(102, 153, 255, 0.7); }

          /* Welcome Banner */
          .welcome-banner {
            background: linear-gradient(135deg, #A6C1EE 0%, #FBC2EB 100%);
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            text-align: center;
          }

          .welcome-text h2 {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 2.2rem;
            color: #fff;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
          }

          .welcome-text p {
            font-size: 1.2rem;
            color: #fff;
          }

          /* Section Styling */
          .content-section {
            background-color: #fff;
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          }

          .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px dotted #eee;
          }

          .section-icon {
            font-size: 2rem;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 15px;
            color: white;
          }

          .what-is-section .section-icon {
            background-color: #7B68EE;
          }

          .signs-section .section-icon {
            background-color: #FF6B6B;
          }

          .diagnosis-section .section-icon {
            background-color: #4ECDC4;
          }

          .support-section .section-icon {
            background-color: #FF9F1C;
          }

          .content-section h3 {
            font-family: 'Bubblegum Sans', cursive;
            font-size: 2rem;
            color: #444;
          }

          .section-content {
            padding: 10px;
            font-size: 1.1rem;
          }

          .awareness-list {
            list-style-type: none;
            padding: 10px 0;
          }

          .awareness-list li {
            position: relative;
            padding-left: 25px;
            margin-bottom: 12px;
          }

          .awareness-list li:before {
            content: "•";
            color: #FF758C;
            font-size: 1.5rem;
            position: absolute;
            left: 0;
            top: -2px;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .awareness-header h2 {
              font-size: 2.2rem;
            }

            .nav-link {
              font-size: 0.9rem;
              padding: 8px 15px;
            }

            .welcome-text h2 {
              font-size: 1.8rem;
            }

            .welcome-text p {
              font-size: 1rem;
            }

            .content-section h3 {
              font-size: 1.6rem;
            }

            .section-content {
              font-size: 1rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Awareness;