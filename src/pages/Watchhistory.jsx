import React, { useEffect, useState } from "react";
import { gethistory } from "../services/allapi";
import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";

function Watchhistory() {
  const [history, sethistory] = useState([]);

  const getwatchHistory = async () => {
    const { data } = await gethistory();

    // console.log(data);

    //data recieved in console is updated to the state
    sethistory(data);
  };

  console.log(history);

  useEffect(() => {
    getwatchHistory();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-center align-item-center ">
        <h1 className="me-5">WATCH HISTORY</h1>

        <Link to={'/home'} style={{textDecoration:'none',fontSize:'20px',color:'blue',fontWeight:'bolder'}}> <span><ArrowLeft/></span>BACK</Link>
      </div>

      <table className="table-shadow border rounded m-3">
        <thead>
          <tr>
            <th>NO</th>
            <th>NAME</th>
            <th>Url</th>
            <th>DATE</th>
          </tr>
        </thead>

        <tbody>
          {/* to get and print data in array we use the map method and for js code to bring in jsx we use {}  */}

          {history?.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.cardName}</td>
              <td>{item.url}</td>
              <td>{item.Date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Watchhistory;
