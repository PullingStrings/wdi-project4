import React from 'react';
import ReactDOM from 'react-dom';



import {BrowserRouter as Router, Link } from 'react-router-dom';

import Navbar from './components/utility/NavBar';
import Routes from './components/utility/Routes';

import 'bootstrap-css-only';
import './scss/style.scss';


class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="containerIndex">
          <div className="boxMiddle">
            <h1><Link to="/">Play-Gen</Link></h1>
            <h2>Find playlists from people around you</h2>
            <Navbar />
            <Routes />
          </div>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Link } from 'react-router-dom';
//
// import Routes from './components/utility/Routes';
// import Navbar from './components/utility/NavBar';
//
// import 'bootstrap-css-only';
// import './scss/style.scss';
//
// class App extends React.Component {
//
//   render() {
//     return (
//       <Router>
//         <div className="container">
//           <header>
//             <h1><Link to="/">Beer.Drink</Link></h1>
//             <h2>Real international beer....</h2>
//             <Navbar />
//             <hr />
//           </header>
//           <main>
//             <Routes />
//           </main>
//         </div>
//       </Router>
//     );
//   }
// }
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('app')
// );
