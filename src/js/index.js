/**
 * Created by chenjiajun on 2017/12/15.
 */

const Grid = require('./ui/grid');
const grid = new Grid($('#container'));
const PopuNumbers = require('./ui/popupnumbers');
grid.build();
grid.layout();

const popupNumbers = new PopuNumbers($('#popupNumbers'));
grid.bindPopup(popupNumbers);


$("#check").on("click", () => {
	if(grid.check()){
		alert("成功");
	};
});

$("#reset").on("click", () => {
	grid.reset();
});

$("#clear").on("click", () => {
	grid.clear();
});

$("#rebuild").on("click", () => {
	grid.rebuild();
});
