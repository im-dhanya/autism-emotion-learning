import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaYoutube, FaStar, FaBook, FaCheck, FaTrafficLight, FaImage, FaMusic } from "react-icons/fa";
import { FiSmile } from "react-icons/fi";
import confetti from 'canvas-confetti';

function StudyModule() {
    const [data, setData] = useState();
    const retriveItem = localStorage.getItem("checkedItem");
    const retrivedData = JSON.parse(retriveItem);

    const getUserToken = localStorage.getItem("token");
    const getUserData = JSON.parse(localStorage.getItem("userData"));
    const autism_level = localStorage.getItem("autism-level");

    useEffect(() => {
        setData(retrivedData);
    }, []);

    let initialCheck = { checkbox1: { checked: false }, checkbox2: { checked: false } };
    const [check, setCheck] = useState(initialCheck);
    const [activeStory, setActiveStory] = useState(null);

    function handleCheck(e) {
        const { name, checked } = e.target;
        let newCheck = { ...check, [name]: { checked } };
        setCheck(newCheck);
        localStorage.setItem("checkedItem", JSON.stringify(newCheck));
        
        // Trigger confetti when checkbox is checked
        if (checked) {
            const confettiBtn = document.getElementById(name);
            if (confettiBtn) {
                const rect = confettiBtn.getBoundingClientRect();
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { 
                        x: (rect.left + rect.width / 2) / window.innerWidth,
                        y: (rect.top + rect.height / 2) / window.innerHeight
                    }
                });
            }
        }
    }

    function dailyHygieneNote() {
        let date = new Date();
        let note = date.toLocaleTimeString().slice(8, 11);
        let noteTime = date.toLocaleTimeString().slice(0, 1).length;

        if (noteTime === 1) {
            noteTime = date.toLocaleTimeString().slice(0, 1);
        } else {
            noteTime = date.toLocaleTimeString().slice(0, 2);
        }

        if (note === "PM" && noteTime === "11") {
            let updateCheck = check;

            if (updateCheck.checkbox1.checked) {
                updateCheck.checkbox1.checked = false;
            }
            if (updateCheck.checkbox2.checked) {
                updateCheck.checkbox2.checked = false;
            }

            localStorage.setItem("checkedItem", JSON.stringify(updateCheck));
        }
    }

    dailyHygieneNote();

    const toggleStory = (index) => {
        setActiveStory(activeStory === index ? null : index);
    };

    // Sample stories with actual content instead of Lorem ipsum
    const stories = [
        {
            title: "The Kind Elephant",
            content: "Once there was an elephant who loved to help others. One day, he found a small bird with a broken wing. The elephant gently picked up the bird and carried it to safety. He took care of the bird until its wing healed. The bird was so grateful that it sang beautiful songs for the elephant every morning. They became the best of friends!"
        },
        {
            title: "The Brave Little Star",
            content: "High in the night sky, there was a tiny star who was afraid to shine. All the other stars glowed brightly, but this little star stayed dim. One night, a child was lost in the forest. The little star realized it could help by shining its light. It gathered all its courage and began to glow brighter than ever before. The child looked up, saw the star, and found the way home. From that day on, the little star never feared shining again."
        },
        {
            title: "The Rainbow Fish",
            content: "In the deep blue sea lived a fish with beautiful rainbow scales. At first, Rainbow Fish wouldn't share any scales with other fish. This made Rainbow Fish lonely. Then Rainbow Fish learned that sharing can bring happiness. When Rainbow Fish gave some scales to others, everyone became friends, and Rainbow Fish discovered that giving is the greatest joy of all."
        },
        {
            title: "The Friendly Robot",
            content: "There once was a robot who wanted to make friends. But everyone was scared of the robot because it looked different. One rainy day, the robot used its umbrella to keep a group of children dry. The children realized the robot was kind and friendly. Soon, everyone in town wanted to be friends with the helpful robot. The robot learned that being yourself is the best way to make true friends."
        },
        {
            title: "The Magic Garden",
            content: "There was a garden that grew only when children laughed. The more they laughed, the more beautiful flowers bloomed. One summer, the children became too busy with video games to visit the garden. The flowers began to wilt. Then one little girl found the garden and was sad to see it dying. She brought her friends to play there, and their laughter made the garden bloom again. The garden taught them that joy and sharing make everything grow better."
        }
    ];

    return (
        <div className="study-module-container">
            <header className="study-header">
                <div className="title-container">
                    <FiSmile className="title-icon" />
                    <h2>Learning Adventure</h2>
                </div>
                <nav className="main-nav">
                    <ul>
                        {!getUserToken ? <li><Link to={"/"} className="nav-link register-link">Register</Link></li> : null}
                        {getUserToken ? <li><Link to={"/dashboard"} className="nav-link dashboard-link">Dashboard</Link></li> : null}
                        {getUserToken && getUserData.name === "parent"? <li><Link to={"/survey"} className="nav-link survey-link">Survey</Link></li> : null}
                        {getUserToken ? <li><Link to={"/study/module"} className="nav-link active-link">Study Fun</Link></li> :null}
                        {getUserToken && autism_level <= 60 ? <li><Link to={"/communication/low/module"} className="nav-link comm-link">Talk Time</Link></li> : null}
                        {getUserToken && autism_level > 60 ? <li><Link to={"/communication/high/module"} className="nav-link comm-link">Talk Time</Link></li> : null}
                        {getUserToken ? <li><Link to={"/test/module"} className="nav-link test-link">Fun Quiz</Link></li> : null}
                    </ul>
                </nav>
            </header>

            {autism_level <= 60 ? (
                <main className="low-level-main">
                    <div className="welcome-banner">
                        <div className="welcome-text">
                            <h2>Welcome to your Learning Adventure!</h2>
                            <p>Let's explore and learn together! Click on any activity below to start.</p>
                        </div>
                    </div>

                    <section className="content-section stories-section">
                        <div className="section-header">
                            <FaBook className="section-icon" />
                            <h3>Magical Stories</h3>
                        </div>
                        <div className="stories-container">
                            {stories.map((story, index) => (
                                <div key={index} className="story-card">
                                    <h3 
                                        className={`story-title ${activeStory === index ? 'active' : ''}`} 
                                        onClick={() => toggleStory(index)}
                                    >
                                        <span className="star-icon"><FaStar /></span> {story.title}
                                    </h3>
                                    <div className={`story-content ${activeStory === index ? 'active' : 'hidden'}`}>
                                        <p>{story.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="content-section math-section">
                        <div className="section-header">
                            <div className="section-icon-container math-icon">123</div>
                            <h3>Fun Math Adventures</h3>
                        </div>
                        <div className="lesson-intro">
                            <h4>Exciting Math for Young Explorers</h4>
                            <p>Join us for 3 amazing math adventures!</p>
                        </div>
                        <div className="video-grid">
                            <div className="video-card">
                                <div className="video-title">Counting Fun</div>
                                <a href="https://www.youtube.com/watch?v=DhdWV5bJ3lY&list=PLRleA8QD1EPzK3n7kPpNJSlT4X8N-s_Jk" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 1</span>
                                </a>
                            </div>
                            
                            <div className="video-card">
                                <div className="video-title">Number Friends</div>
                                <a href="https://www.youtube.com/watch?v=LBaYB2h5d5c&list=PLRleA8QD1EPzK3n7kPpNJSlT4X8N-s_Jk&index=3" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 2</span>
                                </a>
                            </div>
                            
                            <div className="video-card">
                                <div className="video-title">Shape Safari</div>
                                <a href="https://www.youtube.com/watch?v=au3BvPLymHM&list=PLRleA8QD1EPzK3n7kPpNJSlT4X8N-s_Jk&index=2" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 3</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="content-section science-section">
                        <div className="section-header">
                            <div className="section-icon-container science-icon">🔬</div>
                            <h3>Science Discovery Zone</h3>
                        </div>
                        <div className="lesson-intro">
                            <h4>Amazing Science for Curious Minds</h4>
                            <p>Explore the world through 3 exciting science videos!</p>
                        </div>
                        <div className="video-grid">
                            <div className="video-card">
                                <div className="video-title">Animal Friends</div>
                                <a href="https://www.youtube.com/watch?v=b5NK4CXI4GQ" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 1</span>
                                </a>
                            </div>
                            
                            <div className="video-card">
                                <div className="video-title">Plant Magic</div>
                                <a href="https://www.youtube.com/watch?v=lv6dC0coQeI" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 2</span>
                                </a>
                            </div>
                            
                            <div className="video-card">
                                <div className="video-title">Weather Wonders</div>
                                <a href="https://www.youtube.com/watch?v=BnQnXN0y8P0" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 3</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="content-section english-section">
                        <div className="section-header">
                            <div className="section-icon-container english-icon">ABC</div>
                            <h3>Language Treasure Chest</h3>
                        </div>
                        <div className="lesson-intro">
                            <h4>English Adventures for Word Explorers</h4>
                            <p>Discover the joy of language with these fun videos!</p>
                        </div>
                        <div className="video-grid">
                            <div className="video-card">
                                <div className="video-title">Letter Friends</div>
                                <a href="https://www.youtube.com/watch?v=BeWWyjZqRyE" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 1</span>
                                </a>
                            </div>
                            
                            <div className="video-card">
                                <div className="video-title">Word Magic</div>
                                <a href="https://www.youtube.com/watch?v=RiYzD1h-YVQ" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 2</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            ) : (
                <main className="high-level-main">
                    <div className="welcome-banner">
                        <div className="welcome-text">
                            <h2>Welcome to your Learning Journey!</h2>
                            <p>Let's practice important skills together! Check off your tasks as you complete them.</p>
                        </div>
                    </div>

                    <section className="content-section routine-section">
                        <div className="section-header">
                            <FaCheck className="section-icon" />
                            <h3>My Daily Activities</h3>
                        </div>
                        <div className="checklist-container">
                            <div className="checklist-item">
                                <input 
                                    type="checkbox" 
                                    id="checkbox1" 
                                    className="custom-checkbox" 
                                    disabled={data?.checkbox1?.checked} 
                                    name="checkbox1" 
                                    onChange={handleCheck} 
                                    checked={data?.checkbox1?.checked || false}
                                />
                                <label htmlFor="checkbox1" className="checkbox-label">
                                    <span className="checkbox-icon"></span>
                                    <span className="checkbox-text">Brushing my teeth</span>
                                </label>
                            </div>
                            
                            <div className="checklist-item">
                                <input 
                                    type="checkbox" 
                                    id="checkbox2" 
                                    className="custom-checkbox" 
                                    disabled={data?.checkbox2?.checked} 
                                    name="checkbox2" 
                                    onChange={handleCheck}
                                    checked={data?.checkbox2?.checked || false}
                                />
                                <label htmlFor="checkbox2" className="checkbox-label">
                                    <span className="checkbox-icon"></span>
                                    <span className="checkbox-text">Praying</span>
                                </label>
                            </div>
                        </div>
                    </section>

                    <section className="content-section traffic-section">
                        <div className="section-header">
                            <FaTrafficLight className="section-icon" />
                            <h3>Crossing the Street Safely</h3>
                        </div>
                        <div className="traffic-content">
                            <div className="traffic-image">
                                <div className="traffic-light">
                                    <div className="light red"></div>
                                    <div className="light yellow"></div>
                                    <div className="light green"></div>
                                </div>
                            </div>
                            <div className="traffic-steps">
                                <div className="step">
                                    <div className="step-number">1</div>
                                    <div className="step-text"><strong>Look both ways:</strong> Make eye contact with drivers before crossing.</div>
                                </div>
                                <div className="step">
                                    <div className="step-number">2</div>
                                    <div className="step-text"><strong>Use push buttons:</strong> If available, use push buttons to activate the walk signal.</div>
                                </div>
                                <div className="step">
                                    <div className="step-number">3</div>
                                    <div className="step-text"><strong>Cross on red:</strong> When the light is red, vehicles must stop so you can cross safely.</div>
                                </div>
                                <div className="step">
                                    <div className="step-number">4</div>
                                    <div className="step-text"><strong>Wait on green:</strong> When the light is green for cars, wait until it's safe to cross.</div>
                                </div>
                                <div className="step">
                                    <div className="step-number">5</div>
                                    <div className="step-text"><strong>Use crosswalks:</strong> Always cross at zebra crossings when available.</div>
                                </div>
                                <div className="step">
                                    <div className="step-number">6</div>
                                    <div className="step-text"><strong>Wait for cars to stop:</strong> Make sure all vehicles have stopped before crossing.</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="content-section picture-section">
                        <div className="section-header">
                            <FaImage className="section-icon" />
                            <h3>Picture Learning</h3>
                        </div>
                        <div className="lesson-intro">
                            <h4>Learning with Pictures</h4>
                            <p>Pictures help us understand the world better!</p>
                        </div>
                        <div className="video-grid">
                            <div className="video-card">
                                <div className="video-title">Everyday Objects</div>
                                <a href="https://www.youtube.com/watch?v=4YDA7peyYJ8" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 1</span>
                                </a>
                            </div>
                            
                            <div className="video-card">
                                <div className="video-title">People & Places</div>
                                <a href="https://www.youtube.com/watch?v=5NGm88IRcL8" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Lesson 2</span>
                                </a>
                            </div>
                        </div>
                    </section>

                    <section className="content-section rhymes-section">
                        <div className="section-header">
                            <FaMusic className="section-icon" />
                            <h3>Fun Rhymes</h3>
                        </div>
                        <div className="lesson-intro">
                            <h4>Sing Along with Rhymes!</h4>
                            <p>Music and rhymes help us learn and have fun!</p>
                        </div>
                        <div className="video-grid">
                            <div className="video-card">
                                <div className="video-title">Favorite Rhymes</div>
                                <a href="https://www.youtube.com/watch?v=EVIJd4MGlG4" target="_blank" className="video-link">
                                    <div className="video-thumbnail">
                                        <div className="play-icon"><FaYoutube /></div>
                                    </div>
                                    <span>Watch Rhymes</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            )}

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

                    .study-module-container {
                        max-width: 1200px;
                        margin: 0 auto;
                        padding: 20px;
                    }

                    /* Header Styling */
                    .study-header {
                        background: linear-gradient(135deg, #6e45e2 0%, #88d3ce 100%);
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

                    .study-header h2 {
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
                        color: #6e45e2;
                    }

                    .register-link { background-color: rgba(255, 102, 102, 0.7); }
                    .dashboard-link { background-color: rgba(102, 204, 255, 0.7); }
                    .survey-link { background-color: rgba(255, 204, 102, 0.7); }
                    .comm-link { background-color: rgba(153, 102, 255, 0.7); }
                    .test-link { background-color: rgba(102, 255, 153, 0.7); }

                    /* Welcome Banner */
                    .welcome-banner {
                        background: linear-gradient(135deg, #FFD3A5 0%, #FD6585 100%);
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

                    .section-icon, .section-icon-container {
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

                    .stories-section .section-icon {
                        background-color: #FF6B6B;
                    }

                    .routine-section .section-icon {
                        background-color: #4ECDC4;
                    }

                    .traffic-section .section-icon {
                        background-color: #FF9F1C;
                    }

                    .picture-section .section-icon {
                        background-color: #7209B7;
                    }

                    .rhymes-section .section-icon {
                        background-color: #4361EE;
                    }

                    .section-icon-container.math-icon {
                        background-color: #FCBF49;
                        font-family: 'Bubblegum Sans', cursive;
                    }

                    .section-icon-container.science-icon {
                        background-color: #06D6A0;
                        font-family: 'Bubblegum Sans', cursive;
                        font-size: 1.8rem;
                    }

                    .section-icon-container.english-icon {
                        background-color: #118AB2;
                        font-family: 'Bubblegum Sans', cursive;
                    }

                    .content-section h3 {
                        font-family: 'Bubblegum Sans', cursive;
                        font-size: 2rem;
                        color: #444;
                    }

                    /* Stories Section */
                    .stories-container {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                        gap: 20px;
                    }

                    .story-card {
                        background-color: #f9f9f9;
                        border-radius: 15px;
                        overflow: hidden;
                        transition: all 0.3s ease;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    }

                    .story-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    }

                    .story-title {
                        padding: 15px;
                        cursor: pointer;
                        background: linear-gradient(135deg, #FF7676 0%, #F54EA2 100%);
                        color: white;
                        font-size: 1.3rem;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        transition: all 0.3s ease;
                    }

                    .story-title.active {
                        background: linear-gradient(135deg, #F54EA2 0%, #FF7676 100%);
                    }

                    .star-icon {
                        margin-right: 10px;
                        font-size: 1rem;
                    }

                    .story-content {
                        padding: 15px;
                        line-height: 1.6;
                        background-color: #fff;
                        border-top: none;
                        border-radius: 0 0 15px 15px;
                        font-size: 1.1rem;
                    }

                    .story-content.hidden {
                        display: none;
                    }

                    .story-content.active {
                        display: block;
                        animation: fadeIn 0.5s ease;
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    /* Lesson Introduction */
                    .lesson-intro {
                        margin-bottom: 20px;
                        padding: 15px;
                        background-color: #f9f9f9;
                        border-radius: 15px;
                    }

                    .lesson-intro h4 {
                        font-family: 'Bubblegum Sans', cursive;
                        font-size: 1.5rem;
                        color: #444;
                        margin-bottom: 5px;
                    }

                    .lesson-intro p {
                        font-size: 1.1rem;
                    }

                    /* Video Grid */
                    .video-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                        gap: 20px;
                    }

                    .video-card {
                        background-color: #f9f9f9;
                        border-radius: 15px;
                        overflow: hidden;
                        transition: all 0.3s ease;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                    }

                    .video-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    }

                    .video-title {
                        padding: 15px;
                        background: linear-gradient(135deg, #3A86FF 0%, #5E60CE 100%);
                        color: white;
                        font-size: 1.2rem;
                        font-weight: bold;
                        text-align: center;
                    }

                    .video-thumbnail {
                        height: 150px;
                        background-color: #eee;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: relative;
                    }

                    .play-icon {
                        font-size: 3rem;
                        color: #FF0000;
                        opacity: 0.8;
                        transition: all 0.3s ease;
                    }

                    .video-link {
                        display: block;
                        text-decoration: none;
                        color: #333;
                        text-align: center;
                    }

                    .video-link span {
                        display: block;
                        padding: 10px;
                        background-color: #f1f1f1;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    }

                    .video-link:hover .play-icon {
                        transform: scale(1.2);
                        opacity: 1;
                    }

                    .video-link:hover span {
                        background-color: #e1e1e1;
                    }

                    /* Routine Section - Checklist */
                    .checklist-container {
                        padding: 15px;
                    }

                    .checklist-item {
                        margin-bottom: 15px;
                        display: flex;
                        align-items: center;
                    }

                    .custom-checkbox {
                        display: none;
                    }

                    .checkbox-label {
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        user-select: none;
                    }

                    .checkbox-icon {
                        width: 30px;
                        height: 30px;
                        border: 3px solid #4ECDC4;
                        border-radius: 10px;
                        display: inline-block;
                        position: relative;
                        margin-right: 15px;
                        transition: all 0.2s ease;
                    }

                    .checkbox-text {
                        font-size: 1.3rem;
                    }

                    .custom-checkbox:checked + .checkbox-label .checkbox-icon {
                        background-color: #4ECDC4;
                    }

                    .custom-checkbox:checked + .checkbox-label .checkbox-icon:after {
                        content: '✓';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: white;
                        font-size: 1.5rem;
                    }

                    .custom-checkbox:disabled + .checkbox-label {
                        cursor: not-allowed;
                    }

                    .custom-checkbox:checked:disabled + .checkbox-label .checkbox-icon {
                        background-color: #b8e9e5;
                        border-color: #b8e9e5;
                    }

                    /* Traffic Light Section */
                    .traffic-content {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 30px;
                    }

                    .traffic-image {
                        flex: 1;
                        min-width: 200px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .traffic-light {
                        width: 100px;
                        height: 250px;
                        background-color: #333;
                        border-radius: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: space-evenly;
                        padding: 15px 0;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    }

                    .light {
                        width: 70px;
                        height: 70px;
                        border-radius: 50%;
                        box-shadow: inset 0 5px 10px rgba(0,0,0,0.3);
                    }

                    .red {
                        background-color: #FF5252;
                        animation: glow-red 2s infinite alternate;
                    }

                    .yellow {
                        background-color: #FFD740;
                    }

                    .green {
                        background-color: #69F0AE;
                    }

                    @keyframes glow-red {
                        from { box-shadow: 0 0 10px 5px rgba(255, 82, 82, 0.2); }
                        to { box-shadow: 0 0 20px 10px rgba(255, 82, 82, 0.4); }
                    }

                    .traffic-steps {
                        flex: 2;
                        min-width: 300px;
                    }

                    .step {
                        display: flex;
                        margin-bottom: 15px;
                        align-items: center;
                    }

                    .step-number {
                        width: 30px;
                        height: 30px;
                        background-color: #FF9F1C;
                        color: white;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        margin-right: 15px;
                        flex-shrink: 0;
                    }

                    .step-text {
                        font-size: 1.1rem;
                        line-height: 1.4;
                    }

                    /* Responsive Design */
                    @media (max-width: 768px) {
                        .study-header h2 {
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

                        .stories-container {
                            grid-template-columns: 1fr;
                        }

                        .video-grid {
                            grid-template-columns: 1fr;
                        }

                        .traffic-content {
                            flex-direction: column;
                        }

                        .traffic-image {
                            justify-content: center;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default StudyModule;