
export default class News {
	
	constructor(typeOfRequest,url) {
		//proxy
		let paramReguest = {};

		let proxy = new Proxy(paramReguest, {
			get(target, prop) {
			console.log(`Чтение ${prop}`);
			return target[prop];
		},
		set(target, prop, value) {
			console.log(`Запись ${prop} ${value}`);
			target[prop] = value;
			return true;
		}
		});
		proxy.typeOfRequest = typeOfRequest;
		proxy.url = url;
		//factory
		this.req;
        if (typeOfRequest === "request") {
            this.req = new Request(url);
			this.typeOfRequest = "request";
        }
		else if (typeOfRequest === "get"){
			this.req = new XMLHttpRequest();
			this.typeOfRequest = "get";
		}
		else if (typeOfRequest === "post"){
			this.req = new XMLHttpRequest();
			this.typeOfRequest = "post";
		}
	}
	
	
			
	
	printSource(){
		if(this.typeOfRequest === "request"){
		let myList = document.querySelector('.select.new');
		fetch(this.req).then(function(response) {
			return response.json().then(function(json) {
				for (let i = 0; i < json.sources.length; i++) {
					let listItem = document.createElement('option');
					listItem.value = `${json.sources[i].id}`;
					listItem.innerHTML = `${json.sources[i].name}`;
					myList.appendChild(listItem);
				}
			});
		});
	}
	}
	
	printNews(){
        if(this.typeOfRequest === "request"){		
	    let select = document.querySelector('.select.new');
		select.addEventListener('change', function() {
			if(select.value){
				this.req = "https://newsapi.org/v2/top-headlines?" +
				"sources=" + select.value +
				"&apiKey=a09253e9d8614d7f86d01ec6998b70de";
				let myList = document.querySelector('ul');
			    myList.innerHTML = "";
				fetch(this.req).then(function(response) {
					return response.json().then(function(json) {
						for (let i = 0; i < json.articles.length; i++) {
							let listItem = document.createElement('li');
							listItem.innerHTML = `<div class="news"> <div class="post-title"><h1>${json.articles[i].title}</h1></div> 
							<div class="post-info"> <span>${json.articles[i].publishedAt} / by ${json.articles[i].author}</span></div>
							<div class= "news-image"> <img src="${json.articles[i].urlToImage}"></div>
							<p>${json.articles[i].description}</p> <a href="${json.articles[i].url}"><span>Read More</span></a></div>`;
							myList.appendChild(listItem);
						}
					});
				});
			}
		});		
	}}

	
};






	

