import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => { // 데이터가 불러와질 때까지 기다리기!
	//async, await -> 이 함수는 비동기화임. 너는 데이터가 뜰때까지 기달려야 해 라는 뜻
    const {
      data: {
        data: { movies }
      }
    } = await axios.get( //아래 사이트의 API를 활용해서 movies 배열에 정보 넣기
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() { //컴포넌트가 만들어지고 첫 렌더링을 다 마친 후 실행되는 메소드
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;