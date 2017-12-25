/**
 * Created by chenjiajun on 2017/12/18.
 * 矩阵和数组相关工具
 */

const matrixToolKit = {
	makeRow(v = 0) {
		const array = new Array(9);
		array.fill(v);
		return array;
	},
	makeMatrix(v = 0) {
		return Array.from({length: 9}, () => this.makeRow(v));
	},
	/**
	 * Fisher-Yates 洗牌算法
	 * @param array 需要洗牌的数组
	 * @returns {*}
	 */
	shuffle(array) {
		const endIndex = array.length - 2;//i从0开始,循环整个长度是array.length - 1次,最后一次只有一个数字，因此不做交换
		
		for (let i = 0; i <= endIndex; i++) {
			const j = Math.floor(Math.random() * (array.length - i)) + i;//生成[i,array.length)及[i,array.length -1]间的随机数
			[array[i], array[j]] = [array[j], array[i]];//es6新语法 交换这两个数字
		}
		
		return array;
	},
	/**
	 * TODO 检查指定位置可以填写数字 n
	 */
	checkFillable(matrix, n, rowIndex, colIndex) {
		const row = matrix[rowIndex];
		const column = matrix.map((v, i) => matrix[i][colIndex]);
		const {boxIndex} = boxToolKit.convertToBoxIndex(rowIndex, colIndex);
		const box = boxToolKit.getBoxCells(matrix, boxIndex);
		for(let i = 0; i < 9 ;i++){
			if(row[i] === n || column[i] === n || box[i] === n){
				return false;
			}
		}
		return true;
	}
};

/**
 * 宫坐标系工具
 */

const boxToolKit = {
	
	getBoxCells(matrix, boxIndex) {
		const startRowIndex = Math.floor(boxIndex / 3) * 3;
		const startColIndex = boxIndex % 3 * 3;
		const result = [];
		for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
			const rowIndex = startRowIndex + Math.floor(cellIndex / 3);
			const colIndex = startColIndex + cellIndex % 3;
			result.push(matrix[rowIndex][colIndex]);
		}
		return result;
	},
	convertToBoxIndex(rowIndex, colIndex) {
		return {
			boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
			cellIndex: rowIndex % 3 + colIndex % 3
		}
	},
	
	convertFromBoxIndex(boxIndex, cellIndex) {
		return {
			rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
			colIndex: boxIndex % 3 * 3 + cellIndex % 3
		}
	}
};

//工具集

module.exports = class Toolkit {
	/**
	 * 矩阵和数组相关的工具
	 * @returns {*}
	 */
	static get matrix() {
		return matrixToolKit;
	}
	
	/**
	 * 宫坐标系工具
	 * @returns {{}}
	 */
	static get box() {
		return boxToolKit;
	}
};