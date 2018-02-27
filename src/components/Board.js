import React from "react";

class Board extends React.Component {
  state = {
    tileWidth: 100,
    tileHeight: 100,
    tiles: [[1]],
    selectedTile: null
  };

  componentDidMount() {
    this.generateTiles();
  }

  generateTiles = () => {
    const tileColumns = Math.ceil(window.innerWidth / this.state.tileWidth);
    const tileRows = Math.ceil(window.innerHeight / this.state.tileHeight);
    let tiles = [];
    for (let i = 0; i < tileColumns; i++) {
      tiles[i] = [];
      for (let j = 0; j < tileRows; j++) {
        let tile;
        if (i % 2 === 0) {
          tile = {
            id: `${i},${j}`,
            bgColor: "#555",
            color: "#eee",
            x: i * this.state.tileWidth * 0.7,
            y: j * this.state.tileHeight
          };
        } else {
          tile = {
            id: `${i},${j}`,
            bgColor: "#555",
            color: "#eee",
            x: i * this.state.tileWidth * 0.7,
            y: j * this.state.tileHeight + this.state.tileHeight / 2
          };
        }

        tiles[i].push(tile);
      }
    }
    this.setState({ tiles });
  };

  handleMouseOver = e => {
    e.target.style.backgroundColor = "#333";
  };

  handleMouseOut = e => {
    let pos = e.target.id.split(",");
    e.target.style.backgroundColor = this.state.tiles[pos[0]][pos[1]].bgColor;
  };

  renderTiles = () =>
    this.state.tiles.reduce((acc, cur) => acc.concat(cur)).map(tile => {
      return (
        <div
          id={tile.id}
          className="tile"
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          style={{
            height: this.state.tileHeight,
            width: this.state.tileWidth,
            backgroundColor: tile.bgColor,
            border: `1px ${tile.color} solid`,
            top: tile.y,
            left: tile.x
          }}
        />
      );
    });

  render() {
    console.log(this.state.tiles);
    return (
      <div className="board">
        <div>{this.renderTiles()}</div>
        <div>Stats</div>
      </div>
    );
  }
}

export default Board;
