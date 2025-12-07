import { Link, useNavigate } from "react-router-dom";
import styleModule from "./images/study.webp";
import CommunicationModule from "./images/communication.webp";
import testModule from "./images/test.webp";
import parentModule from "./images/parent1.jpg";
import { useState, useEffect } from "react";

function Dashboard() {
  const [isHovering, setIsHovering] = useState(null);
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  
  const getUserToken = localStorage.getItem("token");
  const getUserData = JSON.parse(localStorage.getItem("userData"));
  const autism_level = localStorage.getItem("autism-level");
  const navigate = useNavigate();

  useEffect(() => {
    // Hide welcome animation after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcomeAnimation(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("autism-level");
    navigate("/register");
  }

  // Get username for display
  const username = getUserData ? getUserData.email.slice(0, getUserData.email.indexOf('@')).toUpperCase() : null;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>
            <span style={styles.logoText}>KidLearn</span>
          </div>
        </div>
        <h2 style={styles.headerText}>My Learning Adventure</h2>
        <nav>
          <ul style={styles.navList}>
            {!getUserToken ? <li><Link to={"/"} style={styles.navItem}>Register</Link></li> : null}
            {getUserToken ? <li><Link to={"/dashboard"} style={{...styles.navItem, ...styles.activeNavItem}}>Dashboard</Link></li> : null}
            {getUserToken && getUserData.name === "parent" ? <li><Link to={"/awareness"} style={styles.navItem}>Awareness</Link></li> : null}
            {getUserToken && getUserData.name === "parent" ? <li><Link to={"/survey"} style={styles.navItem}>Survey</Link></li> : null}
            {getUserToken && getUserData.name === "parent" ? <li><Link to={"/parent"} style={styles.navItem}>Parent</Link></li> : null}
            {getUserToken ?  <li><Link to={"/"} onClick={logout} style={styles.navItem}>Logout</Link></li> : null}
          </ul>
        </nav>
      </header>

      <main style={styles.main}>
        {showWelcomeAnimation && (
          <div style={styles.welcomeAnimation}>
            <h1 style={styles.animatedText}>Welcome, {username}!</h1>
          </div>
        )}
        
        <div style={styles.welcomeContainer}>
          <div style={styles.welcomeBubble}>
            <h2 style={styles.welcomeText}>
              Hello <span style={styles.text}>{username}</span>!
            </h2>
            <p style={styles.welcomeSubtext}>What would you like to learn today?</p>
          </div>
        </div>
        
        <article style={styles.article}>
          <div style={styles.modulesContainer}>
            {getUserData.name === "children" ? (
              <div 
                style={{
                  ...styles.module, 
                  ...styles.testModule,
                  ...(isHovering === 'test' ? styles.moduleHover : {})
                }}
                onMouseEnter={() => setIsHovering('test')}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => navigate('/test/module')}
              >
                <div style={styles.moduleImageContainer}>
                  <img src={styleModule} width={140} height={140} loading="lazy" style={styles.image} />
                  {isHovering === 'test' && (
                    <div style={styles.startButton}>Start!</div>
                  )}
                </div>
                <h3 style={styles.moduleTitle}>Test Adventure </h3>
                <p style={styles.moduleDescription}>Find out what you know!</p>
              </div>
            ) : null}

            {autism_level <= 60 ? (
              getUserData.name === "children" ? (
                <div 
                  style={{
                    ...styles.module, 
                    ...styles.comLowModule,
                    ...(isHovering === 'comLow' ? styles.moduleHover : {})
                  }}
                  onMouseEnter={() => setIsHovering('comLow')}
                  onMouseLeave={() => setIsHovering(null)}
                  onClick={() => navigate('/communication/low/module')}
                >
                  <div style={styles.moduleImageContainer}>
                    <img src={CommunicationModule} width={140} height={140} loading="lazy" style={styles.image} />
                    {isHovering === 'comLow' && (
                      <div style={styles.startButton}>Start!</div>
                    )}
                  </div>
                  <h3 style={styles.moduleTitle}>Talk Time</h3>
                  <p style={styles.moduleDescription}>Let's learn to chat!</p>
                </div>
              ) : null
            ) : (
              getUserData.name === "children" ? (
                <div 
                  style={{
                    ...styles.module, 
                    ...styles.comHighModule,
                    ...(isHovering === 'comHigh' ? styles.moduleHover : {})
                  }}
                  onMouseEnter={() => setIsHovering('comHigh')}
                  onMouseLeave={() => setIsHovering(null)}
                  onClick={() => navigate('/communication/high/module')}
                >
                  <div style={styles.moduleImageContainer}>
                    <img src={CommunicationModule} width={140} height={140} loading="lazy" style={styles.image} />
                    {isHovering === 'comHigh' && (
                      <div style={styles.startButton}>Start!</div>
                    )}
                  </div>
                  <h3 style={styles.moduleTitle}>Talk Time</h3>
                  <p style={styles.moduleDescription}>Let's learn to chat!</p>
                </div>
              ) : null
            )}

            {getUserData.name === "children" ? (
              <div 
                style={{
                  ...styles.module, 
                  ...styles.studyModule,
                  ...(isHovering === 'study' ? styles.moduleHover : {})
                }}
                onMouseEnter={() => setIsHovering('study')}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => navigate('/study/module')}
              >
                <div style={styles.moduleImageContainer}>
                  <img src={testModule} width={140} height={140} loading="lazy" style={styles.image} />
                  {isHovering === 'study' && (
                    <div style={styles.startButton}>Start!</div>
                  )}
                </div>
                <h3 style={styles.moduleTitle}>Brain Boost</h3>
                <p style={styles.moduleDescription}>Let's learn something new!</p>
              </div>
            ) : null}

            {getUserData.name === "parent" ? (
              <div 
                style={{
                  ...styles.module, 
                  ...styles.parentModule,
                  ...(isHovering === 'parent' ? styles.moduleHover : {})
                }}
                onMouseEnter={() => setIsHovering('parent')}
                onMouseLeave={() => setIsHovering(null)}
                onClick={() => navigate('/parent')}
              >
                <div style={styles.moduleImageContainer}>
                  <img src={parentModule} width={140} height={140} loading="lazy" style={styles.image} />
                  {isHovering === 'parent' && (
                    <div style={styles.startButton}>Enter</div>
                  )}
                </div>
                <h3 style={styles.moduleTitle}>Parent Center</h3>
                <p style={styles.moduleDescription}>Tools & resources for parents</p>
              </div>
            ) : null}
          </div>
        </article>
        
        <div style={styles.footer}>
          <div style={styles.footerBubbles}>
            <div style={{...styles.bubble, backgroundColor: '#FF9AA2'}}></div>
            <div style={{...styles.bubble, backgroundColor: '#FFB347'}}></div>
            <div style={{...styles.bubble, backgroundColor: '#B5EAD7'}}></div>
            <div style={{...styles.bubble, backgroundColor: '#C7CEEA'}}></div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Comic Sans MS', 'Bubblegum Sans', cursive",
    backgroundColor: '#F8F9FF',
    minHeight: '100vh',
    backgroundImage: 'radial-gradient(#e0e8ff 10%, transparent 11%), radial-gradient(#e0e8ff 10%, transparent 11%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 30px 30px',
  },
  header: {
    backgroundImage: 'linear-gradient(to right, #6A11CB, #2575FC)',
    padding: '15px 25px',
    borderBottomLeftRadius: '30px',
    borderBottomRightRadius: '30px',
    color: 'white',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
    position: 'relative',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  logo: {
    backgroundColor: 'white',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  logoText: {
    fontSize: '0.6rem',
    fontWeight: 'bold',
    color: '#6A11CB',
  },
  headerText: {
    margin: '10px 0 15px',
    fontSize: '1.8rem',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 0,
    margin: '15px 0 0',
    gap: '10px',
  },
  navItem: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '8px 15px',
    borderRadius: '20px',
    transition: 'all 0.3s',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  activeNavItem: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  logoutButton: {
    background: 'none',
    border: '2px solid white',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '8px 15px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontFamily: 'inherit',
  },
  main: {
    padding: '20px',
    position: 'relative',
  },
  welcomeAnimation: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    zIndex: 100,
  },
  animatedText: {
    fontSize: '3rem',
    color: '#FF6B6B',
    animation: 'bounce 1s infinite',
    textShadow: '3px 3px 0px #FFD166',
  },
  welcomeContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    marginTop: '20px',
  },
  welcomeBubble: {
    backgroundColor: '#FFEAA7',
    padding: '15px 30px',
    borderRadius: '30px',
    boxShadow: '0 6px 0 #FFB347',
    transform: 'rotate(-2deg)',
    maxWidth: '80%',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#6834CB',
    margin: '10px 0',
    textShadow: '1px 1px 0 white',
  },
  welcomeSubtext: {
    fontSize: '1.2rem',
    color: '#FF6B6B',
    margin: '5px 0',
  },
  text: {
    color: "#FF6B6B",
    fontWeight: 900,
    textDecoration: 'underline',
    textDecorationStyle: 'wavy',
    textDecorationColor: '#FFD166',
  },
  article: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0 30px',
  },
  modulesContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  module: {
    textAlign: 'center',
    borderRadius: '25px',
    padding: '20px',
    transition: 'all 0.3s',
    width: '200px',
    marginBottom: '20px',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 8px 0 rgba(0,0,0,0.1), 0 20px 25px -5px rgba(0,0,0,0.1)',
  },
  moduleHover: {
    transform: 'translateY(-10px)',
    boxShadow: '0 15px 0 rgba(0,0,0,0.05), 0 25px 30px -5px rgba(0,0,0,0.15)',
  },
  testModule: {
    backgroundColor: '#FFD166',
    border: '3px solid #FFA41B',
  },
  comLowModule: {
    backgroundColor: '#A3D9FF',
    border: '3px solid #5DA7DB',
  },
  comHighModule: {
    backgroundColor: '#A3D9FF',
    border: '3px solid #5DA7DB',
  },
  studyModule: {
    backgroundColor: '#B5EAD7',
    border: '3px solid #66C7AC',
  },
  parentModule: {
    backgroundColor: '#FFB7B2',
    border: '3px solid #FF8882',
  },
  moduleImageContainer: {
    position: 'relative',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    borderRadius: '15px',
    border: '3px solid white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    objectFit: 'cover',
  },
  startButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    color: '#333',
    fontWeight: 'bold',
    padding: '8px 15px',
    borderRadius: '30px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    animation: 'pulse 1.5s infinite',
  },
  moduleTitle: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#333',
    margin: '10px 0 5px',
    textShadow: '1px 1px 0 rgba(255,255,255,0.5)',
  },
  moduleDescription: {
    fontSize: '1rem',
    color: '#555',
    margin: '0 0 10px',
  },
  footer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  footerBubbles: {
    display: 'flex',
    gap: '15px',
  },
  bubble: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    animation: 'float 3s infinite ease-in-out',
  },
  '@keyframes pulse': {
    '0%': { transform: 'translate(-50%, -50%) scale(1)' },
    '50%': { transform: 'translate(-50%, -50%) scale(1.1)' },
    '100%': { transform: 'translate(-50%, -50%) scale(1)' }
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0)' }
  },
  '@keyframes bounce': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' }
  }
};

export default Dashboard;