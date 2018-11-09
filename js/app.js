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
          redirectTo: "app.search"
        },
        {
          name: "app.search",
          url: "/search",
          component: "cSearch"
        },
        {
          name: "app.result",
          url: "/track/:trackId",
          component: "cResult"
        }
      ];
      states.forEach(state => $stateProvider.state(state));
      $urlServiceProvider.rules.otherwise({ state: "app" });
    }
  ]);
})();
