export const exampleCode1 = `
<html lang="en">
<head>
    <title>Groceries List Example</title>
    <style>
        body { 
            color: white;                       /* Set default text color to white */
            background-color: black;            /* Set the webpage background to black */
        } 

        .ordered-list {
            display: flex;                      /* Set the display to flex */
            flex-direction: column;             /* Set the flex display to column; positioned the elements vertically in a column, allowing content to flow from top to bottom. */
        }

        .ordered-list div {
            font-family: Arial, sans-serif;     /* Set the font family */
            font-size: 18px;                    /* Set the font size */
            color: blanchedalmond;              /* Set the color of the text */
            margin-bottom: 10px;                /* Adds space between items */
        }
    </style>
</head>
<body>
    <h1>Top 5 Cities to Visit</h1>
    <div class="ordered-list">
        <div style="order: 3;">Bread</div>
        <div style="order: 1;">Eggs</div>
        <div style="order: 5;">Coffee</div>
        <div style="order: 2;">Cereal</div>
        <div style="order: 4;">Potatoes</div>
    </div>
</body>
</html>`;

export const exampleCode2Body = `
body {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding-left: 20%;
    padding-right: 20%;
}
`;


export const exampleCode2Title = `
.title {
    order: 1; 

    text-align: center;
}
`;

export const exampleCode2Navigation = `
.navigation {
    order: 2; 
    
    display: flex;
    justify-content: space-between;
}
`;

export const exampleCode2Content = 
`
.content {
    order: 3; 
}
`

export const exampleCode2Footer = `
.footer {
    order: 4; 

    text-align: center;
}
`;