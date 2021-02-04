import React, { useEffect, useState } from "react";
import Loading from "../Loading";

import Blog from "./Blog.js";

/** Template for "home" page with infinite scroll and fallback to pagination. */
const View = props => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { // Like componentDidMount()
        console.log("VIEW MOUNTING...")
        setMounted(true);
        window.scrollTo(0,1) // IF I REMOVE THIS THEN SCROLL WILL BE BUGGY. WHY IS THIS THE CASE REACT!?!?
        window.requestAnimationFrame(function() {
          window.scrollTo(0,localStorage.getItem("homeYScroll"))
        });
        return () => { // Like componentWillUnmount()
            console.log("VIEW UNMOUNTING...")
            localStorage.setItem("homeYScroll",window.scrollY);
        }
      }, []);
    useEffect(() => { // Like componentDidUpdate()
        console.log("VIEW UPDATED...")
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

            <Blog posts={items} theme={theme} />
            <style jsx>{`
                @keyframes spinner {
                to {transform: rotate(360deg);}
                }
                .spinner {
                margin-top: 40px;
                font-size: 60px;
                text-align: center;

                :global(svg) {
                    fill: ${theme.color.brand.primaryLight};
                    animation: spinner 3s linear infinite;
                }
                
                }
                        
            `}</style>

        </React.Fragment>
        
    )
}

export default View