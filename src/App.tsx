import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Store } from './Store'
function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store)

  React.useEffect(() => {
    state.episodes.length === 0 && fetchData()
  })


  const fetchData = async () => {
    const URL = "https://api.tvmaze.com/people/1/castcredits?embed=show"
    const data = await fetch(URL)
    const dataJSON = await data.json()
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON
    })

  }

  const toggleFav = (movie: any) => {
    const newList = state.favorites.filter((_movie: any) => { 
      return movie._embedded.show.id !== _movie._embedded.show.id 
    })
    console.log(newList)
    if (newList.length == 0 && state.favorites.length > 0) {
      dispatch({
        type: "REMOVE_FAV",
        payload: newList
      })
    }
    else {
      dispatch({
        type: "ADD_FAV",
        payload: movie
      })
    }
  }
  console.log(state)
  return (
    <React.Fragment>
      <div>
        {/* {console.log(store)} */}
        <h1>Rick and Morty</h1>
        <p>Pick your fav episodes</p>

        {state.episodes.map((e: any) => {
          let show = e._embedded.show
          return (
            <section style={{ borderBottom: 10, marginBottom: 20, borderBottomColor: "red" }} key={show.id}>
              <img src={show.image && show.image.medium && show.image.medium} alt="" />
              <div>{show.name}</div>
              <section dangerouslySetInnerHTML={{ __html: show.summary }}>
              </section>
              <button onClick={() => toggleFav(e)}>{state.favorites.find((e: any)=> e._embedded.show.id == show.id) ? 'UnFav' : 'Favorite' }</button>
            </section>
          )
        })}
      </div>
    </React.Fragment>
  );
}

export default App;
