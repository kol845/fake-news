import React from "react";
import { FaCog } from "react-icons/fa/";


const Loading = (props) => (
    <React.Fragment>
    <div className="spinner">
        <FaCog/>
    </div>
    <style jsx>{`
        @keyframes spinner {
        to {transform: rotate(360deg);}
        }
        .spinner {
        margin-top: 50vh;
        font-size: 60px;
        text-align: center;

        :global(svg) {
            fill: ${props.theme.color.brand.primaryLight};
            animation: spinner 3s linear infinite;
        }
        
        }
            
    `}</style>
  </React.Fragment>
)
export default Loading;