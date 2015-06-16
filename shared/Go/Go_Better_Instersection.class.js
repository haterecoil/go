var Go_Intersection = dejavu.Class.declare({
    
    $constants: {
        STONE_NORMAL: 0,
        STONE_TURRET4 : 1
    },
    
	_owner: 0,
    _chain: -1,
    HP: 100,
    type: null,
    
    initialize: function() {
    },

	isEmpty: function(){
		return this._owner === 0;
	},
    
	getOwner: function(){
		return this._owner;
	},
    
	setOwner: function(owner) {
		this._owner = owner;
        this.type = this.$self.STONE_NORMAL;
        
        return this;
	},

    getChain: function() {
        return this._chain;
    },

    setChain: function(chain) {
        this._chain = chain;

        return this;
    },
    
    getType: function() {
        return this.type;   
    },
    
    setType: function(type) {
        this.type = type;
        return this;
    },
                                           
	removeStone: function(){
		this._owner = 0;
	},
    
    getHP: function(){
        return this.HP;   
    },
    
    getHit: function(){
        this.HP = this.HP-10;   
        if (this.HP <= 0)
        {
            this._owner = 0;
            this.type = null;
        }
    }

});