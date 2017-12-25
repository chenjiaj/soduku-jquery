/**
 * Created by chenjiajun on 2017/12/25.
 */

class A {
	constructor() {
		this.x = 1;
	}
	print(){
		console.log('--x--',this.x);
	}
	static print(){
		console.log('--x--',this.x);
	}
}

class B extends A{

}

let b = new B();
b.print();
console.log(B.print());