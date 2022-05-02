import React, { useEffect, useState } from 'react'
import "../styles/Home.scss";
import NavigationIcon from '@mui/icons-material/Navigation';
import SearchIcon from '@mui/icons-material/Search';
import { geocodingSearch } from '../utils/connection';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation, getLocationUser, getListFavorites } from '../Redux/actions/location';
import ContentInfoWeather from './ContentInfoWeather';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { db } from '../utils/firebaseConfig';


function Home() {
  const dispatch = useDispatch()
  const infoWeather = useSelector(state => state.location.weather)
  const city = useSelector(state => state.location.city)
  const listFavorites = useSelector(state => state.location.list)
  const isAuth = useSelector(state => state.user.isAuth)
  const [listSuggestion, setListSuggestion] = useState([])
  const [valueInput, setValueInput] = useState(city)

  useEffect(() => {
    dispatch(getLocationUser())
    if (isAuth) dispatch(getListFavorites())
  }, [isAuth])

  useEffect(() => {
    setValueInput(city)
  }, [city])

  const getSuggestion = async (e) => {
    setValueInput(e.target.value)
    const list = await geocodingSearch(e.target.value)
    setListSuggestion(list)
  }

  const selectedCity = (item) => {
    console.log('item >>> ', item)
    setValueInput(item.place_name_es)
    setListSuggestion([])
    dispatch(setLocation(item.center, item.place_name_es))
  }
  
  const saveCity = async () => {
    try {
      console.log('valueInput >>> ', valueInput)
      await addDoc(collection(db, 'favorites'), {
        city: valueInput,
        details: infoWeather,
        dateSave: Timestamp.now()
      })
      dispatch(getListFavorites())
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetLocation = () => dispatch(getLocationUser())

  return (
    <div className='content'>
      <div className='searchBar'>
        <button className='Homebuttons' onClick={handleGetLocation}>
          <NavigationIcon className='navigationIcon' />
        </button>
        <div>
          <input className='HomeInputs' onChange={e => getSuggestion(e)} value={valueInput} />
          {listSuggestion.length > 0 && (
            <div className='listSuggestion'>
              {listSuggestion.map((item, index) => (
                <a key={index} onClick={() => selectedCity(item)}>
                  <p>{item.place_name_es}</p>
                </a>
              ))}
            </div>
          )}
        </div>
        <button className='Homebuttons'>
          <SearchIcon />
        </button>
        <div className='configs'>
          <button className='Homebuttons'>F,mph</button>
          <button className='Homebuttons'>Lenguage</button>
        </div>
      </div>
      {infoWeather ? <ContentInfoWeather /> : "Cargando"}

      {isAuth && (
        <div className='citySaved'>
          <h2>Favorites</h2>
          <div>
            <Button onClick={saveCity} startIcon={<AddCircleOutlineIcon />}>
              <p>Save this city</p>
            </Button>
          </div>
          <div>
            <ul>
              {listFavorites.map((item, index) => (
                <li key={index}>
                  <p>{item.city}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  )
}

export default Home