let items = 0;
let recipes = 0;

let subitems = {};

document.getElementById('addItem').onclick = addItem;
function addItem(e)
{
    e.preventDefault();

    let list = document.getElementById('list');

    let item = document.createElement('li');
    item.classList.add('item');
    item.id = `item${items++}`;

    let itemName = document.createElement('input');
    itemName.classList.add('itemName');
    itemName.id = item.id+'_name';
    itemName.setAttribute('name'    , item.id+'_name'       );
    itemName.setAttribute('type'           , 'text'         );
    itemName.setAttribute('placeholder'    , 'Item'         );
    itemName.setAttribute('required'   , ''                 );
    
    let quantity = document.createElement('input');
    quantity.classList.add('quantity');
    quantity.id = item.id+'_quantity';
    quantity.setAttribute('name'       , item.id+'_quantity');
    quantity.setAttribute('type'       , 'number'           );
    quantity.setAttribute('value'      , 0                  );
    quantity.setAttribute('min'        , 0                  );
    quantity.setAttribute('max'        , 99                 );
    quantity.setAttribute('placeholder', 'quantidade'       );
    quantity.setAttribute('required'   , ''                 );

    let removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.id = item.id+'_remove';
    removeButton.classList.add('remove');
    removeButton.append('-');

    removeButton.onclick = function(){removeElementById(item.id)};

    item.append(itemName    );
    item.append(quantity    );
    item.append(removeButton);

    list.append(item        );

}

document.getElementById('addRecipe').onclick = addRecipe;
function addRecipe(e)
{
    e.preventDefault();

    let list = document.getElementById('list');

    let recipe = document.createElement('li');
    recipe.classList.add('recipe');
    subitems[recipes] = 0;
    recipe.id = `recipe${recipes++}`;

    let recipeName = document.createElement('input');
    recipeName.classList.add('recipeName');
    recipeName.id = recipe.id+'_name';
    recipeName.setAttribute('name'    , recipe.id+'_name'   );
    recipeName.setAttribute('type'           , 'text'       );
    recipeName.setAttribute('placeholder'    , 'Receita'    );
    recipeName.setAttribute('required'   , ''                 );
    
    let addSubitemButton = document.createElement('button');
    addSubitemButton.setAttribute('type', 'button');
    addSubitemButton.id = recipe.id+'_addSubitem';
    addSubitemButton.classList.add('addSubitem');
    addSubitemButton.append('+');

    let quantity = document.createElement('input');
    quantity.classList.add('quantity');
    quantity.id = recipe.id+'_quantity';
    quantity.setAttribute('name'       , recipe.id+'_quantity');
    quantity.setAttribute('type'       , 'number'           );
    quantity.setAttribute('value'      , 0                  );
    quantity.setAttribute('min'        , 0                  );
    quantity.setAttribute('max'        , 99                 );
    quantity.setAttribute('placeholder', 'quantidade'       );
    quantity.setAttribute('required'   , ''                 );

    let removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.id = recipe.id+'_remove';
    removeButton.classList.add('remove');
    removeButton.append('-');

    let subitemList = document.createElement('ol');
    subitemList.classList.add('subitem_list');
    subitemList.id = `${recipe.id}_subitem_list`;

    removeButton.onclick = function(){removeElementById(recipe.id)};

    recipe.append(recipeName      );
    recipe.append(addSubitemButton);
    recipe.append(quantity        );
    recipe.append(removeButton    );
    recipe.append(subitemList     );

    list.append(recipe      );

    document.getElementById(recipe.id+'_addSubitem').onclick = function(){addSubitem(recipe)};
}

function addSubitem(recipe)
{
    let list = document.getElementById(`${recipe.id}_subitem_list`);

    let subitem = document.createElement('li');
    subitem.classList.add('subitem');
    /* the subitems index matches with the number in the recipe id */
    subitem.id = `${recipe.id}_subitem${subitems[recipe.id.slice(6)]++}`;

    let subitemName = document.createElement('input');
    subitemName.classList.add('subitemName');
    subitemName.id = subitem.id+'_name';
    subitemName.setAttribute('name'    , subitem.id+'_name');
    subitemName.setAttribute('type'           , 'text'               );
    subitemName.setAttribute('placeholder'    , 'Sub-item'           );
    subitemName.setAttribute('required'   , ''                       );
    
    let quantity = document.createElement('input');
    quantity.classList.add('quantity');
    quantity.id = subitem.id+'_quantity';
    quantity.setAttribute('name'       , subitem.id+'_quantity');
    quantity.setAttribute('type'       , 'number'                        );
    quantity.setAttribute('value'      , 0                               );
    quantity.setAttribute('min'        , 0                               );
    quantity.setAttribute('max'        , 99                              );
    quantity.setAttribute('placeholder', 'quantidade'                    );
    quantity.setAttribute('required'   , ''                              );

    let removeButton = document.createElement('button');
    removeButton.setAttribute('type', 'button');
    removeButton.id = recipe.id+subitem.id+'_remove';
    removeButton.classList.add('remove');
    removeButton.append('-');

    removeButton.onclick = function(){removeElementById(subitem.id)};

    subitem.append(subitemName );
    subitem.append(quantity    );
    subitem.append(removeButton);

    list.append(subitem);
}

function removeElementById(id)
{
    document.getElementById(id).remove();
}