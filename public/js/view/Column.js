import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
	constructor(id, title) {
		const topDropZone = DropZone.createDropZone();

		var data = Column.test1() //data from the database save in a variable
		console.log(data)
		this.elements = {};
		this.elements.root = Column.createRoot();
		this.elements.title = this.elements.root.querySelector(".kanban__column-title");
		this.elements.items = this.elements.root.querySelector(".kanban__column-items");		
		this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");
 
		this.elements.root.dataset.id = id;
		this.elements.title.textContent = title;
		this.elements.items.appendChild(topDropZone);

		this.elements.addItem.addEventListener("click", () => {
			const newItem = KanbanAPI.insertItem(id, "");

			this.renderItem(newItem);
		});

		KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});

		for(var item in data)
		{
			console.log("A");
			console.log(item);
		}
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="kanban__column">
				<div class="kanban__column-title"></div>
				<div class="kanban__column-items"></div>
				<button class="kanban__add-item" type="button">+ Add</button>
			</div>
		`).children[0];
	}

	renderItem(data) {
		const item = new Item(data.id, data.content);

		this.elements.items.appendChild(item.elements.root);
	}


//fetching data from the database
	static async test1(){
		try{
			var data  = await fetch('http://localhost:5000/getjson')
			// console.log(data)
			if(data.ok){
				var x = await data.json()
				//console.log(x);
				return x
			}
		}catch(err){
			console.log(err);
		}
	}
}