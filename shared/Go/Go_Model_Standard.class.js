var Go_Model_Standard = dejavu.Class.declare({
	$extends: Go_Model,
	goban: null,
	
	initialize: function(go) {
		this.$super(go);
		this.goban = [];
		for (var x = 0; x<this.go.size; x++)
		{
			var currentRow = [];
			for (var y = 0; y<this.go.size; y++)
			{
				currentRow.push( new Go_Intersection() );
			}
			this.goban.push(currentRow);
		}
		
		console.log(this.goban);
	},
	
	getGoban: function() {
		return this.goban;	
	},
	
	// du top left dans le sens horaire
	// @todo vérif bordures
	// @todo classe "pierre" / "emplacement" ? et on retourne ces objets-là ?
	getNeighbours: function(x,y) {
		var neighbours = [];
	  if ( y-1 >= 0 ) neighbours.push(this.goban[x  ][y-1]);
		if ( x+1 <= this.go.size-1 ) neighbours.push(this.goban[x+1][y  ]);
		if ( y+1 <= this.go.size-1 ) neighbours.push(this.goban[x  ][y+1]);
		if ( x-1 >= 0 ) neighbours.push(this.goban[x-1][y  ]);
		return neighbours;
	},

	getNeighboursCoords: function(x,y) {
		var neighbours = [];
	  if ( y-1 >= 0 ) neighbours.push([x  ,y-1]);
		if ( x+1 <= this.go.size-1 ) neighbours.push([x+1,y  ]);
		if ( y+1 <= this.go.size-1 ) neighbours.push([x  ,y+1]);
		if ( x-1 >= 0 ) neighbours.push([x-1,y  ]);
		return neighbours;
	},
	
	placeStone : function(x,y) {
		this.goban[x][y].setOwner(this.go.currentPlayer);	
	},
	removeStone : function(x,y) {
		this.goban[x][y].removeStone();	
	},
	
	getIntersection: function(x,y) {
		return this.goban[x][y];
	}
});


