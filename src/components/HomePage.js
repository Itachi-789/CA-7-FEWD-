import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'
import axios from 'axios'
import sadFace from './images/sadFace.png'

const HomePage = () => {
  const [Data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState(true);
  var displayName = sessionStorage.getItem("Name");

  const SearchedData = () => {
    var dataToAppend = [];
    Data.forEach((item) => {
      item.books.map((bookData) => {
        if (
          (bookData.title.toLowerCase().startsWith(query.toLowerCase()) &&
            !dataToAppend.includes(bookData)) ||
          (bookData.author.toLowerCase().startsWith(query.toLowerCase()) &&
            !dataToAppend.includes(bookData))
        ) {
          dataToAppend.push(
            <Book
              key={bookData.amazon_product_url}
              title={bookData.description}
              source={bookData.book_image}
              label={bookData.title}
              Author={bookData.author}
            />
          );
        }
      });
    });
    if (dataToAppend.length !== 0) {
      return <div id="bookCollectionGrid">{dataToAppend}</div>;
    } else {
      return (
        <div id="NoresultSpace">
          <h1>Sorry, No Results <span>:(</span></h1>
          <img src={sadFace} alt="" />
        </div>
      );
    }
  };
  useEffect(() => {
    axios
      .get(
        "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=WankjAhcmyxxdC7X9B0G88QmqIQY2Z26"
      )
      .then((res) => {
        setData(res.data.results.lists);
        console.log(res.data.results.lists);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
   const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
    if (search !== "") {
      setQuery(search);
      setSearchStatus(false);
    } else if (search === "") {
      setQuery(search);
      setSearchStatus(true);
    }
  };
  console.log(displayName === null);

  return searchStatus ? (
    <>
        <header>
          <h1>Kalvium Books</h1>
          <div className="searchField">
            <input type="text" value={search} placeholder="Type your book name" onChange={handleChange}/>
            <button id='buttonOnClick' onClick={handleClick}>Search</button>
          </div>
          {displayName === null ? (
          <Link to="form">
            <button id="register">Register Now</button>
          </Link>
        ) : (
          <div className="welcomeText">
            <h2>Hey {displayName}</h2>
          </div>
        )}
        </header>
        <div id="bookCollectionGrid">
        {Data.map((item) =>
          item.books.map((bookData) => (
            <Book
              key={bookData.amazon_product_url}
              title={bookData.description}
              source={bookData.book_image}
              label={bookData.title}
              Author={bookData.author}
            />
          ))
        )}
      </div>
      <footer id='footer'>
        <h2>Made by Vighnesh</h2>
      </footer>
    </>
  ) : (
    <>
      <header>
        <h1>Kalvium Books</h1>
        <div className="searchField">
          <input
            type="text"
            value={search}
            placeholder="Type your book name"
            onChange={handleChange}
          />
          <button id="buttonOnclick" onClick={handleClick}>
            Search
          </button>
        </div>
        {displayName === null ? (
          <Link to="form">
            <button>Register Now</button>
          </Link>
        ) : (
          <div className="welcomeText">
            <h5>Hey {displayName}</h5>
          </div>
        )}
      </header>
      {SearchedData()}
      <hr />
      <footer id='footer'>
        <span><h2>Made by Vighnesh</h2></span>
      </footer>
    </>
  )
}

export default HomePage
