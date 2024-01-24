import React from "react";
import CardList from "../Components/CardList";
import SearchBox from "../Components/SearchBox";
import "./App.css";
import Scroll from '../Components/Scroll'; 

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }

        // Bind the event handler in the constructor
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots: users })); 
    }

    onSearchChange = (event) => {
       
        this.setState({ searchfield: event.target.value })
        
    }

    render() {
        const { robots, searchfield }= this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return (!robots.length) ?
            <h1 className="tc">Loading...</h1> :
            (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            );
        }
    } 


export default App;
