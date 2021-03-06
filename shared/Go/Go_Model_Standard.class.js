var Go_Model_Standard = dejavu.Class.declare({
	$extends: Go_Model,
	goban: null,
	previousGoban : null,
	gobanClone : null,
	
	
	createGoban: function() {
		this.goban = [];
		this.previousGoban = "";
		this.previousGoban2 = "";
		for (var x = 0; x<this.go.size; x++)
		{
			var currentRow = [];
			for (var y = 0; y<this.go.size; y++)
			{
				currentRow.push( new Go_Intersection() );

				this.previousGoban+="3"; // carglass répare, carglass remplace
				this.previousGoban2+="3"; // amora, par amour du goût
			}
			this.goban.push(currentRow);
		}
		
		console.log(this.goban);
	},
	
	getGoban: function() {
		return this.goban;	
	},
	
	getSerializedGoban: function() {
		var ret = '';
		for (var x = 0; x<this.go.size; x++)
		{
			for (var y = 0; y<this.go.size; y++)
			{
				ret += this.getIntersection(x,y).getOwner();
			}
		}
		return ret;
	},

	getSerializedGobanWithHp: function() {
		var ret = '[';
		for (var x = 0; x<this.go.size; x++)
		{
			for (var y = 0; y<this.go.size; y++)
			{
				var intersection = this.getIntersection(x,y);
				var type = intersection.getType() == null ? '"null"' : intersection.getType();

				ret += '{"owner": '+intersection.getOwner()+', "type": '+type+', "health": '+intersection.getHP()+'},';
			}
		}
		ret = ret.slice(0,-1);
		ret+=']';
		return ret;
	},

	setGobanFromSerialized: function(serializedGoban) {
		console.log(serializedGoban);
				
		var JSONgoban = JSON.parse(serializedGoban);
		var i = 0;
		for ( var x = 0; x<this.go.size; x++ )
		{
			for (var y = 0; y<this.go.size; y++)
			{
				
				var intersection = this.getIntersection(x, y);
				var type = JSONgoban[i].type == "null" ? null : JSONgoban[i].type;
						
				intersection.setOwner(JSONgoban[i].owner);
				intersection.setType(type);
				intersection.setHP(JSONgoban[i].health);

				i++;
			}
		}
	},
	
	countPlayer: function(pl) {
		
		var count = 0;
		for (var x = 0; x<this.go.size; x++)
		{
			for (var y = 0; y<this.go.size; y++)
			{
				count += this.getIntersection(x,y).getOwner() === pl;
			}
		}
		
		return count;
	},
	
	setPreviousGoban: function() {
		this.previousGoban2 = "";
		var c = 0;
		for (var i = 0; i < this.go.size; i++) {
			for ( var j = 0; j < this.go.size; j++) {
				this.previousGoban2 += this.previousGoban[c++];						
			}
		}		
		this.previousGoban = "";
		for (var i = 0; i < this.go.size; i++) {
			for ( var j = 0; j < this.go.size; j++) {
				this.previousGoban += this.goban[i][j].getOwner();
			}
		}
	},	

	cloneCurrentGoban: function() {
		this.gobanClone = "";
		var c = 0;
		for (var i = 0; i < this.go.size; i++) {
			for ( var j = 0; j < this.go.size; j++) {
				this.gobanClone += this.previousGoban[c++];						
			}
		}		
	},

	currentGobanIsSameAsPrevious: function() {
		//get string from curr goban
		var str = "";
		for (var i = 0; i < this.go.size; i++) {
			for ( var j = 0; j < this.go.size; j++) {
				str += this.goban[i][j].getOwner();
			}
		}			
		
		if ( str === this.previousGoban2 ) return true;
		return false;
	},

	restorePreviousGoban_old: function() {
		var c = 0;
		for (var i = 0; i < this.go.size; i++) {
			for ( var j = 0; j < this.go.size; j++) {
				this.goban[i][j].setOwner(parseInt(this.gobanClone[c++]));
			}
		}	
	},
	restorePreviousGoban: function() {
		var JSONgoban = this.gobanClone;
		var i = 0;
		for ( var x = 0; x<this.go.size; x++ )
		{
			for (var y = 0; y<this.go.size; y++)
			{
				
				var intersection = this.getIntersection(x, y);
				var type = JSONgoban[i].type == "null" ? null : JSONgoban[i].type;
						
				intersection.setOwner(JSONgoban[i].owner);
				intersection.setType(type);
				intersection.setHP(JSONgoban[i].health);

				i++;
			}
		}
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
	
	getHorizontalNeighbours: function(x,y) {
		var neighbours = [];
		if ( x+1 <= this.go.size-1 ) neighbours.push(this.goban[x+1][y  ]);
		if ( x-1 >= 0 ) neighbours.push(this.goban[x-1][y  ]);				
		return neighbours;
	},
	
	getVerticalNeighbours: function(x,y) {
		var neighbours = [];
	  	if ( y-1 >= 0 ) neighbours.push(this.goban[x  ][y-1]);
		if ( y+1 <= this.go.size-1 ) neighbours.push(this.goban[x  ][y+1]);
		return neighbours;
	},

	getLeftNeighbour: function(x,y) {
		var neighbours = [];
		if ( x-1 >= 0 ) neighbours.push(this.goban[x-1][y  ]);				
		return neighbours;
	},
	
	getRightNeighbour: function(x,y) {
		var neighbours = [];
		if ( x+1 <= this.go.size-1 ) neighbours.push([x+1,y  ]);
		return neighbours;
	},
	
	getBottomNeighbour: function(x,y) {
		var neighbours = [];
		if ( y+1 <= this.go.size-1 ) neighbours.push(this.goban[x  ][y+1]);	
		return neighbours;
	},
	
	getTopNeighbour: function(x,y) {
		var neighbours = [];
		if ( y-1 >= 0 ) neighbours.push(this.goban[x  ][y-1]);
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
	
	placeStone : function(x,y,type) {
		switch(type)
		{
			case Go_Intersection.STONE_NORMAL:
				break;
        	case Go_Intersection.STONE_TURRET4:
				alert('Obsolete TURRET4 in setOwner');
				break;
			case Go_Intersection.TURRET_UNI_UP:
			case Go_Intersection.TURRET_UNI_RIGHT:
			case Go_Intersection.TURRET_UNI_DOWN:
			case Go_Intersection.TURRET_UNI_LEFT:
				if (this.go.turretsLeft[this.go.currentPlayer-1].UNI <= 0)
					return false;
				this.go.turretsLeft[this.go.currentPlayer-1].UNI--;
				break;
			case Go_Intersection.TURRET_DUO_HORIZONTAL:
			case Go_Intersection.TURRET_DUO_VERTICAL:
				if (this.go.turretsLeft[this.go.currentPlayer-1].DUO <= 0)
					return false;
				this.go.turretsLeft[this.go.currentPlayer-1].DUO--;
				break;
			case Go_Intersection.TURRET_QUADRATURE:
				if (this.go.turretsLeft[this.go.currentPlayer-1].QUADRATURE <= 0)
					return false;
				this.go.turretsLeft[this.go.currentPlayer-1].QUADRATURE--;
				break;
			default:
				alert('Type inconnu in setOwnerx');
		}
		
		this.goban[x][y].setOwner(this.go.currentPlayer).setType(type);
		
		return true;
	},
	removeStone : function(x,y) {
		switch(this.goban[x][y].getType())
		{
			case Go_Intersection.STONE_NORMAL:
				break;
        	case Go_Intersection.STONE_TURRET4:
				alert('Obsolete TURRET4 in setOwner');
				break;
			case Go_Intersection.TURRET_UNI_UP:
			case Go_Intersection.TURRET_UNI_RIGHT:
			case Go_Intersection.TURRET_UNI_DOWN:
			case Go_Intersection.TURRET_UNI_LEFT:
				this.go.turretsLeft[this.go.currentPlayer-1].UNI++;
				break;
			case Go_Intersection.TURRET_DUO_HORIZONTAL:
			case Go_Intersection.TURRET_DUO_VERTICAL:
				this.go.turretsLeft[this.go.currentPlayer-1].DUO++;
				break;
			case Go_Intersection.TURRET_QUADRATURE:
				this.go.turretsLeft[this.go.currentPlayer-1].QUADRATURE++;
				break;
			default:
				alert('Type inconnu in setOwner');
		}
		
		this.goban[x][y].removeStone();	
	},
	
	getIntersection: function(x,y) {
		return this.goban[x][y];
	},

	/**
	 *  LOCAL STORAGE
	 */
	setUserUUID: function (uuid) {
		localStorage.setItem("uuid", uuid);
	},
	getUserUUID: function () {
		return localStorage.getItem("uuid");
	},
	UUIDisEmpty: function () {
		if ( localStorage.getItem("uuid") ) {
			return false;
		} else {
			return true;
		}
	}

});


