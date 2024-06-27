// Posts Lists link (Root path) / Link to Create New Post (Post Form)

import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <Link to="/">Posts List</Link>
            {" | "}
            <Link to="/new">New post</Link>
        </nav>
    )
}

export default NavBar;