import React from "react";

function IconArrowUP({increaseTime}){
    return(
        <svg onClick={increaseTime} className="arrowUp" xmlns="http://www.w3.org/2000/svg" width="14" height="7"><path fill="none" stroke="#1E213F" strokeOpacity=".25" strokeWidth="2" d="M1 6l6-4 6 4"/></svg>
    )
}

export default IconArrowUP