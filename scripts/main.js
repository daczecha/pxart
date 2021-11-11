const canvas = document.getElementById("canvas");

const bgColor = document.getElementById("background-color")
const toggleGrid = document.getElementById("toggle-grid");
const canvasSize = 512;

let gridSize = document.getElementById("grid-size").value;
let gridInput = document.getElementById("grid-size");

let gridsVisible = true;


CreateGrid();


function CreateGrid(){
    for(let i=0; i<gridSize*gridSize;i++){
        let pixel = document.createElement("div");
        pixel.setAttribute("class","pixel grid-visible");
        pixel.style.width = `${canvasSize/gridSize}px`;
        pixel.style.height = `${canvasSize/gridSize}px`;
        pixel.style.backgroundColor = bgColor.value;
        canvas.appendChild(pixel);
    }
}
function DeleteGrid(){
    Array.from(document.querySelectorAll('.pixel')).forEach(function(pixel) {
        pixel.remove();
    });
}

function ChangeGrid(){ 
    gridSize = document.getElementById("grid-size").value;
    document.getElementById("grid-size-label").innerText = `${gridSize} X ${gridSize}`
    DeleteGrid();
    CreateGrid();
}


function ChangeBackgroundColor(){
    DeleteGrid();
    CreateGrid();
}

function ToggleGrid(){
    Array.from(document.querySelectorAll('.pixel')).forEach(function(el) {
        el.classList.toggle('grid-visible');
        el.style.width = `${canvasSize/gridSize}px`;
        el.style.height = `${canvasSize/gridSize}px`;
    });
    console.log("sdsd");
}