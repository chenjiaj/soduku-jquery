/**
 * Created by chenjiajun on 2017/12/19.
 * 生成数独游戏
 */

//1.生成完成的解决方案：Generator
//2.随机去除部分数据：按比例

const Generator = require('./generator');

module.exports = class Sudoku {
	constructor() {
		const generator = new Generator();
		generator.generate();
		this.solutionMatrix = generator.matrix;
	}
	
	make(level = 5) {
		const sholdRid = Math.random * 9 < level;
		//生成迷盘
		this.puzzleMatirx = this.solutionMatrix.map(row => row.map(cell => Math.random() * 9 < level ? 0 : cell));
	}
};