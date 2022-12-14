import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovie } from "./redux/movieSlice";
import SearchComponent from "./components/SearchComponent";
import MovieComponent from "./components/MovieComponent";
import MoviePage from "./pages/moviePage";
import NavbarComponent from "./components/NavbarComponent";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { data, loadingState, queryID } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(fetchMovie("the last"));
  }, []);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      if (input !== "") {
        if (window.location.pathname !== "/") {
          navigate("/");
        }
        dispatch(fetchMovie(input));
      }
    }
  };
  return (
    <div className="App">
      <nav class="navbar-container navbar navbar-expand-lg bg-light">
        <div class="container">
          <div class="right row col-sm-8">
            <NavbarComponent />
          </div>
          <div class="left col-sm-4 justify-content-end d-flex">
            <SearchComponent active={input !== "" ? true : false} onChange={(e) => inputHandler(e)} onClear={() => setInput("")} value={input} onEnter={(e) => enterHandler(e)} className="W-50 form-control ms-5" />
          </div>
        </div>
      </nav>
      {loadingState ? (
        <div class="spinner-border text-primary mt-5" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<MovieComponent data={data} />} />
          <Route path={`/movie/${queryID}`} element={<MoviePage />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
