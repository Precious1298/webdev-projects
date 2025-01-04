import { useReducer } from 'react';
import DestinationCard from './components/DestinationCard';
import SearchBar from './components/SearchBar';
import { useDebounce } from './fetchingFunctions/useDebounce';
import DestinationInformation from './components/DestinationInformation';
import useFetchDataApi from './fetchingFunctions/useFetchDataApi';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

const initialState = {
  destinationInformation: [],
  hotelInformation: [],
  flightInformation: [],
  weatherInformation: [],
  keyword: '',
  loadingState: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'destinationData':
      return {
        ...state,
        destinationInformation: action.payload,
      };
    case 'hotelOffers':
      return {
        ...state,
        hotelInformation: action.payload,
      };
    case 'flightOffers':
      return {
        ...state,
        flightInformation: action.payload,
      };
    case 'weatherData':
      return {
        ...state,
        weatherInformation: action.payload,
      };
    case 'search':
      return {
        ...state,
        keyword: action.payload.toUpperCase(),
      };

    case 'setLoadingState':
      return {
        ...state,
        loadingState: action.payload,
      };
    default:
      throw new Error('Action is unknown');
  }
}

const URLDESTINATION = `https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=`;

function App() {
  const [{ destinationInformation, keyword, loadingState }, dispatch] =
    useReducer(reducer, initialState);

  const debouncedKeyword = useDebounce(keyword, 1000);
  useFetchDataApi(URLDESTINATION, debouncedKeyword, dispatch, {
    dataActionType: 'destinationData',
    loadingActionType: 'setLoadingState',
  });

  return (
    <div className='w-[calc(100vw-40px)] h-[calc(100vh-40px)] bg-sky-400 mx-auto my-5 rounded-md flex flex-col items-center gap-5 overflow-y-auto'>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route
              index
              element={
                <>
                  <SearchBar dispatch={dispatch} />
                  <DestinationCard
                    keyword={keyword}
                    information={destinationInformation}
                    loadingState={loadingState}
                    dispatch={dispatch}
                  />
                </>
              }
            />

            <Route
              path='destination/:city/:cityCode'
              element={<DestinationInformation dispatch={dispatch} />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;