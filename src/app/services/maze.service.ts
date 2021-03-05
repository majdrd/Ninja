import { clone } from 'ramda';
import { Injectable } from "@angular/core";
import { CELL, INIT_NINJA_POSITION, KEY_CODE } from "../constants/app.const";

@Injectable({
    providedIn: 'root'
})
export class MazeService {
    public shurekenCounter = 0;
    get shurekenCount() {
        return this.shurekenCounter;
    }

    constructor() { }

    createMaze(size: number = 8) {
        let tiles: string[][] = [];
        for (let i = 0; i < size; i++) {
            tiles[i] = [];
            for (let j = 0; j < size; j++) {
                let cell = (i === INIT_NINJA_POSITION.y && j === INIT_NINJA_POSITION.x) ? CELL.NINJA : this.getRandomCell();
                this.shurekenCounter = cell === CELL.SHURIKEN ? this.shurekenCounter + 1 : this.shurekenCounter
                tiles[i][j] = cell;
            }
        }
         return tiles;
    }

    getRandomCell() {
        const cellTypesArray = [CELL.SHURIKEN, CELL.EMPTY, CELL.WALL];
        return cellTypesArray[Math.floor(Math.random() * cellTypesArray.length)];
    }

    moveNinja(direction: string, mazeCells: string[][], ninjaPosition: any) {
        const cells = clone(mazeCells);
        const position = clone(ninjaPosition);
        let legalMove = false;
        if (direction === KEY_CODE.DOWN_ARROW && position.x < cells.length - 1 && cells[position.y][position.x + 1] !== CELL.WALL) {
            console.log('D');
            legalMove = true;
            cells[position.y][position.x] = CELL.EMPTY;
            this.shurekenCounter = cells[position.y][position.x + 1] === CELL.SHURIKEN ?
                this.shurekenCounter - 1 :
                this.shurekenCounter
            cells[position.y][position.x + 1] = CELL.NINJA;
            position.x++
        }
        if (direction === KEY_CODE.UP_ARROW && position.x > 0 && cells[position.y][position.x - 1] !== CELL.WALL) {
            console.log('U');
            legalMove = true;
            cells[position.y][position.x] = CELL.EMPTY;
            this.shurekenCounter = cells[position.y][position.x - 1] === CELL.SHURIKEN ?
                this.shurekenCounter - 1 :
                this.shurekenCounter
            cells[position.y][position.x - 1] = CELL.NINJA;
            position.x--;
        }
        if (direction === KEY_CODE.RIGHT_ARROW && position.y < cells.length - 1 && cells[position.y + 1][position.x] !== CELL.WALL) {
            console.log('R');
            legalMove = true;
            cells[position.y][position.x] = CELL.EMPTY;
            this.shurekenCounter = cells[position.y + 1][position.x] === CELL.SHURIKEN ?
                this.shurekenCounter - 1 :
                this.shurekenCounter
            cells[position.y + 1][position.x] = CELL.NINJA;
            position.y++;
        }
        if (direction === KEY_CODE.LEFT_ARROW && position.y > 0 && cells[position.y - 1][position.x] !== CELL.WALL) {
            console.log('L');
            legalMove = true;
            cells[position.y][position.x] = CELL.EMPTY;
            this.shurekenCounter = cells[position.y - 1][position.x] === CELL.SHURIKEN ?
                this.shurekenCounter - 1 :
                this.shurekenCounter
            cells[position.y - 1][position.x] = CELL.NINJA;
            position.y--;
        }
        return {
            cells,
            position,
            legalMove
        };
    }
}
