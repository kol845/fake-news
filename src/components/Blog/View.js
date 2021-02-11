import React, { useEffect, useState } from "react";
import Loading from "../Loading";

import Blog from "./Blog.js";

/** Template for "home" page with infinite scroll and fallback to pagination. */
const View = props => {
    useEffect(() => { // Like componentDidMount()
        console.log("VIEW MOUNTING...")
        window.scrollTo(0,1) // IF I REMOVE THIS THEN SCROLL WILL BE BUGGY. WHY IS THIS THE CASE REACT!?!?
        window.requestAnimationFrame(function() {
          window.scrollTo(0,localStorage.getItem("homeYScroll"))
        });
        if(props.location.state){
            props.location.state.refreachScroll = false;
        }
        return () => { // Like componentWillUnmount()
            console.log("VIEW UNMOUNTING...")
            localStorage.setItem("homeYScroll",window.scrollY);
        }
        
      }, []);
    useEffect(() => { // Like componentDidUpdate()
        console.log("VIEW UPDATED...")
        if(props.location.state){
            if(props.location.state.refreachScroll){ // Scroll to top if the navbutton is pressed.
                window.scrollTo(0,1)
            }
        }

    });
        

    // console.log("VIEW SAYS:")
    // console.log(window.scrollY)
    const theme = props.theme
    const items = props.items;
    // console.log("IN VIEW:")
    // console.log(props)
    if(!items){
        return <Loading theme={props.theme}/>;
    }
    return(

        
            
        <React.Fragment>


            {/* Blog posts with infinite scroll. */}
            
            <Blog posts={items} theme={theme} admin={props.admin}/>


        </React.Fragment>
        
    )
}

export default View