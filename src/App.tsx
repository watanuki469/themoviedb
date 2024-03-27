import MainLayout from "./components/layout/MainLayout";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          {/* <Route path="/popurarity" element={<PopurarityDashBoard />} />
            <Route path="/movie/byGen/:genre" element={<MovieLayout />} />
            <Route path="/movie/id/:imdb_id" element={<SingleMovie />} />
            <Route path='*' element={<NotFound />} />
            <Route path='IMDbPro' element={<Pro />} />
            <Route path='WatchList' element={<WatchList />} />
            <Route path='Popular' element={<PopularDashBoard />} />
            <Route path='/actor/id/:imdb_id' element={<StarLayout />} /> */}
        </Routes>
      </div>

  )
}

export default App
