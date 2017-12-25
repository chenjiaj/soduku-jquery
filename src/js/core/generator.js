/**
 * Created by chenjiajun on 2017/12/19.
 * 生成数独解决方案
 */
const Toolkit = require('./toolkit');

class Generator {
	generate() {
		while (!this.internalGenerate()) {
			console.warn("try again");
		}
	}
	
	internalGenerate() {
		//TODO 入口方法
		this.matrix = Toolkit.matrix.makeMatrix();
		this.orders = Toolkit.matrix.makeMatrix()
			.map(row => row.map((v, i) => i))
			.map(row => Toolkit.matrix.shuffle(row));
		
		//将1-9随机填入每一行
	
		for (let n = 1; n <= 9; n++) {
			if (!this.fillNumber(n)) {
				return false;
			}
		}
		
		return true;
	}
	
	fillNumber(n) {
		return this.fillRow(n, 0)
	}
	
	fillRow(n, rowIndex) {
		if (rowIndex > 8) {
			return true;
		}
		
		const row = this.matrix[rowIndex];//获取某一行
		const orders = this.orders[rowIndex];//当前行的位置信息
		
		// TODO 随机选择列
		for (let i = 0; i < row.length; i++) {
			const colIndex = orders[i];
			//如果这个位置已经有值,跳过
			if (row[colIndex]) {
				continue;
			}
			
			//检查这个位置是否可以填 n
			if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
				continue;
			}
			
			row[colIndex] = n;
			//如果当前行填写 n 成功,递归调用fillRow()来在下一行中填写n
			//去下一行填写 n,如果没有填写进去，就继续寻找当前行下一个位置
			if (!this.fillRow(n, rowIndex + 1)) {
				row[colIndex] = 0;
				continue;
			}
			
			return true;
		}
		
		return false;
	}
}

const generator = new Generator();

generator.generate();
console.log(generator.matrix);
module.exports = Generator;