import React from 'react';
import './App.css';
import styled from 'styled-components';

import ChampDisplay from "./Champion";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      champions: ["Toxic", "Toxic", "Toxic", "Toxic", "Toxic", "Toxic", "Toxic", "Toxic", "Toxic", "Toxic", "Toxic", "Toxic"]
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const MainDiv = styled.div`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    `;

    const EmptyDiv = styled.div`
      height: 400px;
      width: 400px;
      visibility: hidden;
    `;

    const champions = this.state.champions;
    //Align of items on the last line
    let elm_line = Math.floor(this.state.width / 400);
    let nb_elms = Math.ceil(champions.length / elm_line) * elm_line;

    while (champions.length < nb_elms)
    {
      champions.push(null);
    }

    return (
      <MainDiv>
        {
          champions.map(champ => {
            if (champ == null)
              return <EmptyDiv/>;
            else
              return <ChampDisplay name={champ}/>;
          })
        }
      </MainDiv>
    );
  }
}

export default App;
