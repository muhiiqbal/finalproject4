import { useNavigate } from "react-router-dom";
import { setQueryID } from "./../redux/movieSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovieDetail } from "./../redux/movieSlice";

const MovieComponent = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errorState } = useSelector((state) => state.movie);

  const pressHandler = async (id) => {
    await navigate(`/movie/${id}`);
    await dispatch(setQueryID(id));
    dispatch(fetchMovieDetail(id));
  };

  const renderMovie = (list) => {
    const renderResults = [];
    for (var i = 0; i < list.length; i += 4) {
      renderResults.push(
        <div className="container">
          <div class="d-flex  justify-content-center">
            {list.slice(i, i + 4).map((movie) => (
              <>
                <div class="row  m-2">
                  <div class="col">
                    <div class="card " onClick={() => pressHandler(movie.imdbID)}>
                      <img src={movie.Poster} class="card-img-top" alt="gambar" />
                      <div class="card-body">
                        <h5 class="card-title">{movie.Title} {movie.Year}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          ,
        </div>,
      );
    }
    return renderResults;
  };

  return errorState ? (
    <div class="container mt-5">
      <div class="alert alert-danger d-flex align-items-center" role="alert">
        <div>Movie Not Found!</div>
      </div>
    </div>
  ) : (
    renderMovie(data)
  );
};

export default MovieComponent;
