document.getElementById('saveList').onclick = saveList;

function saveList()
{
    let data = "";
    /* write for the json goated formatting */

    data+= '[\n\t';

    totalItems = document.getElementsByTagName('li');

    /* when on a recipe activate this.
    this serves to sinalize that the recipe
    still needs to be closed (before subsequent items/recipes) */
    let onRecipe = false;
    for (let i = 0; i < totalItems.length; ++i)
    {
        item = totalItems.item(i);
        className = item.className;

        switch (className) {
            case 'recipe':
                if (onRecipe)
                {
                    data+= '\n\t\t]\n\t}';
                    onRecipe = false;
                }
                onRecipe = true;
                
                data+= (i==0 ? '' : ',') + `{
                "type" : "recipe",
                "name" : "${document.getElementById(item.id+'_name').value}",
                "quantity" : ${document.getElementById(item.id+'_quantity').value},
                "subitems" :
                [`

                break;

            case 'subitem':
                data+= (totalItems.item(i-1).className=='subitem' ? ',' : '') +
                `\n\t\t\t{"name" : "${document.getElementById(item.id+'_name').value}", "quantity" : ${document.getElementById(item.id+'_quantity').value}}`
                break;

            case 'item':
                if (onRecipe)
                {
                    data+= '\n\t\t]\n\t}';
                    onRecipe = false;
                }

                data+= (i==0 ? '' : ',') + `{\n
                "type" : "item",
                "name" : "${document.getElementById(item.id+'_name').value}",
                "quantity" : ${document.getElementById(item.id+'_quantity').value}\n}`
                break;

            default:
                break;
        }
    }
    /* if concluded the for loop but still onRecipe, close it. */
    if (onRecipe)
    {
        data+= '\n\t\t]\n\t}';
        onRecipe = false;
    }

    data+= '\n]';


    const textToBLOB = new Blob([data], { type: "text/plain" });

    /* ------------------------------------------------------------------------- */
    /* download file */
    let date = new Date();

    newdate = date.getUTCDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    const fileName = 'Lista_de_mercado_SAVE_' + newdate + '.json'; // The file to save the data.
    
    let newLink = document.createElement('a');

    newLink.download = fileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = 'none';
        document.body.appendChild(newLink);
    }

    newLink.click();
}