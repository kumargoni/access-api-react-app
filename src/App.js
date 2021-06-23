import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Link } from 'react-router-dom';
import MoreInfo from './moreinfo';
import './App.css';

function App() {

  const content = useSelector(state => state.beers);
  const dispatch = useDispatch();

  // Fetch data from API
  function getData() {
    return dispatch => {
      axios.get("https://api.punkapi.com/v2/beers")
        .then(res => dispatch({
          type: "FETCH_BEERS",
          data: res
        }));
    };
  }

  function onFetchData() {
    dispatch(getData());
  }

  return (
    <div className="App">
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Beers</h1>
          <p className="lead text-muted">
            Beer is one of the oldest and most widely consumed alcoholic drinks in the world,
            and the third most popular drink overall after water and tea. Beer is brewed from
            cereal grains—most commonly from malted barley, though wheat, maize, rice, and oats are also used.
          </p>
          < button onClick={onFetchData} className="btn btn-primary my-2">Fetch Data</button>
        </div>
      </section>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {/* Display data from API*/}
            {content.data && content.data.map((beers, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <div className="card mb-4 box-shadow">
                    <img className="card-img-top img-logo" src={beers.image_url} alt={beers.name} />
                    <div className="card-body">
                      <h2>{beers.name}</h2>
                      <h6>{beers.tagline}</h6>
                      <p className="card-text">{beers.description}</p>
                      <div >
                        {beers.food_pairing.map((fp, fi) => {
                          return (<p key={fi}> - {fp}</p>)
                        })}
                      </div>
                      <div>
                        <Link to="/moreinfo">More Details</Link>
                        <Switch>
                          <Route path="/moreinfo" component={MoreInfo} />
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
