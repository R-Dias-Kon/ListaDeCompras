document.getElementById('loadList').onclick = loadList;

document.getElementById('loadFile').onclick = function(){document.getElementById('inputFile').click();};

document.getElementById('inputFile').onchange = function(){
    if (document.getElementById('inputFile').files.length <= 0)
        document.getElementById('loadList').setAttribute('disabled', '');
    else
        document.getElementById('loadList').removeAttribute('disabled', '');
    };

function loadList()
{
    var json = document.getElementById('inputFile').files;

    if (json.length <= 0)
        return;
    
    var fr = new FileReader();

    fr.onload = function(e)
    {
        var obj = JSON.parse(e.target.result);
        var formatted = JSON.stringify(obj, null, 2);
        console.log(formatted);

        /* interpret the json objects */
        for (let i = 0; i < obj.length; ++i)
        {
            const item = obj[i];
            if (item['type'] == 'recipe')
            {
                const recipeId = addRecipe();
                document.getElementById(recipeId+'_name').setAttribute('value', item['name']);
                document.getElementById(recipeId+'_quantity').setAttribute('value', item['quantity']);
                for (let i = 0; i < item['subitems'].length; ++i)
                {
                    const subitem = item['subitems'][i];
                    const subitemId = addSubitem(document.getElementById(recipeId));
                    document.getElementById(subitemId+'_name').setAttribute('value', subitem['name']);
                    document.getElementById(subitemId+'_quantity').setAttribute('value', subitem['quantity']);
                }
            }
            else if(item['type'] == 'item')
            {
                const itemId = addItem();
                document.getElementById(itemId+'_name').setAttribute('value', item['name']);
                document.getElementById(itemId+'_quantity').setAttribute('value', item['quantity']);
            }
        }
    }
    fr.readAsText(json.item(0))

}