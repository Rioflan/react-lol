import React from 'react';
import axios from "axios";
import styled from "styled-components";

class ChampDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champion: null,
      displayed: false
    };

    this.displayChampion = this.displayChampion.bind(this);
  }

  loadFile(data)
  {
    return btoa(
      new Uint8Array(data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );
  }

  componentDidMount() {
    axios.get(
      this.props.name.toLocaleLowerCase() + '.png',
      { responseType: 'arraybuffer' },
    )
      .then(res => {
        this.setState({ champion: "data:;base64," + this.loadFile(res.data) });
      });
  }

  displayChampion() {
    this.setState({ displayed: !this.state.displayed});
  }

  render() {
    const Container = styled.div`
      width: 400px;
      height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
    `;

    const Button = styled.button`
      background: white;
      color: black;
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid black;
      border-radius: 3px;
    `;

    const ChampionPicture = styled.img`
      height: 300px;
      width: 300px;
      visibility: ${this.state.displayed ? "visible" : "hidden"};
    `;

    return (
      <Container>
        <Button onClick={this.displayChampion}>{(this.state.displayed ? "Hide" : "Display") + ' ' + this.props.name}</Button>
        <ChampionPicture src={this.state.champion} alt={this.props.name}/>
      </Container>
    );
  }
}

export default ChampDisplay;