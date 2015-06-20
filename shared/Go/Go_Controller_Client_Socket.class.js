var Go_Controller_Client_Socket = dejavu.Class.declare({
	$extends: Go_Controller_Client,
	socket: null,
	updateInterval: null,
    // inherit parent Go_Controller  
	
	initialize: function(socket) {
		console.log('Constructeur client socket');
		this.socket = socket;
	},

    
    placeStone: function(x,y,type) {
        if (this.$super(x,y,type)) // appelle placeStone du Go_Controller, et si c'est permis, emit socket
		{
			socket.emit('placeStone',[x,y,type]);
		}
		else
			alert('NOOO');
		
    },
	
	playerPass: function() {
        this.$super() // appelle placeStone du Go_Controller, et si c'est permis, emit socket
		socket.emit('playerPass');
    },
	
	initializeHandlers: function() {
		var that = this;
		socket.on('placeStone',function(coords,type) {
			that.go.controller.authorityPlaceStone(coords[0],coords[1],type);
		});
		socket.on('playerPass',function(coords) {
			that.go.controller.playerPass();
		});
		socket.on('update',function(coords) {
			// ?
			that.updateHandler();
		});
		
		this.updateInterval = setInterval(function() {
			socket.emit('update');
		},5000); // on peut faire péter le serv avec des loops
	},

	updateHandler: function(JSON) {
		//called every 5 seconds
		//get a new goban state :
		//	intersections ( owner, type, health points )
		//	
		var goban = JSON.goban
		this.go.goban = goban;
		this.go.view.render();

	}


	/*placeStone: function(x,y) {
		if (this.$super(x,y))
		{
			// envoyer au serveur (via une autre classe ?) l'action qu'on vient de faire : socket emit ('placerPierre',[x,y]);
			
			if (this.gameCanGoOn())
			{
				this.go.model.placeStone(x,y);
				this.go.view.placeStone(x,y); // passer current player aussi ?
				this.go.changeCurrentPlayer();
				return true;
			}
			else
			{
			}
		}
		else
			return false;
	}*/
});