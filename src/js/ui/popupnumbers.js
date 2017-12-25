/**
 * Created by chenjiajun on 2017/12/19.
 * 弹出的操作面板
 */

module.exports = class PopupNumbers {
	constructor($panel) {
		this._$panel = $panel.hide().removeClass("hidden");
		this._$panel.on("click", "span", e => {
			e.stopPropagation();
			const $cell = this._$targetCell;
			const $span = $(e.target);
			//1-9，回填数字
			//mark1,mark2 回填样式
			//empty,取消数字填写，取消mark
			if ($span.hasClass("mark1")) {
				//回填样式
				if ($cell.hasClass("mark1")) {
					$cell.removeClass("mark1");
				} else {
					$cell.removeClass("mark2")
						.addClass("mark1")
				}
			} else if ($span.hasClass("mark2")) {
				if ($cell.hasClass("mark2")) {
					$cell.removeClass("mark2");
				} else {
					$cell.removeClass("mark1")
						.addClass("mark2")
				}
			} else if ($span.hasClass("empty")) {
				//取消数字和mark
				$cell.text(0)
					.addClass("empty");
			} else {
				//1-9，回填数字
				$cell.removeClass("empty").text($span.text());
			}
			
			this.hide();
			
			return;
		});
		
		/*$(document).click(e => {
			this.hide();
		});*/
	}
	
	popup($cell) {
		this._$targetCell = $cell;
		const $span = this._$panel.find("span");
		const spanWidth = $span.width();
		const {left, top} = $cell.position();
		const maxLeft = $('.container').width() - spanWidth * 3;
		if (left < maxLeft) {
			this._$panel.css({
				left: `${left + spanWidth / 2}px`,
				top: `${top + spanWidth / 2}px`
			}).show();
		} else {
			this._$panel.css({
				left: `${maxLeft}px`,
				top: `${top + spanWidth / 2}px`
			}).show();
		}
		
	}
	
	hide() {
		this._$panel.hide();
	}
};