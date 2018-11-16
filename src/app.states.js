(function() {
  const myApp = angular.module("songSearch", ["ui.router"]);

  //myApp.controller("listaMusicas", ['$http', '$state', SearchCtrl]);

  myApp.config([
    "$stateProvider",
    "$urlServiceProvider",
    ($stateProvider, $urlServiceProvider) => {
      const states = [
        {
          name: "app",
          redirectTo: "app.searchBar"
        },
        {
          name: "app.searchBar",
          url: "/searchBar",
          component: "cSearchBar",
          redirectTo: "app.searchBar.main"
        },
        {
          name: "app.searchBar.main",
          url: "",
          component: "cMain"
        },
        {
          name: "app.searchBar.search",
          url: "/search/:currentPage/:searchValue",
          component: "cSearch"
        },
        {
          name: "app.searchBar.result",
          url: "/track/:trackId",
          component: "cResult"
        }
      ];
      states.forEach(state => $stateProvider.state(state));
      $urlServiceProvider.rules.otherwise({ state: "app" });
    }
  ]);
})();
