import React, { Component } from 'react';

class StartGame extends Component {
    state = {
        gameBoard: [],
        size: 8,
        move: 0,
        queen: []
    }

    componentDidMount() {
        let gameBoard = [];
        let queen = [];
        for (let i = 0; i < this.state.size; i++) {
            gameBoard.push(new Array(this.state.size).fill('o'))
            queen.push('q');
        }
        this.setState({ gameBoard, queen })
    }

    incrementMove() {
        let move = this.state.move;
        move++;
        this.setState({ move })
    }

    addQueenToBoard(posX, posY) {
        console.log("pos", posX, posY);

        if (this.state.gameBoard[posX][posY] === 'o') {
            let gameBoard = Object.assign([], this.state.gameBoard);
            gameBoard[posX][posY] = 'q';
            let queen = Object.assign([], this.state.queen)
            queen[posY] = 'n';
            this.setState({ queen });
            // open to close
            gameBoard = this.blockQueenRangePosition(gameBoard, posX, posY, 'o', 'c');
            this.setState({
                gameBoard
            })
            this.incrementMove();
        }

        else {
            if (this.state.gameBoard[posX][posY] === 'q') {

                let gameBoard = Object.assign([], this.state.gameBoard);
                gameBoard[posX][posY] = 'o';

                let queen = Object.assign([], this.state.queen)
                queen[posY] = 'q';
                this.setState({ queen });

                gameBoard = this.blockQueenRangePosition(gameBoard, posX, posY, 'c', 'o');
                this.setState({
                    gameBoard
                },

                    () => {
                        console.log(gameBoard)
                        // close to open
                        gameBoard = Object.assign([], this.state.gameBoard);
                        console.log(gameBoard)

                        gameBoard.forEach((element, i) => {
                            element.forEach((ele, j) => {
                                // console.log(element, i, ele, j);
                                if (gameBoard[i][j] === 'q') {
                                    gameBoard = this.blockQueenRangePosition(gameBoard, i, j, 'o', 'c');
                                    this.setState({
                                        gameBoard
                                    })
                                }
                            })
                        })
                    }
                )

                this.incrementMove();


            }
        }
    }

    blockQueenRangePosition(gameBoard, posX, posY, s1, s2) {
        // let gameBoard = Object.assign([], this.state.gameBoard);

        let i = posX,
            j = posY;
        while (--i >= 0) {
            if (gameBoard[i][j] === s1)
                gameBoard[i][j] = s2;
        }

        let i2 = posX,
            j2 = posY;

        while (++i2 < this.state.size) {
            if (gameBoard[i2][j2] === s1)
                gameBoard[i2][j2] = s2;
        }

        let i3 = posX,
            j3 = posY;

        while (--j3 >= 0) {
            if (gameBoard[i3][j3] === s1)
                gameBoard[i3][j3] = s2;
        }

        let i4 = posX,
            j4 = posY;

        while (++j4 < this.state.size) {
            if (gameBoard[i4][j4] === s1)
                gameBoard[i4][j4] = s2;
        }

        let i5 = posX,
            j5 = posY;

        while (++i5 < this.state.size && ++j5 < this.state.size) {
            if (gameBoard[i5][j5] === s1)
                gameBoard[i5][j5] = s2;
        }

        let i6 = posX,
            j6 = posY;

        while (++i6 < this.state.size && --j6 >= 0) {
            if (gameBoard[i6][j6] === s1)
                gameBoard[i6][j6] = s2;
        }

        let i7 = posX,
            j7 = posY;

        while (--i7 >= 0 && --j7 >= 0) {
            if (gameBoard[i7][j7] === s1)
                gameBoard[i7][j7] = s2;
        }

        let i8 = posX,
            j8 = posY;

        while (--i8 >= 0 && ++j8 < this.state.size) {
            if (gameBoard[i8][j8] === s1)
                gameBoard[i8][j8] = s2;
        }

        return gameBoard;
    }

    loadQueen(ele) {
        if (ele === 'q')
            return (
                <i className="fas fa-chess-queen"></i>
            )
        else if (ele === 'n')
            return (
                <i className="fa fa-thumbs-up"></i>

            )

    }


    render() {
        console.log(this.state.queen)

        return (
            <div>
                <div className="row" style={{ marginBottom: 5 + 'px' }}>
                    {
                        this.state.queen.map((ele, ind) => {
                            return (
                                <div key={ind + "q"} className="q-title no-bg color-green">
                                    {this.loadQueen(ele)}
                                </div>
                            )

                        })
                    }
                </div>
                {
                    this.state.gameBoard.map((row, indexX) => {
                        return (
                            <div className="row" key={indexX}>
                                {
                                    row.map((ele, indexY) => {
                                        return (
                                            <div className={ele === 'o' ? "tile" : ele === 'q' ? 'q-title' : "tileBlock"} key={indexY} onClick={() => { this.addQueenToBoard(indexX, indexY) }} >
                                                {this.loadQueen(ele)}
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        )

                    })
                }
                <div className="moves-div">
                    <span className="moves-icon">
                        <i className="fa fa-arrows-alt fa-spin"></i>
                    </span>
                    <div className="moves"> {this.state.move}
                    </div>
                </div>

            </div >
        );
    }
}

export default StartGame;