const canvas = document.getElementById("canvas");

const bgColor = document.getElementById("background-color");
const paintColor = document.getElementById("pencil-color");
const toggleGrid = document.getElementById("toggle-grid");
const canvasSize = 512;

const pencil = document.getElementById("pencil");
const eraser = document.getElementById("eraser");
const darken = document.getElementById("darken");
const lighten = document.getElementById("lighten");

let gridSize = document.getElementById("grid-size").value;
let gridInput = document.getElementById("grid-size");

let gridsVisible = true;
let pencilColor = paintColor.value; 

let togglePencil = true;
let toggleEraser = false;toggleDarken = false;toggleLighten = false;




bgColor.value = "#ffffff";
CreateGrid();
TogglePencil();

GetColor(canvas);
function Draw(){
    let mouseDown = 0;
    canvas.onmousedown = function(e){
        mouseDown = 1;
        e.target.style.backgroundColor = pencilColor;
    
        if(mouseDown == 1){
            canvas.onmouseover = function(e){
                e.target.style.backgroundColor = pencilColor;
            }
        }
    
    }
    canvas.onmouseup = function(){
        mouseDown = 0;
        if(mouseDown == 0){
            canvas.onmouseover = function(e){
            }
        }
    
    
    }
}

function Erase(){
    let mouseDown = 0;
    canvas.onmousedown = function(e){
        mouseDown = 1;
        e.target.style.backgroundColor = bgColor.value;
    
        if(mouseDown == 1){
            canvas.onmouseover = function(e){
                e.target.style.backgroundColor = bgColor.value;

            }
        }
    
    }
    canvas.onmouseup = function(){
        mouseDown = 0;
        if(mouseDown == 0){
            canvas.onmouseover = function(e){

            }
        }
    
    
    }
}

function Darken(){
    let mouseDown = 0;
    canvas.onmousedown = function(e){
        mouseDown = 1;
        let color = GetColor(e.target);
        
        for(let i = 0 ; i < 3; i++){
            color[i] = Number(color[i]);
            color[i] -= 20;
        }

        for(let i = 0; i < 3; i++){
            color[i] = (color[i]);
        }
        e.target.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;

        if(mouseDown == 1){
            canvas.onmouseover = function(e){
                let color = GetColor(e.target);
        
                for(let i = 0 ; i < 3; i++){
                    color[i] = Number(color[i]);
                    color[i] -= 20;
                }

                for(let i = 0; i < 3; i++){
                    color[i] =(color[i]);
                }
                e.target.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;

            }
        }
    
    }
    canvas.onmouseup = function(){
        mouseDown = 0;
        if(mouseDown == 0){
            canvas.onmouseover = function(e){

            }
        }
    
    
    }
}
function Lighten(){
    
    let mouseDown = 0;
    canvas.onmousedown = function(e){
        mouseDown = 1;
        let color = GetColor(e.target);
        
        for(let i = 0 ; i < 3; i++){
            color[i] = Number(color[i]);
            color[i] += 20;
        }

        for(let i = 0; i < 3; i++){
            color[i] = (color[i]);
        }
        e.target.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;

        if(mouseDown == 1){
            canvas.onmouseover = function(e){
                let color = GetColor(e.target);
        
                for(let i = 0 ; i < 3; i++){
                    color[i] = Number(color[i]);
                    color[i] += 20;
                }

                for(let i = 0; i < 3; i++){
                    color[i] =(color[i]);
                }
                e.target.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`;
            }
        }
    
    }
    canvas.onmouseup = function(){
        mouseDown = 0;
        if(mouseDown == 0){
            canvas.onmouseover = function(e){

            }
        }
    
    
    }
};


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

function ChangePencilColor(){
    pencilColor = paintColor.value; 
}

function ToggleGrid(){
    Array.from(document.querySelectorAll('.pixel')).forEach(function(el) {
        el.classList.toggle('grid-visible');
        el.style.width = `${canvasSize/gridSize}px`;
        el.style.height = `${canvasSize/gridSize}px`;
    });
}

function TogglePencil(){
    togglePencil =true;
    toggleEraser, toggleDarken, toggleLighten = false;
    pencil.classList.add("selected");
    eraser.classList.remove("selected");
    lighten.classList.remove("selected");
    darken.classList.remove("selected");
    Draw();
}
function ToggleEraser(){
    toggleEraser =true;
    toggleDarken =false;
    togglePencil = false;
    toggleLighten = false;
    eraser.classList.add("selected");
    pencil.classList.remove("selected");
    lighten.classList.remove("selected");
    darken.classList.remove("selected");
    Erase();
}

function ToggleDarken(){
    toggleDarken =true;
    toggleEraser = false;
    togglePencil = false;
    toggleLighten = false;
    darken.classList.add("selected");
    pencil.classList.remove("selected");
    eraser.classList.remove("selected");
    lighten.classList.remove("selected");
    Darken();
}

function ToggleLighten(){
    toggleLighten = true;
    toggleDarken =false;
    toggleEraser = false;
    togglePencil = false;
    lighten.classList.add("selected");
    darken.classList.remove("selected");
    pencil.classList.remove("selected");
    eraser.classList.remove("selected");
    Lighten();
}


function GetColor(el){
    var rgb = window.getComputedStyle(el).backgroundColor;

    rgb = rgb.substring(4, rgb.length-1)
         .replace(/ /g, '')
         .split(',');

    return rgb;
}

function Clear(){
    DeleteGrid();
    CreateGrid();
}