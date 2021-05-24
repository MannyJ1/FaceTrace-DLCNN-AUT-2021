import logo from './logo.svg';
import './App.css';
import LandingPage from "./components/LandingPage/LandingPage";
import DetectFaces from "./components/DetectFaces/DetectFaces";
import StartTracing from "./components/StartTracing/StartTracing";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const App = () => {
return (
  <div className='App'>
    <Router>
      <Switch>
        {/* <Router> */}
          <Route path='/' exact component={LandingPage} />
          <Route path='/Upload' exact component={StartTracing} />
          <Route path='/Detect' exact component={DetectFaces} />
        {/* </Router> */}
      </Switch>
    </Router>
  </div>
);
}

export default App;

//// OLD CODE
// import LandingPage from "./pages/LandingPage";
// import DetectFaces from "./pages/DetectFaces";
// import StartTracing from "./pages/StartTracing";
// import "./App.css";

// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// const App = () => {
//   return (
//     <>
//       <Router>
//         <div className="App">
//           <Route exact path="/" component={LandingPage}></Route>
//           <Route exact path="/detect_faces" component={DetectFaces}></Route>
//           <Route exact path="/start_tracing" component={StartTracing}></Route>
//         </div>
//       </Router>
//     </>
//   );
// };