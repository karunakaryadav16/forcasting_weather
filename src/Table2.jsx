import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; 
import "./Tables2.css";
import {useSelector} from "react-redux"

const CitiesTable = () => {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [suggestions, setSuggestions] = useState([]); 
  const [cityNotFound, setCityNotFound] = useState(false); 
  const [error , seterror] = useState(null)
  const tableRef = useRef();
  const storevalues = useSelector((values)=>values.value)
  const arrofvalues  = [...storevalues]
  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&offset=${data.length}`;
      const response = await axios.get(url);
      setData(prevData => [...prevData, ...response.data.results]);
      setHasMore(response.data.results.length > 0);
    } catch (error) {
      seterror("")
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleContextMenu = (event, city) => {
    window.open(`/weather/${city.name}`, "_blank");
    event.preventDefault();
  };

  const filteredData = data.filter((city) =>
    city.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = tableRef.current;
    if (scrollHeight - scrollTop === clientHeight && !loading && hasMore) {
      fetchData();
    }
  };

  

  const handleSort = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };




  const sortedData = () => {
    const sortableData = [...filteredData];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  // Function to handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === "") {
      // If the input value is empty, reset the data state to its initial state
      setData([]);
      fetchData(); // Fetch initial data
    } else {
      // Generate suggestions based on filtered data
      const filteredSuggestions = data
        .filter(city => city.name.toLowerCase().includes(value.toLowerCase()))
        .map(city => city.name);
      setSuggestions(filteredSuggestions);
    }

    // Reset city not found state
    setCityNotFound(false);
  };

  // Function to handle search button click
  const handleSearch = () => {
    const filtered = sortedData();
    setData(filtered);

    // Check if filtered data is empty
    if (filtered.length === 0) {
      setCityNotFound(true);
    }
  };

  return (
    <>
      <div className="bodycontainer">

                    <div className="navcontainer">  
                    <h1>Stamurai Assignment</h1>  
                    
                     <div>   
                        <input
                          type="text"
                          value={searchValue}
                          onChange={handleChange}
                          placeholder="Search for city names.."
                          title="Type in a city name"
                          list="suggestions" 
                          className="inputstyles"
                        />

                        <button onClick={handleSearch}>search</button>
                        </div>


                    </div>
        <datalist id="suggestions">
          {suggestions.map((suggest, index) => (
            <option key={index} value={suggest} />
          ))}
        </datalist>
        <div
          className="table_parent_container"
          onScroll={handleScroll}
          ref={tableRef}
          style={{ overflowY: "auto", height: "83vh", width: "100%" }}
        >
          {cityNotFound ? (
            <div style={{ textAlign: "center", padding: "20px" }}>
              City not found
            </div>
          ) : (
            <table border={1} id="myTable">
              <thead>
                <tr>
                  <th onClick={() => handleSort("cou_name_en")}>
                    Country Name
                    {sortConfig.key === "cou_name_en" && (
                      sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />
                    )}
                    {sortConfig.key !== "cou_name_en" && <FaSort />}
                  </th>
                  <th onClick={() => handleSort("name")} style={{ textAlign: "center" }}>
                    City Name
                    {sortConfig.key === "name" && (
                      sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />
                    )}
                    {sortConfig.key !== "name" && <FaSort />}
                  </th>
                  <th style={{ textAlign: "center" }}>TimeZone</th>
                </tr>
              </thead>
              <tbody>
                {data.map((city, index) => (
                  <tr key={index}>
                    <td>{city.cou_name_en}</td>
                    <td>
                      <div
                        style={{ textAlign: "center", cursor: "pointer" }}
                        onContextMenu={(e) =>
                          handleContextMenu(e, { name: city.name })
                        }
                      >
                        <Link to={`/weather/${city.name}`}>{city.name}</Link>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>{city.timezone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {loading && (
            <div style={{width:"100%", textAlign:"center"}}>
              <Vortex
                visible={true}
                height="80"
                width="80"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={[
                  "red",
                  "green",
                  "blue",
                  "yellow",
                  "orange",
                  "purple",
                ]}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        
<div className="visitedcitieslist">
      <h1> Previously visited Cities for weather details  </h1>

  <div className="citieslistcontainer">
 { arrofvalues.length === 0 ? <p> You havenot visited any city yet!</p>:arrofvalues.map((d)=>(
    

             <p> {d}</p>
 

  ))}
  </div>


</div>

      </div>
    </>
  );
};

export default CitiesTable;












