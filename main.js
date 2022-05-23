import Kanban from "./view/Kanban.js";
sessionStorage.clear();
//alert("Session Cleared")
// sessionStorage.clear();
new Kanban(
	document.querySelector(".kanban")
);

