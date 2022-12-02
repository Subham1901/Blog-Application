import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import UserList from "./components/users/UserList";
// import MainHeader from "./components/Navigation/MainHeader";
// import PlaceList from "./components/places/PlaceList";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";

// import ErrorPage from "./components/Auth/ErrorPage";
// import NewPlace from "./components/places/Add Places/NewPlace";
// import UserPlaces from "./components/places/UserPlaces";
// import UpdatePlace from "./components/places/Add Places/UpdatePlace";
import { authContext } from "./components/Auth/AuthContext";
import { useAuth } from "./components/hooks/auth-hook";
import React, { Suspense } from "react";
import { Box, Center, Spinner } from "@chakra-ui/react";
import Footer from "./components/Navigation/Footer";

//! lazy loading...

const UserList = React.lazy(() => import("./components/users/UserList"));
const MainHeader = React.lazy(() =>
  import("./components/Navigation/MainHeader")
);
const PlaceList = React.lazy(() => import("./components/places/PlaceList"));
const Login = React.lazy(() => import("./components/Auth/Login"));
const Signup = React.lazy(() => import("./components/Auth/Signup"));
const ErrorPage = React.lazy(() => import("./components/Auth/ErrorPage"));
const NewPlace = React.lazy(() =>
  import("./components/places/Add Places/NewPlace")
);
const UserPlaces = React.lazy(() => import("./components/places/UserPlaces"));
const UpdatePlace = React.lazy(() =>
  import("./components/places/Add Places/UpdatePlace")
);

function App() {
  const { token, userId, login, logout, userName } = useAuth();
  let routes;

  if (token) {
    routes = (
      <>
        <Route path="/" element={<UserList />} />;
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/:uid/places" element={<PlaceList />} />;
        <Route path="/:uid/myplaces" element={<UserPlaces />} />;
        <Route path="*" element={<ErrorPage />} />
        <Route path="/:uid/edit" element={<UpdatePlace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/:uid/places" element={<PlaceList />} />
        <Route path="/" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </>
    );
  }

  return (
    <Suspense
      fallback={
        <Center>
          <Spinner
            mt={"20%"}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            height={100}
            width={100}
          />
        </Center>
      }
    >
      <authContext.Provider
        value={{
          isLoggedin: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
          userName: userName,
        }}
      >
        <MainHeader />

        <Routes>{routes}</Routes>
      </authContext.Provider>
      <Footer />
    </Suspense>
  );
}

export default App;
