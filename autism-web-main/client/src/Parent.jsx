import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Parent() {
    const [datas, setDatas] = useState([]);
    const getUserToken = localStorage.getItem("token");
    const autism_level = localStorage.getItem("autism-level");
    const getUserData = JSON.parse(localStorage.getItem("userData"));

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        if (name === "") {
            alert("Please enter a name");
            setIsLoading(false);
            return;
        }

        let url = `${import.meta.env.VITE_BACKEND_URL}/api/student/${name.toUpperCase()}`;
        axios.get(url)
            .then((res) => {
                setDatas(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }

    // Cheerful child-friendly color scheme
    const colors = {
        primary: "#6A5ACD", // Slate blue
        secondary: "#FF6B88", // Pink
        tertiary: "#4FC1E9", // Sky blue
        accent: "#FFCE54", // Sunny yellow
        lightBg: "#F9F7FF", // Light lavender background
        white: "#FFFFFF",
        text: "#5D4E8D" // Dark purple text
    };

    const headerStyle = {
        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
        color: colors.white,
        padding: "25px",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(106, 90, 205, 0.4)",
        borderRadius: "0 0 30px 30px",
        marginBottom: "20px",
        fontFamily: "'Comic Sans MS', 'Bubblegum Sans', cursive"
    };

    const headerTitleStyle = {
        fontSize: "2.5rem",
        marginBottom: "10px",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
    };

    const navStyle = {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        listStyleType: "none",
        padding: "10px 0",
        margin: "0",
        flexWrap: "wrap"
    };

    const navLinkStyle = {
        textDecoration: "none",
        color: colors.white,
        fontSize: "18px",
        padding: "10px 20px",
        borderRadius: "50px",
        background: "rgba(255, 255, 255, 0.2)",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontWeight: "bold"
    };

    const contentStyle = {
        backgroundColor: colors.lightBg,
        color: colors.text,
        padding: "30px",
        margin: "20px auto",
        borderRadius: "20px",
        maxWidth: "90%",
        boxShadow: "0 10px 25px rgba(106, 90, 205, 0.15)",
        fontFamily: "'Comic Sans MS', 'Bubblegum Sans', cursive"
    };

    const formStyle = {
        backgroundColor: colors.white,
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)",
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    };

    const inputStyle = {
        padding: "15px 20px",
        borderRadius: "50px",
        border: `3px solid ${colors.tertiary}`,
        fontSize: "18px",
        width: "100%",
        maxWidth: "400px",
        outline: "none",
        transition: "all 0.3s ease",
        margin: "15px 0",
        fontFamily: "'Comic Sans MS', 'Bubblegum Sans', cursive"
    };

    const buttonStyle = {
        padding: "15px 30px",
        backgroundColor: colors.accent,
        color: colors.text,
        border: "none",
        borderRadius: "50px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        boxShadow: "0 5px 15px rgba(255, 206, 84, 0.4)",
        transition: "all 0.3s ease",
        marginTop: "20px",
        fontFamily: "'Comic Sans MS', 'Bubblegum Sans', cursive"
    };

    const resultContainerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "20px",
        marginTop: "30px"
    };

    const resultCardStyle = {
        backgroundColor: colors.white,
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        border: `3px solid ${colors.tertiary}`,
        position: "relative",
        overflow: "hidden"
    };

    const labelStyle = {
        fontSize: "20px",
        fontWeight: "bold",
        color: colors.primary,
        marginRight: "10px"
    };

    return (
        <>
            <header style={headerStyle}>
                <h2 style={headerTitleStyle}>Welcome to the Parent Dashboard! 🎈</h2>
                <p style={{ fontSize: "18px", marginBottom: "15px" }}>Check your child's progress and results</p>
                <nav>
                    <ul style={navStyle}>
                        {!getUserToken ? <li><Link to="/" style={navLinkStyle}>Register</Link></li> : null}
                        {getUserToken ? <li><Link to="/dashboard" style={navLinkStyle}>Dashboard</Link></li> : null}
                        {getUserToken ? <li><Link to="/awareness" style={navLinkStyle}>Awareness</Link></li> : null}
                        {getUserToken ? <li><Link to="/survey" style={navLinkStyle}>Survey</Link></li> : null}
                        {getUserToken && getUserData.name === "parent" ? <li><Link to="/parent" style={{...navLinkStyle, backgroundColor: colors.accent, color: colors.text}}>Parent</Link></li> : null}
                    </ul>
                </nav>
            </header>

            <main style={contentStyle}>
                <section style={formStyle}>
                    <h3 style={{ color: colors.primary, fontSize: "24px", marginBottom: "20px" }}>Find Your Child's Results</h3>
                    <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <label htmlFor="name" style={{ fontSize: "20px", fontWeight: "bold", color: colors.text }}>Child's Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            className="name" 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Enter name here" 
                            style={inputStyle} 
                        />
                        <button 
                            style={buttonStyle}
                            onMouseOver={(e) => {
                                e.target.style.transform = "scale(1.05)";
                                e.target.style.boxShadow = "0 7px 20px rgba(255, 206, 84, 0.6)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "scale(1)";
                                e.target.style.boxShadow = "0 5px 15px rgba(255, 206, 84, 0.4)";
                            }}
                        >
                            {isLoading ? "Searching..." : "Find Results 🔍"}
                        </button>
                    </form>
                </section>

                {datas.length > 0 && (
                    <section>
                        <h3 style={{ color: colors.primary, fontSize: "24px", textAlign: "center", marginBottom: "20px" }}>
                            Results for {name.toUpperCase()} 🌟
                        </h3>
                        <div style={resultContainerStyle}>
                            {datas.map((data) => (
                                <div key={data._id} 
                                    style={resultCardStyle}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = "translateY(-10px)";
                                        e.target.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = "translateY(0)";
                                        e.target.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
                                    }}
                                >
                                    <div style={{ 
                                        position: "absolute", 
                                        top: "-20px", 
                                        right: "-20px", 
                                        width: "100px", 
                                        height: "100px", 
                                        borderRadius: "50%", 
                                        backgroundColor: colors.accent, 
                                        opacity: "0.2",
                                        zIndex: "0"
                                    }}></div>
                                    <h3 style={{ color: colors.secondary, marginBottom: "15px", fontSize: "22px" }}>{data.name}'s Test</h3>
                                    <p style={{ marginBottom: "10px", fontSize: "18px" }}>
                                        <span style={labelStyle}>Score:</span> 
                                        <span style={{ 
                                            fontSize: "22px", 
                                            fontWeight: "bold", 
                                            color: data.marks > 70 ? "#27ae60" : data.marks > 50 ? "#f39c12" : "#e74c3c" 
                                        }}>
                                            {data.marks}
                                        </span>
                                    </p>
                                    <p style={{ marginBottom: "10px", fontSize: "18px" }}>
                                        <span style={labelStyle}>Date:</span> 
                                        {new Date(data.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric'
                                        })}
                                    </p>
                                    <p style={{ marginBottom: "10px", fontSize: "18px" }}>
                                        <span style={labelStyle}>ID:</span> 
                                        <span style={{ fontSize: "14px", color: "#888" }}>{data._id.substring(0, 8)}...</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {datas.length === 0 && name !== "" && !isLoading && (
                    <div style={{ 
                        textAlign: "center", 
                        padding: "30px", 
                        backgroundColor: colors.white, 
                        borderRadius: "15px", 
                        marginTop: "20px", 
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.08)" 
                    }}>
                        <p style={{ fontSize: "20px", color: colors.text }}>No results found for {name.toUpperCase()}. Please check the name and try again.</p>
                    </div>
                )}
            </main>
        </>
    );
}

export default Parent;