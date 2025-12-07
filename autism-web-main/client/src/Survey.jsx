import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Survey() {
  const getUserToken = localStorage.getItem("token");
  const getUserData = JSON.parse(localStorage.getItem("userData"));
  const autism_level = localStorage.getItem("autism-level");
  const navigate = useNavigate();
  
  let initialFields = { name: "", level: "", content: "" };
  const [fields, setFields] = useState(initialFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("autism-level");
    navigate("/register");
  }

  function handleSend(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    let url = "http://localhost:5000/api/parents/autism/survey";
    axios.post(url, {
      name: fields.name,
      level: fields.level,
      content: fields.content
    })
    .then((res) => {
      console.log(res);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);
    })
    .finally(() => {
      setFields({ name: "", level: "", content: "" });
      setIsSubmitting(false);
    })
    .catch((err) => console.log(err));
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>
            <span style={styles.logoText}>KidLearn</span>
          </div>
        </div>
        <h2 style={styles.headerText}>Parent Survey</h2>
        <nav>
          <ul style={styles.navList}>
            {!getUserToken ? <li><Link to={"/"} style={styles.navItem}>Register</Link></li> : null}
            {getUserToken ? <li><Link to={"/dashboard"} style={styles.navItem}>Dashboard</Link></li> : null}
            {getUserToken ? <li><Link to={"/awareness"} style={styles.navItem}>Awareness</Link></li> : null}
            {getUserToken ? <li><Link to={"/survey"} style={{...styles.navItem, ...styles.activeNavItem}}>Survey</Link></li> : null}
            {getUserToken && getUserData.name === "parent" ? <li><Link to={"/parent"} style={styles.navItem}>Parent</Link></li> : null}
            {getUserToken ? <li><button onClick={logout} style={styles.logoutButton}>Logout</button></li> : null}
          </ul>
        </nav>
      </header>

      <main style={styles.main}>
        {showThankYou && (
          <div style={styles.thankYouAnimation}>
            <div style={styles.thankYouContent}>
              <h2 style={styles.thankYouText}>Thank You!</h2>
              <p style={styles.thankYouSubtext}>Your survey has been submitted</p>
            </div>
          </div>
        )}
        
        <div style={styles.titleContainer}>
          <div style={styles.titleBubble}>
            <h2 style={styles.title}>Tell Us About Your Child</h2>
            <p style={styles.subtitle}>Your input helps us provide better support</p>
          </div>
        </div>
        
        <div style={styles.formContainer}>
          <form onSubmit={handleSend} style={styles.form}>
            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>
                <span style={styles.labelIcon}>👶</span> Child's Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={fields.name}
                style={styles.input}
                onChange={handleChange}
                placeholder="Enter your child's name..."
                required
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label htmlFor="level" style={styles.label}>
                <span style={styles.labelIcon}>📊</span> Level of Autism
              </label>
              <input
                type="text"
                id="level"
                name="level"
                value={fields.level}
                style={styles.input}
                onChange={handleChange}
                placeholder="If known, enter the level..."
              />
            </div>
            
            <div style={styles.inputGroup}>
              <label htmlFor="content" style={styles.label}>
                <span style={styles.labelIcon}>📝</span> Tell Us More
              </label>
              <textarea
                id="content"
                name="content"
                style={styles.textarea}
                value={fields.content}
                onChange={handleChange}
                placeholder="Share your observations, concerns, or questions about your child..."
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              style={isSubmitting ? {...styles.button, ...styles.buttonDisabled} : styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Survey'}
            </button>
          </form>
        </div>
        
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
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    marginTop: '20px',
  },
  titleBubble: {
    backgroundColor: '#FFEAA7',
    padding: '15px 30px',
    borderRadius: '30px',
    boxShadow: '0 6px 0 #FFB347',
    transform: 'rotate(-2deg)',
    maxWidth: '80%',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    color: '#6834CB',
    margin: '10px 0',
    textShadow: '1px 1px 0 white',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#FF6B6B',
    margin: '5px 0',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0 30px',
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 10px 0 rgba(0,0,0,0.05), 0 15px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
    border: '3px solid #C7CEEA',
  },
  inputGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#6834CB',
  },
  labelIcon: {
    marginRight: '8px',
    fontSize: '1.4rem',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '15px',
    border: '3px solid #FFD166',
    backgroundColor: '#FFFAF0',
    fontSize: '1rem',
    transition: 'all 0.3s',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '15px',
    border: '3px solid #B5EAD7',
    backgroundColor: '#F0FFF4',
    fontSize: '1rem',
    minHeight: '150px',
    resize: 'vertical',
    transition: 'all 0.3s',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  button: {
    backgroundColor: '#FF6B6B',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 5px 0 #FF5252',
    marginTop: '10px',
    fontFamily: 'inherit',
    position: 'relative',
    overflow: 'hidden',
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
    boxShadow: '0 5px 0 #AAAAAA',
    cursor: 'not-allowed',
  },
  thankYouAnimation: {
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
  thankYouContent: {
    backgroundColor: '#B5EAD7',
    padding: '30px 50px',
    borderRadius: '20px',
    boxShadow: '0 10px 0 #66C7AC, 0 15px 25px rgba(0,0,0,0.15)',
    textAlign: 'center',
    animation: 'bounce 0.5s',
  },
  thankYouText: {
    fontSize: '2.5rem',
    color: '#6834CB',
    margin: '10px 0',
    textShadow: '2px 2px 0 white',
  },
  thankYouSubtext: {
    fontSize: '1.3rem',
    color: '#333',
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
};

export default Survey;