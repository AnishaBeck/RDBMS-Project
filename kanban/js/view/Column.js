import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
	constructor(id, title) {
		const topDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Column.createRoot();
		this.elements.title = this.elements.root.querySelector(".kanban__column-title");
		this.elements.items = this.elements.root.querySelector(".kanban__column-items");
		this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");

		// add a variable with sql queiry and pass that instead of id:
		// id = id=req.params.id;
		// app.get('/view',(req,res)=>
        // {
        //     var sql = "SELECT * from activity WHERE task_id="+id;
        //     //console.log(id);
        //     connection.query(sql,(err,rows,fields)=>
        //     {
        //         if(!err)
        //             res.send(rows);
        //         else
        //             console.log('Error in Displaying')
        // })
		// })
		this.elements.root.dataset.id = id; //this id here |^
		this.elements.title.textContent = title;
		this.elements.items.appendChild(topDropZone);

		this.elements.addItem.addEventListener("click", () => {
			const newItem = KanbanAPI.insertItem(id, "");
			this.renderItem(newItem);
		});

		KanbanAPI.getItems(id).forEach(item => {
			this.renderItem(item);
		});
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

}

//loading data from json to a table
async function loadIntoTable(url, table) {
	const tableHead = table.querySelector("thead");
	const tableBody = table.querySelector("tbody");
	const response = await fetch(url);
	const {header, rows} = await response.json();

	//clear the table
	tableHead.innerHTML = "<tr></tr>";
	tableBody.innerHTML = "";

	//populate the header
	for (const headerText of headers){
		const headerElement = document.createElement("th");

		headerElement.textContent = headerText;
		tableHead.querySelector("tr").appendChild(headerElement);
	}

	//populate the rows
	for (const row of rows){
		const rowElement = document.createElement("td");

		for (const cellText of row){
			const cellElement = document.createElement("td");

			cellElement.textContent = cellText;
			rowElement.appendChild(cellElement);
		}

		tableBody.appendChild(rowElement);
	}
	loadIntoTable("./data.json", document.querySelector("table"));
}