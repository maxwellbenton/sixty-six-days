import React from "react";
import { connect } from "react-redux";
class Board extends React.Component {
  state = {
    tileWidth: 100,
    tileHeight: 100,
    tiles: [[1]],
    selectedTile: null
  };

  // componentDidMount() {
  //   this.generateTiles();
  // }

  // generateTiles = () => {
  //   const tileColumns = Math.ceil(window.innerWidth / this.state.tileWidth) * 4;
  //   const tileRows = Math.ceil(window.innerHeight / this.state.tileHeight) * 5;
  //   // const startingX = -this.state.tileWidth * 10;
  //   // const startingY = -this.state.tileHeight * 10;
  //   let tiles = [];
  //   for (let i = 0; i < tileColumns; i++) {
  //     tiles[i] = [];
  //     for (let j = 0; j < tileRows; j++) {
  //       let tile;
  //       if (i % 2 === 0) {
  //         tile = {
  //           id: `${i},${j}`,
  //           bgColor: "#333",
  //           color: "#eee",
  //           x: i * this.state.tileWidth * 0.7,
  //           y: j * this.state.tileHeight
  //         };
  //       } else {
  //         tile = {
  //           id: `${i},${j}`,
  //           bgColor: "#333",
  //           color: "#eee",
  //           x: i * this.state.tileWidth * 0.7,
  //           y: j * this.state.tileHeight + this.state.tileHeight / 2
  //         };
  //       }
  //
  //       tiles[i].push(tile);
  //     }
  //   }
  //   this.setState({ tiles });
  // };

  handleMouseOver = e => {
    e.target.style.backgroundColor = "#555";
  };

  handleMouseOut = e => {
    e.target.style.backgroundColor = this.props.exploredTiles[e.target.id]
      ? "red"
      : this.props.boardTiles[e.target.id].bgColor;
  };

  renderTiles = () => {
    return Object.keys(this.props.boardTiles).map(boardTile => {
      return (
        <div
          id={boardTile}
          key={boardTile}
          className="tile"
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          style={{
            position: "absolute",
            height: this.state.tileHeight,
            width: this.state.tileWidth,
            backgroundColor: this.props.exploredTiles[boardTile]
              ? "red"
              : this.props.boardTiles[boardTile].bgColor,
            border: `1px ${this.props.boardTiles[boardTile].color} solid`,
            top: this.props.boardTiles[boardTile].y,
            left: this.props.boardTiles[boardTile].x,
            color: "white",
            fontSize: "50%",
            lineHeight: `${this.state.tileHeight}px`
          }}
        >
          {boardTile}
        </div>
      );
    });
  };
  // this.props.exploredTiles[boardTile]
  //   ? "red"
  //   : this.props.boardTiles[boardTile].bgColor,
  render() {
    console.log(this.props);
    return (
      <div className="boardContainer">
        YO
        <div
          className="board"
          style={{
            position: "absolute",
            top: 0,
            left: 0
          }}
        >
          <div>{this.renderTiles()}</div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            width: "100px",
            height: "100px",
            backgroundColor: "#aaa"
          }}
        >
          <div>Lat: {this.props.center.lat}</div>
          <div>Lng: {this.props.center.lng}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tileData }, curProps) => {
  console.log("re-render!", tileData);
  return {
    ...tileData
  };
};

export default connect(mapStateToProps)(Board);
