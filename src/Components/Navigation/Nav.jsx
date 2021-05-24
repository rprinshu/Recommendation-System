import React, { useState, useEffect } from "react";
import { signout } from "../../Routes/helpers";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    await axios.get("http://localhost:8000/api/fetchallusers").then((res) => {
      console.log(res);
      setUsers(res.data);
    });
  };
  //   component mount

  useEffect(() => {
    fetchUsers();
  }, []);
  const history = useHistory();
  const logout = () => {
    signout();
    history.push("/signin");
  };

  const searched = (text) => (c) =>
    c.expertise.toLowerCase().includes(text) ||
    c.name.toLowerCase().includes(text);

  return (
    <div>
      <nav className="navbar">
        <span className="logo">Tessellatte</span>
        <div className="middle">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
          />
          {search && (
            <div className="search">
              {users.filter(searched(search)).length > 0 ? (
                users.filter(searched(search)).map((s) => (
                  <div className="search-res">
                    <i class="fas fa-user"></i> {s.name}:{s.expertise.split("_").join(" ")}
                  </div>
                ))
              ) : (
                <center style={{ marginTop: "2rem" }}>
                  No Results Found..
                </center>
              )}
            </div>
          )}
        </div>
        <div className="right">
          <span onClick={logout}>
            Logout <i class="fas fa-sign-out-alt"></i>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
