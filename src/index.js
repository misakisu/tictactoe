import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*(Boardコンポによって)制御されたコンポーネント。そのため、クラスから関数コンポーネントへ(17,19行目の削除)*/
function Square (props) {
  /*constructor(props){*/
  	/*super(props);/*JavaScript のクラスでは、サブクラスのコンストラクタを定義する際は常に super を呼ぶ必要がある*/
  	/*this.state = {*/
      /*value: null,/*state を初期化*/
  	/*};
  }*/
  /*render() {*/
    return (
      <button
        className="square"
        onClick=/*() => this.*/{props.onClick}/*Square がクリックされると、Boardから(propsとして)渡されたonClick関数をコールする*/
      >
        {props.value}
      </button>
    );
}
//
/*どのマス目に何が入っているのかを管理しているのは Board です(suqares)*/
class Board extends React.Component {
  renderSquare(i) {
    return(
      <Square
        value={this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
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

//
class Game extends React.Component {
  /*Board にある state をップレベルの Game コンポーネントにリフトアップ*/
  constructor(props){
  	super(props);
  	this.state = {
      history: [{
        squares: Array(9).fill(null),/*初期化*/
      }],
      xIsNext: true,
  	};
  }

  handleClick(i) {
  	const history = this.state.history;
  	const current = history[history.length - 1]
  	const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'x' : 'o';
    this.setState({
      history: history.concat([{
        squares: squares,/*現在の値を代入？これは何をしているのか。なぜ53行目はthis.state.squaresはだめ？*/
      }]),
      xIsNext: !this.state.xIsNext,/*xIsNext の値を反転させる*/
    });
  }



  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i)=> this.handleClick(i)}/*GameからBoard、そしてSquare に現在の値i（'X'、'O' または null）を伝える*/
           />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

//

function calculateWinner(squares) {
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
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);