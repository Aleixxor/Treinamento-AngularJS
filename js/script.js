var myApp = angular.module('songSearch', ['ui.router']);
var paginate, http;

myApp.controller("listaMusicas", ['$http', listaMusicas]);

function listaMusicas($http){

  this.searchBar;
  this.paginate = {};
  setValues($http);
  
  console.log(this.paginate);
}

function setValues($http){
  this.http = $http;
}

function onSearch(){
  console.log(this.searchBar.value)
  this.http.get("https://localhost:5001/api/iTunes/search?term="+this.searchBar.value).then(function(data){
    this.paginate = data.data.results;
    console.log(getPaginate());
  });
}

function getPaginate(){
  return this.paginate;
}


  myApp.config(function ($stateProvider) {
    var searchState = {
      name: 'search',
      url: '/search',
      template: `
      <div class="co-12 topbar row">
          <div><input name="search_bar" type="text" id="searchBar" ng-model="vm.searchBar" class="co-10" placeholder="Search for music..."></div>
          <div type="button" class="searchButton center co-2" onclick="onSearch()">
              <i class="glyphicon glyphicon-search searchIcon"></i></div>
      </div>
      <div class="center">
          <div  class="co-10 alert alert-secondary result" role="alert">
              <div class="co-2">
                  <img style="border-radius: 5px; border: 1px solid #383d41" width="80px" src="">
              </div>
              sadsad
              <div style="padding-top:10px" class="co-10">
                  <h4 class="title">asdasdasd</h4>
                  <span class="duration">asdasdsa</span>
                  <br><br>
                  <span class="artist">dsadasd</span>
              </div>
          </div>
          <div ng-if="vm.paginate.length == 0" ng-if="checked" class="co-10 result animate-if">
              <i class="glyphicon glyphicon-exclamation-sign"></i> No results found
          </div>
      </div>`
    }
  
    var resultState = {
      name: 'result',
      url: '/result',
      template: `<main>
      <section id="content" ng-controller="PaginationCtrl">
          <h3>Paginação</h3>
          <hr>
          <ul>
              <li ng-repeat="item in paginate.result.data">
                  {{item.id}} - {{item.name}}
              </li>
          </ul>
  
          <ul>
              <li>
                  <a href="" ng-click="paginate.prev()"><span aria-hidden="true">Anterior</span></a>
              </li>
              <li>
                  <a href="" ng-click="paginate.next()"><span aria-hidden="true">Próximo</span></a>
              </li>
          </ul>
  
          <p>Mostrando registros de {{paginate.result.from}} até {{paginate.result.to}} de um total de {{paginate.total}}</p>
      </section>
  </main>`
    }
  
    $stateProvider.state(searchState);
    $stateProvider.state(resultState);
  });



// function PagerService(){
//   var service = {};

//   service.getPager = GetPager;
// }