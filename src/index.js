import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutBar from "./main_pages/LayoutBar";
import Homepage from "./main_pages/Homepage"
import ArrivalTimes from "./main_pages/ArrivalTimes"
  import BusNumber from "./main_pages/ArrivalTimes/BusNumber";
  import BusStop from "./main_pages/ArrivalTimes/BusStop";
  import NearMe from "./main_pages/ArrivalTimes/NearMe";
  import StopNumber from "./main_pages/ArrivalTimes/StopNumber";
import TravelTimeEST from "./main_pages/TravelTimeEST"
  import FindRoutes from "./main_pages/TravelTimeEST/FindRoutes";
  import SavedRoutes from "./main_pages/TravelTimeEST/SavedRoutes";
import Login from "./main_pages/Login"
import Register from "./main_pages/Register"
import NoPage from "./main_pages/NoPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutBar />} >
          {/*End of branch of LayoutBar*/}
          <Route index element={<Homepage />} />
          <Route path="arrivaltimes" element={<ArrivalTimes />} >
            {/*Start of branch of ArrivalTimes*/}
            <Route path="busnumber" element={<BusNumber />} />
            <Route path="busstop" element={<BusStop />} />
            <Route path="stopnumber" element={<StopNumber />} />
            <Route path="nearme" element={<NearMe />} />
          </Route> {/*End of branch of ArrivalTimes*/}
          <Route path="traveltimeest" element={<TravelTimeEST />} >
            {/*Start of branch of TravelTimeEST*/}
            <Route path="findroutes" element={<FindRoutes />} />
            <Route path="savedroutes" element={<SavedRoutes />} />
          </Route> {/*End of branch of TravelTimeEST*/}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoPage />} />
        </Route> {/*End of branch of LayoutBar*/}
      </Routes> 
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);