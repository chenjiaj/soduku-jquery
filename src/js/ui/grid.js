/**
 * Created by chenjiajun on 2017/12/19.
 * 生成九宫格
 */
const Sudoku = require('../core/sudoku');
const Checker = require('../core/checker');

class Grid {
	constructor(container) {
		this._$container = container;
	}
	
	build() {
		/*const generator = new Generator();
		generator.generate();
		const matrix = generator.matrix;*/
		const sudoku = new Sudoku();
		sudoku.make();
		const matrix = sudoku.puzzleMatirx;
		
		const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
		const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
		
		const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
			return $("<span>")
				.addClass(colGroupClasses[colIndex % 3])
				.addClass(cellValue ? "fixed" : "empty")
				.text(cellValue);
		}));
		
		const $divArray = $cells.map(($spanArray, rowIndex) => {
			return $("<div>")
				.addClass('row')
				.addClass(rowGroupClasses[rowIndex % 3])
				.append($spanArray);
		});
		
		this._$container.append($divArray);
	}
	
	layout() {
		const width = $("span:first", this._$container).width();
		$("span", this._$container)
			.height(width)
			.css({
				'line-height': `${width}px`,
				"font-size": width < 32 ? `${width / 2}` : ""
			});
	}
	
	bindPopup(popupNumbers) {
		this._$container.on("click", "span", e => {
			const $cell = $(e.target);
			if (!$cell.hasClass('fixed')) {
				popupNumbers.popup($cell);
			}
		})
	}
	
	/**
	 * 检查用户解谜的结果，成功则进行提示，失败显示错误位置的标记
	 */
	check() {
		//TODO 从界面获取需要检查的数据
		
		const $rows = this._$container.children();
		const data = $rows.map((rowIndex, div) => {
			return $(div).children()
				.map((colIndex, span) => parseInt($(span).text() || 0))
		})
			.toArray()
			.map($data => $data.toArray());
		
		const checker = new Checker(data);
		if (checker.check()) {
			return true;
		}
		
		const marks = checker.matrixMarks;
		this._$container.children()
			.each((rowIndex, div) => {
				$(div).children().each((colIndex, span) => {
					const $span = $(span);
					if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
						$(span).removeClass("error");
					} else if (!marks[rowIndex][colIndex]) {
						$(span).addClass("error");
					}
				});
			});
	}
	
	/**
	 * 重置当前迷盘到出事状态
	 */
	reset() {
		this._$container.find("span:not(.fixed)")
			.removeClass("error mark1 mark2")
			.text(0)
			.addClass("empty")
	}
	
	/**
	 * 清理错误标记
	 */
	clear() {
		this._$container.find("span.error")
			.removeClass("error");
	}
	
	/**
	 * 重建新的迷盘，新一局
	 */
	rebuild() {
		this._$container.empty();
		this.build();
		this.layout();
	}
}

module.exports = Grid;

