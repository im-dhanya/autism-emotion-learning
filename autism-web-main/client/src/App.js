import {Route,Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Registerpage from "./Credentials/RegisterPage";
import Loginpage from "./Credentials/LoginPage";
import Awareness from "./Awareness";
import Survey from "./Survey";
import StudyModule from "./StudyModule";
import './Style.css';
import CommunicationLowModule from "./CommunicationLow";
import CommunicationHighModule from "./CommunicationHigh";
import TestModule from "./TestModule";
import Prediction from "./Prediction";
import Parent from "./Parent";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Registerpage/>} />
      {/* <Route path="/login" element={<Loginpage/>} /> */}
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/awareness" element={<Awareness/>} />
      <Route path="/survey" element={<Survey/>} />
      <Route path="/study/module" element={<StudyModule/>} />
      <Route path="/communication/low/module" element={<CommunicationLowModule/>} />
      <Route path="/communication/high/module" element={<CommunicationHighModule/>} />
      <Route path="/test/module" element={<TestModule/>} />
      <Route path="/prediction" element={<Prediction/>} />
      <Route path="/parent" element={<Parent/>} />
    </Routes>
    </>
  );
}

export default App;
