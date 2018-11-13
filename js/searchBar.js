(function() {
    angular.module("songSearch").component("cSearchBar", {
      templateUrl: "/pages/searchBar.html",
      controller: ["$state", SearchBarCtrl],
      controllerAs: "vm",
      bindings: {
        $transition$: "<"
      }
    });
  
    function SearchBarCtrl($state) {
      const vm = this;
      
      this.$onInit = function() {
        console.log("$onInit");
        
      };
    }
  })();
  