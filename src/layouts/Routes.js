import React from "react";
import { FaCog } from "react-icons/fa/";


import { getScreenWidth } from "../utils/helpers";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



export const ThemeContext = React.createContext(null);
export const ScreenWidthContext = React.createContext(0);

import themeObjectFromYaml from "../theme/theme.yaml";

import View from "../components/Blog/View";
import Post from "../components/Post";
import Layout from "./Layout";
import NotFoundPage from "./../pages/404";


import 'typeface-open-sans/index.css'
import api from "./../API";
function getDate(timestamp){
    const date = new Date(timestamp * 1000);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return `${ye}-${mo}-${da}`
}

class Routes extends React.Component {
  constructor() {
    super();
    const updateState = (response) =>{
        
        let items = [];
        let numOfArticles = Object.keys(response).length
        for(let i = 0;i<numOfArticles;i++){
            const date = getDate(response[i].created);
            items.push({
                text:response[i].text,
                excerpt:response[i].excerpt,
                slug:response[i].slug,
                creation_date:date,
                tags:[],
                id:response[i].article_id,
                headline:response[i].headline,
                image_url:response[i].image_url
            })

        }
        // console.log(items)
        this.setState({
            ...this.state,
            items: items,
            isLoading:false,
        })
        // window.scrollTo(0,1000);
        // window.scrollTo(0,localStorage.getItem("homeYScroll"))
    }
    //   console.log("INSPECTING")
    //   console.log(props.pageContext.initialPosts[2].node.excerpt)
    //   props.pageContext.initialPosts[2].node.excerpt = "FUCK FACE"
    // console.log("UPDATING STATE...")
    this.state = {
      screenWidth: 0,
      headerMinimized: false,
      theme: themeObjectFromYaml,
      'isLoading':true
    };
    api.getAllArticles(updateState)
  }


  // pokeState = () =>{
  //   console.log("POKED")
  // }
  componentDidMount() {
    localStorage.setItem("homeYScroll", 0)
    this.setState({
      screenWidth: getScreenWidth()
    });


  }


  render() {
    // console.log("ROUTES SAY:")
    // console.log(this.state)
    return (
        <ThemeContext.Provider value={this.state.theme}>
            <ScreenWidthContext.Provider value={this.state.screenWidth}>
                <Router>
                    <Switch>
                        <RouteWrapper path="/:articleSlug" component={ArticlePage} theme={this.state.theme} items={this.state.items}/>
                        <RouteWrapper path="/" component={HomePage} theme={this.state.theme} items={this.state.items}/>
                        <Route component={NotFoundPage} theme={this.state.theme}/>
                    </Switch>
                </Router>
            </ScreenWidthContext.Provider>
        </ThemeContext.Provider>
    )
    
  }
}
function RouteWrapper({
    component: Component,
    ...props
  }){
    // 'EXACT' PROBLEMS MAY OCCURE
    return (
    <Route  path={props.path} exact>
        <Layout location={props.location} items={props.items} theme={props.theme}>
            <Component {...props}/>
        </Layout>
    </Route>
    );
  }
let LoadingPage = (props) => (
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
            fill: ${this.state.theme.color.brand.primaryLight};
            animation: spinner 3s linear infinite;
        }
        
        }
            
    `}</style>
  </React.Fragment>
)
let HomePage = (props) => (
    <View {...props}></View>
)
let ArticlePage = (props) => (
  <Post {...props}></Post>
)


export default Routes;