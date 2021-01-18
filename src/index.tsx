import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

interface SquarePropsInterface {
  value: string;
  onClick: () => void
}

function Square(props: SquarePropsInterface) {
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface BoardPropsInterface {
  squares: Array<string>
  xIsNext: boolean
}

interface BoardStateInterface {
  squares: Array<string>
  xIsNext: boolean
  winner: string
}

class Board extends React.Component<BoardPropsInterface, BoardStateInterface> {
  constructor(props: BoardPropsInterface) {
    super(props);
    this.state = {
      squares: Array(9).fill(""),
      xIsNext: true,
      winner: ""
    };
  }
  handleClick(i: number) {
    console.log(i);
    const squares: Array<string> = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
    console.log(this.state);
  }

  renderSquare(i: number) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }
  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={Array(9).fill("")}
            xIsNext={true}
          />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/*TODO */}</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares: Array<string>): string {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return "";
}