var Go = dejavu.Class.declare({
	
	model: null,
	view: null,
	controller: null,
	size: null,
	currentPlayer: null,
	notCurrentPlayer: null,
	playerPassed: 0,
	
	initialize: function(M,V,C,size) {
		this.size = size;
		
		M->setGo(this);
		this.model = M;
		
		V->setGo(this);
		this.view = V;
		
		C->setGo(this);
		this.controller = C;
		
		this.currentPlayer = 1;
		this.notCurrentPlayer = 2;
	},
	
	changeCurrentPlayer: function () {
		this.currentPlayer = this.currentPlayer%2+1; // 2 <-> 1
		this.notCurrentPlayer = this.currentPlayer%2+1; // 1 <-> 2
	}
});