window.addEventListener('load', () => 
    minesweeper.init());

const minesweeper = {
    gameTypes: [
        {
            name: 'small',
            size: 9,
            numberOfMines: 10
        },
        {
            name: 'medium',
            size: 16,
            numberOfMines: 40
        },
        {
            name: 'large',
            size: 24,
            numberOfMines: 150
        }
    ],
    size: null,
    numberOfMines: null,
    startMilliseconds: null,
    logic: null,
    countMineHits: 0,
    init() {
        this.logic = localLogic; 
        this.generateBlocks();
        this.startNewGame('small');
    },
    generateBlocks() {
        const body = document.body;
        const content = document.createElement('div');
        content.classList.add('content');
        body.appendChild(content);

        const header = this.HeaderBlock();
        const playfield = this.PlayfieldBlock();
        const button = this.ButtonbarBlock();
        const footer = this.FooterBlock();

        content.append(header, playfield, button, footer);
    },
    HeaderBlock() {
        const header = document.createElement('header');
        const headercontent = document.createElement('div');
        const heading = document.createElement('h1');
        const name = document.createElement('div');

        header.appendChild(headercontent);
        headercontent.append(heading, name);

        heading.innerText = 'Minesweeper';
        name.innerText = 'by Baran Bickici';

        header.id = 'header';
        headercontent.id = 'headerContent';

        return header;
    },
    PlayfieldBlock() {
        const playfield = document.createElement('div');
        playfield.id = 'playfield';
        return playfield;
    },
    ButtonbarBlock() {
        const createButton = (content, id, method) => {
            const button = document.createElement('button');
            button.innerText = content;
            button.id = id;
            return method(button);
        }

        const appendToButtonBar = (button) => {
            buttonbar.appendChild(button);
            return button;
        }

        const buttonbar = document.createElement('div');
        buttonbar.id = 'buttonbar';

        const smallButton = createButton('Small', 'game-small', appendToButtonBar);
        const mediumButton = createButton('Medium', 'game-medium', appendToButtonBar);
        const largeButton = createButton('Large', 'game-large', appendToButtonBar);

        smallButton.addEventListener('click', () => {
            this.startNewGame('small');
            this.countMineHits = 0;
        });
        mediumButton.addEventListener('click', () => {
            this.startNewGame('medium');
            this.countMineHits = 0;
        });
        largeButton.addEventListener('click', () => {
            this.startNewGame('large');
            this.countMineHits = 0;
        });

        return buttonbar;
    },
    FooterBlock() {
        const footer = document.createElement('footer');
        const footerContent = document.createElement('div');
        const copyright = document.createElement('p');

        footer.appendChild(footerContent);
        footerContent.appendChild(copyright);

        copyright.innerHTML = '&copy; 2025 by Baran Bickici';

        footer.id = 'footer';
        footerContent.id = 'footerContent';

        return footer;
    },
    fillPlayfield(size) {
        const generateCell = (row, column) => {
            const cell = document.createElement('div')
            cell.classList.add('cell','covered');
            cell.dataset.x = column; 
            cell.dataset.y = row;

            const style = `calc(100% / ${size} - 8px)`;
            cell.style.width = style;
            cell.style.height = style;

            return cell;
        }

        const playfield = document.querySelector('#playfield');
        playfield.innerHTML = '';

        for(let row = 0; row < size; row++) {
            for(let column = 0; column < size; column++ ) {
                const cell = generateCell(row,column);

                cell.addEventListener('click', (event) => {
                    this.cellClicked(event);
                });
                cell.addEventListener('contextmenu', (event) => {
                    this.cellRightClicked(event);
                });
                cell.addEventListener('touchstart', (event) => {
                    this.touchStart(event);
                })
                cell.addEventListener('touchend', (event) => {
                    this.touchEnd(event);
                })

                playfield.appendChild(cell);
            }
        }

    },
    startNewGame(_gameType) {
        for(let i = 0; i < this.gameTypes.length; i++) {
            if(_gameType === this.gameTypes[i].name) {
                this.size = this.gameTypes[i].size;
                this.numberOfMines = this.gameTypes[i].numberOfMines;
                this.fillPlayfield(this.gameTypes[i].size);
                this.logic.init(this.size, this.numberOfMines); 
            }
        }
    },
    toggleFlag(divCell) {
        if(divCell.classList.contains('cell', 'covered') && divCell.classList.length === 2) {
            divCell.classList.add('cellsymbol', 'cellsymbolf');
        } else {
            if(divCell.classList.contains('cell','covered','cellsymbol','cellsymbolf') && divCell.classList.length === 4) {
                divCell.classList.remove('cellsymbol', 'cellsymbolf');
            }
        }
    },
    getCell(x,y) {
        return document.querySelector(`div[data-x="${x}"][data-y="${y}"]`);
    },
    placeSymbol(x, y, symbol = 'covered') {
        const divCell = this.getCell(x,y);

        if(divCell.classList.contains('cellsymbol','cellsymbolf')) {
            divCell.classList.remove('cellsymbol','cellsymbolf');
        }
        divCell.classList.remove('covered');

        const Symbols = 
        ['cellsymbolm', 'cellsymbol1', 'cellsymbol2', 
        'cellsymbol3', 'cellsymbol4', 'cellsymbol5', 
        'cellsymbol6', 'cellsymbol7', 'cellsymbol8', 'cellsymbol9'];

        if (Symbols.includes(symbol)) {
            divCell.classList.add('cellsymbol', symbol);
        }
    },
    cellClicked(event) {
        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);

        const mineStatus = this.logic.sweep(x,y);

        if(mineStatus.mineHit) {
            this.placeSymbol(x, y,'cellsymbolm');
            this.logic.uncoverRemainingMines(false);

            if(this.countMineHits === 0) {
                divCell = this.getCell(x,y);
                divCell.id = 'minesymbol';
                this.countMineHits++;
            }
        } else{
            if(mineStatus.emptyCells) {
                for (const c of mineStatus.emptyCells) {
                    this.placeSymbol(c.x, c.y,`cellsymbol${c.minesAround}`);
                }
            } else{
                this.placeSymbol(x, y,`cellsymbol${mineStatus.minesAround}`);
            }
        }

        if(mineStatus.userWins === true) {
            this.logic.uncoverRemainingMines(true);
        }

        event.preventDefault();
    },
    cellRightClicked(event) {
        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);

        const divCell = document.querySelector(`div[data-x="${x}"][data-y="${y}"]`);
        this.toggleFlag(divCell);

        event.preventDefault();
    },
    touchStart(event) {
        this.startMilliseconds = new Date().getTime();
        event.preventDefault();
    },
    touchEnd(event) {
        const endMilliseconds = new Date().getTime();
        const duration = endMilliseconds - this.startMilliseconds;

        if(duration < 500) {
            this.cellClicked(event);
        }
        else {
            this.cellRightClicked(event);
        }
    }
};

const localLogic = {
    moveCounter: null,
    field: null,
    size: null,
    numberOfMines: null,
    uncoveredCells: null,
    numberOfUncoveredCells: null,
    alertCounter: null,
    init(_size, _numberOfMines) {
        this.uncoveredCells = [];
        this.moveCounter = 0;
        this.alertCounter = 0;
        
        this.field = [];
        this.size = _size;
        this.numberOfMines = _numberOfMines;

        for(let row = 0; row < this.size; row++) {
            let _row = [];
            for(let column = 0; column < this.size; column++) {
                _row.push(false);
            }
            this.field.push(_row);
        }
        for(let row = 0; row < this.size; row++) {
            let _row = [];
            for(let column = 0; column < this.size; column++) {
                _row.push(false); 
            }
            this.uncoveredCells.push(_row);
        }     
    },
    initializeMines(x,y) {
        let minesAdded = 0;
        while (minesAdded < this.numberOfMines) {
            const randomRow = Math.floor(Math.random() * this.size);
            const randomCol = Math.floor(Math.random() * this.size);
            if(!(this.field[randomCol][randomRow]) && (randomRow !== x) && (randomCol !== y)) {
                this.field[randomCol][randomRow] = true;
                minesAdded++;
            }
        }
        console.dir(this.field); //hier, kann weg! 
    },
    countUncoveredCells(x,y) {
        this.numberOfUncoveredCells = 0;
        for(let row = 0; row < this.size; row++) {
            for(let column = 0; column < this.size; column++) {
                if(this.uncoveredCells[row][column]) {
                    this.numberOfUncoveredCells++;
                }
            }
        }
    },
    updateUncoveredCells(_emptyCells = undefined, x, y) {
        if(_emptyCells !== undefined) {
            for(const c of _emptyCells) {
                this.uncoveredCells[c.y][c.x] = true;
            }
            } else {
                this.uncoveredCells[y][x] = true;
            }

        this.countUncoveredCells(x,y);
    },
    sweep(x,y) {
        if(this.moveCounter === 0) {
            this.initializeMines(x, y);
        }
        this.moveCounter++;

        if(this.field[y][x] === true) {
            this.updateUncoveredCells(undefined, x, y);
            return {mineHit: true};
        }
        else {
            const numberOfMinesAround = this.countNeighbours(x,y);
            const _emptyCells = numberOfMinesAround > 0 ? undefined : this.getEmptyCells(x, y);
            this.updateUncoveredCells(_emptyCells, x, y);
            _userWins = this.nahIdWin();
            return {mineHit: false, minesAround: numberOfMinesAround, emptyCells: _emptyCells, userWins: _userWins};
        }
    },
    countNeighbours(x,y) {
        let count = 0;
        for(let delta_x = -1; delta_x <= 1; delta_x++) {
            for(let delta_y = -1; delta_y <= 1; delta_y++) {
                if(this.safeAccess(x+delta_x, y+delta_y)) {
                    if(this.field[y+delta_y][x+delta_x]) {
                        count++;
                    }
                }
            }
        }
        return count;
    },
    safeAccess(x,y) {
        return (x >= 0 && x < this.size && y >= 0 && y < this.size);
    },
    getEmptyCells(x,y) {
        const toDo = [{x, y, minesAround: 0}];
        const done = [];

        while(toDo.length) {
            const present = toDo.pop();
            done.push(present);
            const neighbours = this.getNeighbours(present.x, present.y);
        
            for(const neighbour of neighbours) {
                if(!this.inList(done, neighbour) && !this.inList(toDo, neighbour)) {
                    if(neighbour.minesAround === 0) {
                        toDo.push(neighbour);
                    } else{
                        done.push(neighbour);
                    }
                }
            }
        }
        return done;
    },
    inList(list, element) {
        return list.some(ele => ele.x === element.x && ele.y === element.y);
    },
    getNeighbours(x, y) {
        const neighbours = [];
        for(let delta_x = -1; delta_x <= 1; delta_x++) {
            for(let delta_y = -1; delta_y <= 1; delta_y++) {
                if(this.safeAccess(x+delta_x, y+delta_y)) {
                    neighbours.push({ 
                        x: x + delta_x, 
                        y: y + delta_y, 
                        minesAround: this.countNeighbours(x+delta_x, y+delta_y) 
                    });
                }
            }
        }
        return neighbours;
    },
    nahIdWin() {
        return (this.numberOfUncoveredCells === this.size**2 - this.numberOfMines);
    },
    uncoverRemainingMines(boolean) {
        for(let row = 0; row < this.size; row++) {
            for(let column = 0; column < this.size; column++) {
                if(this.field[row][column] === true) {
                    const divMines = document.querySelector(`div[data-x="${column}"][data-y="${row}"]`);
                    divMines.classList.add('cellsymbol','cellsymbolm');
                    divMines.classList.remove('covered');
                }
            }
        }

        if(this.alertCounter === 0) {
            this.gameEndScreen(boolean);
            this.alertCounter++;
        }
    },
    gameEndScreen(boolean) {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        const text = document.createElement('div');
        overlay.appendChild(text);

        if(boolean) {
            text.innerText = "Nah, you'd win!";
        } else {
            text.innerText = "Nah, you'd lose!";
        }

        const playfield = document.querySelector('div[id ="playfield"]');
        playfield.appendChild(overlay);


        playfield.addEventListener('mouseenter', () => {
        overlay.style.display = 'flex';
        });

        playfield.addEventListener('mouseleave', () => {
        overlay.style.display = 'none';
        });
    }
}

