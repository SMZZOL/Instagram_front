import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Home from "./features/feeds/Home";
import { Routes, Route } from "react-router-dom";
import AddStory from "./features/stories/AddStory";
import AddFeed from "./features/feeds/AddFeed/AddFeed"
import Register from "./features/users/Register";
import Profile from "./features/users/Profile";
import Login from "./features/auth/Login";
import ProfileWithId from "./features/users/ProfileWithId";
import SearchUser from "./features/users/SearchUser";
import Authcheck from "./features/auth/Authcheck";


function App() {
  return (
    <Routes>
      <Route element={<Authcheck/>}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile">
            <Route index element={<Profile/>}/>
            <Route path=":id" element={<ProfileWithId/>}/>
          </Route>
          <Route path="searchUser" element={<SearchUser/>}/>
        </Route>
          <Route path="addFeed" element={<AddFeed />} />  
          <Route path="addstory" element={<AddStory />} />  
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
