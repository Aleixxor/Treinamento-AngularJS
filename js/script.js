var myApp = angular.module('songSearch', ['ui.router']);
var http, count = 0;

myApp.controller("listaMusicas", ['$http', listaMusicas]);

function listaMusicas($http){
  const vm = this;

  vm.isPlaying = false;

  vm.onSearch = onSearch;
  vm.numberOfPages = numberOfPages;
  vm.currentPage = 0;
  vm.pageSize = 10;
  vm.resultPage = [];
  vm.previousPage = previousPage;
  vm.nextPage = nextPage;
  vm.playPreview = playPreview;
  vm.preview = {audio: "", url: ""};

  this.searchBar;
  
  setValues($http);
  this.results = getResults();
  atualizeResults();
  console.log(this.results);

  // $document.on('mousemove', function (event) {
  //   atualizeResults();
  //   console.log("mouseMove");
  // });

  function atualizeResults(){
    results = getResults();
  }

  function setValues($http){
    this.http = $http;
  }
  
  function onSearch(){
    console.log(searchBar.value)
    var result;
    $http.get("https://localhost:5001/api/iTunes/search?term="+searchBar.value).then(function(data){
      result = data.data.results;
      vm.results = data.data.results;
      console.log(getResults());
      vm.currentPage = 0;
      changeResultPage();
    });
    return result;
  }
  
  function getResults(){
      if(vm.results == undefined){
          //results = [{"wrapperType":"","kind":"","artistId":0,"collectionId":0,"trackId":0,"artistName":"","collectionName":"","trackName":"","collectionCensoredName":"","trackCensoredName":"","artistViewUrl":"","collectionViewUrl":"","trackViewUrl":"","previewUrl":"","artworkUrl30":"","artworkUrl60":"","artworkUrl100":"","collectionPrice":0,"trackPrice":0,"releaseDate":"","collectionExplicitness":"","trackExplicitness":"","discCount":0,"discNumber":0,"trackCount":0,"trackNumber":0,"trackTimeMillis":0,"country":"","currency":"","primaryGenreName":"","isStreamable":false}]
      }
      console.log("getResults: ");
      console.log(vm.results);
      console.log("-----------------");
    return vm.results;
  }

  function nextPage(){
    vm.currentPage=vm.currentPage+1;
    changeResultPage();
  }

  function previousPage(){
    vm.currentPage=vm.currentPage-1;
    changeResultPage();
  }

  function changeResultPage(){
    vm.resultPage = [];
    console.log("Current page: "+vm.currentPage);
      for(var i = 0; (i<10 && i<vm.results.length); i++){
        var position = i+(10*vm.currentPage);
        console.log(position)
        vm.resultPage.push(vm.results[position]);
      }
      console.log("resultsPage: ");
      console.log(vm.resultPage);
  };

  function numberOfPages () {
      return Math.ceil(vm.results.length / vm.pageSize);
  }

  function playPreview(url){
    
    if(vm.preview.url == url){ 
      if(vm.isPlaying == false){
        vm.preview.audio.play();
      }else{
        vm.preview.audio.pause();
      }
      vm.isPlaying = !vm.isPlaying;
    }else{
      if(vm.isPlaying == true){
        vm.preview.audio.pause();
      }
      vm.preview.url = url;
      vm.preview.audio = new Audio(url);
      vm.preview.audio.play();
      vm.isPlaying = true;
    }
  }

}


  myApp.config(function ($stateProvider) {
    var searchState = {
      name: 'search',
      url: '/search',
      template: `
      <div class="co-12 topbar row">
          <div><input name="search_bar" type="text" id="searchBar" ng-model="vm.searchBar" class="co-10" placeholder="Search for music..."></div>
          <div type="button" class="searchButton center co-2" ng-click="vm.onSearch()">
              <i class="glyphicon glyphicon-search searchIcon"></i></div>
      </div>
      <div class="center">
          <div ng-repeat="music in vm.resultPage" ng-click="vm.playPreview(music.previewUrl)" class="co-10 alert alert-secondary result" role="alert">
              <div class="co-2" style="min-width: 86px">
                  <img style="border-radius: 5px; border: 1px solid #383d41" width="80px" src={{music.artworkUrl100}}>
              </div>
              
              <div style="padding-top:10px" class="co-9">
                  <h4 class="title">{{music.trackName}}</h4>
                  <span class="duration">{{music.primaryGenreName}}</span>
                  <br><span class="duration">{{music.kind}}</span>
                  <br>
                  <span class="artist">{{music.artistName}}</span>
              </div>
              <div class="co-1 playPreview">
                <span ng-if="(vm.isPlaying == false) || (music.previewUrl != vm.preview.url)" style="font-size: 40px;" class="glyphicon glyphicon-play"></span>
                <span ng-if="(vm.isPlaying == true) && (music.previewUrl == vm.preview.url)" style="font-size: 40px;" class="glyphicon glyphicon-pause"></span>
              </div>
          </div>
          <div ng-if="vm.results.length == 0 || vm.results == undefined" class="co-10 result animate-if">
              <i class="glyphicon glyphicon-exclamation-sign"></i> No results found
          </div>
          <br><br><br>
          <div ng-if="vm.results.length != undefined" class="co-12">
          <button ng-disabled="vm.currentPage == 0" ng-click="vm.previousPage()"> Previous </button>
            Page {{vm.currentPage+1}} of {{vm.numberOfPages()}}
          <button ng-disabled="vm.currentPage > ({{vm.numberOfPages()}}-2)" ng-click="vm.nextPage()">Next</button>
          </div>
      </div>`
    }
  
    var resultState = {
      name: 'result',
      url: '/result',
      template: `
      <div class="co-12 topbar row">
          <div><input name="search_bar" type="text" id="searchBar" ng-model="vm.searchBar" class="co-10" placeholder="Search for music..."></div>
          <div type="button" class="searchButton center co-2" ng-click="vm.onSearch()">
              <i class="glyphicon glyphicon-search searchIcon"></i></div>
      </div>
      <div class="center">
          <div ng-repeat="music in vm.resultPage" ng-click="vm.playPreview(music.previewUrl)" class="co-10 alert alert-secondary result" role="alert">
              <div class="co-2">
                  <img style="border-radius: 5px; border: 1px solid #383d41" width="80px" src={{music.artworkUrl100}}>
              </div>
              
              <div style="padding-top:10px" class="co-10">
                  <h4 class="title">{{music.trackName}}</h4>
                  <span class="duration" id="teste">{{music.primaryGenreName}}</span>
                  <br><br>
                  <span class="artist">{{music.artistName}}</span>
              </div>
          </div>
          <div ng-if="vm.results.length == 0 || vm.results == undefined" class="co-10 result animate-if">
              <i class="glyphicon glyphicon-exclamation-sign"></i> No results found
          </div>
          <br><br><br>
          <div ng-if="vm.results.length != undefined" class="co-12">
          <button ng-disabled="vm.currentPage == 0" ng-click="vm.previousPage()"> Previous </button>
            Page {{vm.currentPage+1}} of {{vm.numberOfPages()}}
          <button ng-disabled="vm.currentPage > ({{vm.numberOfPages()}}-2)" ng-click="vm.nextPage()">Next</button>
          </div>
      </div>`
    }
  
    $stateProvider.state(searchState);
    $stateProvider.state(resultState);
  });




// function PagerService(){
//   var service = {};

//   service.getPager = GetPager;
// }