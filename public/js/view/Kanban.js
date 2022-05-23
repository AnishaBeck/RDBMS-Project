import Column from "./Column.js";
import KanbanAPI from "../api/KanbanAPI.js";

export default class Kanban {
	constructor(root) {
		this.root = root;
		
		
		
		var promise = Promise.resolve(Column.test1());
		promise.then(function(val) {
			console.log(val.length);
			for(var i=0; i<val.length;i++)
			{
				// console.log("A");
				console.log(val[i].title);
				if(val[i].progress==0)
				KanbanAPI.insertItem('1', val[i].title);
				else if(val[i].progress>0 && val[i].progress<100)
				KanbanAPI.insertItem('2', val[i].title);
				else
				KanbanAPI.insertItem('3', val[i].title);
				// this.elements.addItem.renderItem(newItem);
				console.log("A");
			}
			Kanban.columns().forEach(column => {
				const columnView = new Column(column.id, column.title);
	
				root.appendChild(columnView.elements.root);
			});
			});
			// if(i==1)
			// {
			// 	alert(i);
			// 	// KanbanAPI.getItems('1').forEach(item => {
			// 	// 	this.renderItem(item);
			// 	// });
	
			// 	// KanbanAPI.getItems('2').forEach(item => {
			// 	// 	this.renderItem(item);
			// 	// });
			// 	// KanbanAPI.getItems('3').forEach(item => {
			// 	// 	this.renderItem(item);
			// 	// });
				
			// }
			
	}

	static columns() {
		return [
			{
				id: 1,
				title: "To Do"
			},
			{
				id: 2,
				title: "In Progress"
			},
			{
				id: 3,
				title: "Done"
			}
		];
	}

	
}