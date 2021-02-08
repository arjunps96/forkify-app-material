import { API_URL, PER_PAGE_RESULTS, API_KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';
export const state = {
  receipe: {},
  search: {
    query: '',
    page: 1,
    resultsPerPage: PER_PAGE_RESULTS,
    results: [],
  },
  bookmark: [],
};
const CreateRecipeObject = function (data) {
  const { recipe } = data.data;
  //console.log(recipe);
  return {
    id: recipe.id,
    publisher: recipe.publisher,
    time: recipe.cooking_time,
    serving: recipe.servings,
    sourceURL: recipe.source_url,
    ingredients: recipe.ingredients,
    img: recipe.image_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const url = `${API_URL}${id}?key=${API_KEY}`;
    const data = await getJSON(url);
    //console.log(data);
    state.receipe = CreateRecipeObject(data);

    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.receipe.bookmarked = true;
    //console.log(recipe);
  } catch (error) {
    //console.log(error);
    throw error;
  }
};

export const loadSearchResult = async function (query) {
  try {
    const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);

    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        publisher: res.publisher,
        img: res.image_url,
        title: res.title,
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  //console.log(state.receipe.ingredients);
  state.receipe.ingredients.forEach(ing => {
    //console.log(state.receipe.servings);
    ing.quantity = (ing.quantity * newServings) / state.receipe.serving;
    //console.log(ing.quantity);
  });
  state.receipe.serving = newServings;
};

const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmark));
};

export const addBookmark = function (recipe) {
  state.bookmark.push(recipe);
  if (recipe.id === state.receipe.id) {
    state.receipe.bookmarked = true;
  }
  persistBookmark();
};

export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(el => {
    el.id === id;
  });

  state.bookmark.splice(index, 1);
  if (id === state.receipe.id) {
    state.receipe.bookmarked = false;
  }
  persistBookmark();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmark = JSON.parse(storage);
};
init();

export const uploadReceipe = async function (data) {
  try {
    //console.log(data);
    //console.log(Object.entries(data));
    const ingredients = Object.entries(data)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(entry => {
        const ingArr = entry[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Invalid receipe format!Please use the correct format'
          );
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit: unit,
          description: description,
        };
      });
    const uploadData = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients,
    };
    //console.log(uploadData);
    const res = await sendJSON(`${API_URL}?key=${API_KEY}`, uploadData);
    //console.log(res);
    state.receipe = CreateRecipeObject(res);
    addBookmark(state.receipe);
  } catch (err) {
    throw err;
  }
};
