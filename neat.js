neat = {
	items : [
		{
			name:"BudoBalls",
			type:"Demo",
			url:"http://Pryme8.github.io/BudoBalls",
			author: "Pryme8",
			email: "Pryme8@gmail.com",
			desc : "A quick example of how to make enemeys chase a target.",
			keywords : ['Lerp', 'Physics', 'AI', 'Collisions', 'beforeRender', 'Demo'],
			sublinks : [{url:'http://babylonjs-playground.azurewebsites.net/#1PSHEG%230', title:'playground example'}]
		},
		{
			name:"TERIABLE",
			type:"Demo",
			url:"http://Pryme8.github.io/TERIABLE",
			author: "Pryme8",
			email: "Pryme8@gmail.com",
			desc : "Terrain Generation and chunking Example. See sublinks for physics controler and infinite terrain.",
			keywords : ['Terrain', 'Land', 'Chunks', 'Procedural', 'Noise'],
			sublinks : [{url:'http://Pryme8.github.io/TERIABLE/infinity.html', title:'Infinite Terrain/Controller'},
						{url:'http://Pryme8.github.io/Das_Noise', title:'Noise Library'}
					   ],
		
		},
		{
			name:"LSBAG",
			type:"Demo",
			url:"http://Pryme8.github.io/LSBAG",
			author: "Pryme8",
			email: "Pryme8@gmail.com",
			desc : "Simple Arcade Shooter Example.",
			keywords : ['Shooter', 'Space', 'Physics', 'Enemies', 'Bullets', 'Collisions', 'Arcade'],
			sublinks : [  ],
		
		}		
	]	
	
};

neat.buildSite = function(){
	dir = document.getElementById('directory');
	for(var i=0; i<neat.items.length; i++){
		var newItem = new neat.item(i);
		dir.appendChild(newItem.dom);
	};
};

neat.item = function(id){
	this.id = id;
	var item = neat.items[id];
	this.item = item;
	this.name = item.name;
	this.type = item.type;
	this.url = item.url;
	this.author = item.author;
	this.email = item.email;
	this.desc = item.desc;
	this.keywords = item.keywords;
	this.sublinks = item.sublinks;
	this.dom = document.createElement('div');
	this.dom.setAttribute('id', this.name);
	this.dom.setAttribute('class', 'item');
	var keyString = "";
	for(var i=0; i<this.keywords.length; i++){
		keyString += "<a href='#' act='search-keyword'>"+this.keywords[i]+"</a>";
		if(i<this.keywords.length-1){
		keyString += "&nbsp; : &nbsp;";
		}
	};
	var sublinks = "";
	for(var i=0; i<this.sublinks.length; i++){
		sublinks += "<a href='"+this.sublinks[i].url+"' target='_blank'>"+this.sublinks[i].title+"</a>";
		if(i<this.sublinks.length-1){
		sublinks += "<BR/>";
		}
	};
	
	
	this.dom.innerHTML = "<div class='head'><a href='"+this.url+"' target='_blank'>"+this.name+"</a> - by <a href='mailto:"+this.email+"'>"+this.author+"</a></div>"+
	"<div class='content'>"+
		"<div class='preview'>"+
		"<img src='./imgs/"+this.name+".jpg' ></img>"+
		"</div>"+
		"<div class='desc'>"+
		this.desc+"<hr/>"+sublinks+
		"</div>"+
	
	"</div>"+
	"<div class='keywords'>"+keyString+"</div>";
	
	
	return this;
};