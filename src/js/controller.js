import icons from 'url:../img/icons.svg';
import * as model from '../js/model.js';
import Receipeview from '../view/receipeView';
import Serachview from '../view/searchView.js';
import resultView from '../view/ResultsView.js';
import PaginationView from '../view/Paginationview';
import ResultsView from '../view/ResultsView.js';
//import bookmarkView from '../view/BookmarkView.js';
import { PAGE_LOAD_SEC } from './config.js';
import BookmarkView from '../view/BookmarkView.js';
import addReceipe from '../view/addReceipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showReceipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    await model.loadRecipe(id);

    Receipeview.showSpinner();
    ResultsView.update(model.getSearchResultPage());

    //const { recipe } = model.state;
    Receipeview.render(model.state.receipe);

    BookmarkView.update(model.state.bookmark);
  } catch (error) {
    //console.error(error);
    Receipeview.renderErorrMessage(error.status);
  }
};
//showReceipe();

const controlSearchResults = async function () {
  //GetSerach results
  const query = Serachview.getQuery();
  //Load SerachResults
  await model.loadSearchResult(query);
  //console.log(model.state.search.results);
  resultView.showSpinner();
  resultView.render(model.getSearchResultPage());
  //Render pAge
  PaginationView.render(model.state.search);
};
const controlPagination = function (gotoPage) {
  //RenderNewResultsSearch
  console.log(gotoPage);
  resultView.render(model.getSearchResultPage(gotoPage));
  //Render New pagination
  PaginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  model.updateServings(newServings);

  Receipeview.update(model.state.receipe);
};
const controlAddBookmark = function () {
  //console.log(model.state.receipe.bookmarked);
  if (!model.state.receipe.bookmarked) {
    model.addBookmark(model.state.receipe);
  } else {
    model.deleteBookmark(model.state.receipe.id);
  }

  //console.log(model.state);
  //1)upadtes receipe
  Receipeview.update(model.state.receipe);
  //2)Add bookmark
  BookmarkView.render(model.state.bookmark);
};

const controlBookmark = function () {
  BookmarkView.render(model.state.bookmark);
};

const controlAddnewReceipe = async function (data) {
  //console.log(data);
  try {
    //1)Add spinner
    addReceipe.showSpinner();
    //2)Update state.receipe
    await model.uploadReceipe(data);
    //3)Render receipe
    Receipeview.render(model.state.receipe);
    //4)Render teh success message
    addReceipe.renderMessage();
    //5Page load time

    setTimeout(function () {
      addReceipe.toggleWindow();
    }, PAGE_LOAD_SEC * 1000);
    //6render bookmark
    BookmarkView.render(model.state.bookmark);
    console.log(model.state.receipe);

    //add idto URL
    window.history.pushState(null, '', `#${model.state.receipe.id}`);
  } catch (err) {
    addReceipe.renderErorrMessage(err.message);
  }
};
const init = function () {
  BookmarkView.addhandlerBookmark(controlBookmark);
  Receipeview.addHandlerReceipe(showReceipe);
  Receipeview.addHandlerUpdateServings(controlServings);
  Receipeview.addHandlerBookmark(controlAddBookmark);
  Serachview.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  addReceipe._addHandlerUpload(controlAddnewReceipe);
};
init();

//controlSearchResults('pizza');
