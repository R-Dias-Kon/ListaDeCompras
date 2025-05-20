document.getElementById('exportList').onclick = exportList;

function exportList()
{
    /* take the value of every item and subitem */
    let totalItems = {};

        /* take every subitem*/
    let subitems = document.getElementsByClassName('subitem');
    for (let i = 0; i < subitems.length; ++i)
    {
        let subitem = subitems.item(i);

        subitemName      = document.getElementById(subitem.id+'_name').value;
        subitemQuantity  = Number(document.getElementById(subitem.id+'_quantity').value);
            /* multiply by recipe quantity */
            console.log(subitem.id.substring(0, subitem.id.indexOf('_')));
        subitemQuantity *= document.getElementById(subitem.id.substring(0, subitem.id.indexOf('_'))+'_quantity').value;

        if (subitemQuantity > 0)
            if (totalItems[subitemName] == null)
                totalItems[subitemName] = subitemQuantity;
            else
                totalItems[subitemName] += subitemQuantity;
    }
        /* take every item*/
    let items = document.getElementsByClassName('item');
    for (let i = 0; i < items.length; ++i)
    {
        let item = items.item(i);

        itemName      = document.getElementById(item.id+'_name').value;
        itemQuantity  = Number(document.getElementById(item.id+'_quantity').value);

        if (itemQuantity > 0)
            if (totalItems[itemName] == null)
                totalItems[itemName] = itemQuantity;
            else
                totalItems[itemName] += itemQuantity;
    }

    /* agreggate everything into a single string */
    let data = ''
    for (let item in totalItems)
    {
        /* make numbers align okay*/
        data += (`${item}${'........................'.slice(item.length)}${totalItems[item]}x\n`);
    }
    const textToBLOB = new Blob([data], {type: 'text/plain'})


    /* download file */
    let date = new Date();

    newdate = date.getUTCDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    let fileName = 'Lista_de_mercado_' + newdate + '.txt'; // The file to save the data.
    if (document.getElementById('listTitle').value != '')
        fileName = document.getElementById('listTitle').value;
    
    let newLink = document.createElement("a");
    newLink.download = fileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    } else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click();
}