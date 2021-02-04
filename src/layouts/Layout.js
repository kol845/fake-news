import React, { useEffect } from "react";


import Footer from "../components/Footer/";
import Header from "../components/Header";


const Layout = (props) => {
    useEffect(() => { // Like componentDidUpdate()
        window.requestAnimationFrame(function() {
            document.body.style.overflow = "auto";
        });
    });
    // console.log("LAYOUT SAY:")
    // console.log(props)
    return (
    
        <React.Fragment>
        <div className="highest-container">
            <Header
            path={props.location.pathname}
            theme={props.theme}
            />
            <main>
            {props.children}
            </main>
            <Footer theme={props.theme}/>
        </div>
        <style jsx>{`
            .highest-container {
            min-height: 100%;
            position: relative;
            }
            main {
            padding-bottom: 80px;
            }
        `}</style>
        <style jsx global>{`
            html {
            box-sizing: border-box;
            height: 100%;
            }
            body {
            height: 100%;
            overflow:hidden;
            }

            #___gatsby {
            height: 100%;
            }
            #___gatsby > div {
            height: 100%;
            }
            *,
            *:after,
            *:before {
            box-sizing: inherit;
            margin: 0;
            padding: 0;
            }
            body {
            font-family: 'Open Sans', 'Arial', 'sans-serif';
            font-weight: 400;
            }
            h1,
            h2,
            h3 {
            font-weight: 600;
            font-family: 'Open Sans', 'Arial', 'sans-serif';
            line-height: 1.1;
            letter-spacing: -0.03em;
            margin: 0;
            }
            h1 {
            letter-spacing: -0.04em;
            }
            p {
            margin: 0;
            }
            strong {
            font-family: 'Open Sans', 'Arial', 'sans-serif';
            font-weight: 600;
            }
            a {
            text-decoration: none;
            color: #666;
            }
            main {
            width: auto;
            display: block;
            }
            table, th, td {
            border: 1px solid #DDD;
            }
            th, td {
            padding: 5px;
            }
        `}</style>
        </React.Fragment>
            
    )}

export default Layout;