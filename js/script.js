const container = document.getElementById("container");
const grid = document.createElement("div");
const buttons = document.createElement("div");
const feedbackButton = document.createElement("button");
const gridSizeButton = document.createElement("button");
const gridClearButton = document.createElement("button");
const gridDichotomyButton = document.createElement("button");
const gridGradientButton = document.createElement("button");
const gridColorButton = document.createElement("button");
let box;
let R, G, B;
let gridSize = 16;
let gridArray = [];
let backColor = "rgb(255, 255, 255)";
let gridColorOption = "dichotomy";

container.appendChild(grid);
container.appendChild(buttons);
buttons.appendChild(feedbackButton);
buttons.appendChild(gridSizeButton);
buttons.appendChild(gridClearButton);
buttons.appendChild(gridDichotomyButton);
buttons.appendChild(gridGradientButton);
buttons.appendChild(gridColorButton);

buttons.style.display = "flex";
buttons.style.flexFlow = "column";
buttons.style.justifyItems = "center";
buttons.style.alignContent = "center";
buttons.style.margin = "5px";
Array.from(buttons.childNodes).forEach(e =>
{
    e.style.height = "100px";
    e.style.width = "200px";
    e.style.margin = "5px";
    e.style.textAlign = "center";
});

grid.style.display = "grid";
grid.style.height = "900px";
grid.style.width = "900px";
grid.style.borderStyle = "solid";
grid.style.borderWidth = "5px";
grid.style.borderColor = "#1f548c";

feedbackButton.textContent = "Grid Size: " + gridSize;
gridSizeButton.textContent = "New Grid";
gridClearButton.textContent = "Clear Grid";
gridDichotomyButton.textContent = "Style: Black";
gridGradientButton.textContent = "Style: Gradient";
gridColorButton.textContent = "Style: Color";

feedbackButton.disabled = true;
feedbackButton.style.color = "black";
feedbackButton.style.fontSize = "15px";
gridDichotomyButton.style.backgroundColor = "darkgrey";
gridDichotomyButton.style.fontSize = "20px";

createGrid();

gridSizeButton.addEventListener("click", () =>
{
    gridSizePrompt();
    while (grid.firstChild)
    {
        grid.removeChild(grid.firstChild);
    }
    createGrid()
    feedbackButton.textContent = "Grid Size: " + gridSize;
});
gridClearButton.addEventListener("click", () =>
{
    gridArray.forEach(e =>
    {
        e.style.backgroundColor = "rgb(255, 255, 255)";
    });
});
gridDichotomyButton.addEventListener("click", () =>
{
    gridDichotomyButton.style.backgroundColor = "darkgrey";
    gridDichotomyButton.style.fontSize = "20px";
    gridGradientButton.style.backgroundColor = "";
    gridGradientButton.style.fontSize = "";
    gridColorButton.style.backgroundColor = "";
    gridColorButton.style.fontSize = "";
    gridColorOption = "dichotomy";
});
gridGradientButton.addEventListener("click", () =>
{
    gridDichotomyButton.style.backgroundColor = "";
    gridDichotomyButton.style.fontSize = "";
    gridGradientButton.style.backgroundColor = "darkgrey";
    gridGradientButton.style.fontSize = "20px";
    gridColorButton.style.backgroundColor = "";
    gridColorButton.style.fontSize = "";
    gridColorOption = "gradient";
});
gridColorButton.addEventListener("click", () =>
{
    gridDichotomyButton.style.backgroundColor = "";
    gridDichotomyButton.style.fontSize = "";
    gridGradientButton.style.backgroundColor = "";
    gridGradientButton.style.fontSize = "";
    gridColorButton.style.backgroundColor = "darkgrey";
    gridColorButton.style.fontSize = "20px";
    gridColorOption = "color";
});
function gridSizePrompt()
{
    while (true)
    {
        gridSize = prompt("What size grid? (1 - 100): ", 16);
        gridSize = Number(gridSize);
        if (gridSize !== NaN && gridSize >= 1 && gridSize <= 100)
        {
            break;
        }
    }
}
function createGrid()
{
    grid.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)";
    grid.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)";
    
    for(let i = 0; i < (Math.pow(gridSize, 2)); i++)
    {
        box = document.createElement("div")
        box.classList.add("boxes");
        box.style.backgroundColor = "rgb(255, 255, 255)";
        grid.appendChild(box);
    }
    gridArray = Array.from(document.getElementsByClassName("boxes"));
    
    gridArray.forEach(element =>
    {
        element.addEventListener("mouseenter", () =>
        {
            switch (gridColorOption)
            {
                case "dichotomy":
                    gridDichotomy(element);
                    break;
                case "gradient":
                    gridGradient(element);
                    break;
                case "color":
                    gridColor(element);
                    break;
            }
        });
    });
}
function gridDichotomy(element)
{
    element.style.backgroundColor = "rgb(0, 0, 0)";
}
function gridGradient(element)
{
    backColor = element.style.backgroundColor;
    if (backColor != "rgb(5, 5, 5)" && backColor != "rgb(0, 0, 0)")
    {
        R = (backColor.slice(4, 7)) - 25;
        if (Number.isNaN(R))
        {
            R = (backColor.slice(4, 6)) - 25;
            if (Number.isNaN(R))
            {
                R = 0;
            }
        }
        G = (backColor.slice(9, 12)) - 25;
        if (Number.isNaN(G))
        {
            G = (backColor.slice(8, 10)) - 25;
            if (Number.isNaN(G))
            {
                G = 0;
            }
        }
        B = (backColor.slice(14, 17)) - 25;
        if (Number.isNaN(B))
        {
            B = (backColor.slice(12, 14)) - 25;
            if (Number.isNaN(B))
            {
                B = 0;
            }
        }
        element.style.backgroundColor = "rgb(" + R + ", " + G + ", " + B + ")";
    }else if (backColor == "rgb(5, 5, 5)")
    {
        element.style.backgroundColor = "rgb(0, 0, 0)";
    }
}
function gridColor(element)
{
    R = Math.floor(Math.random() * 255);
    G = Math.floor(Math.random() * 255);
    B = Math.floor(Math.random() * 255);
    element.style.backgroundColor = "rgb(" + R + ", " + G + ", " + B + ")";
}