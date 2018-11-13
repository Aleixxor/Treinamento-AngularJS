(function() {
    angular.module("songSearch").component("cMain", {
      templateUrl: "/pages/main.html",
      controller: ["$state", MainCtrl],
      controllerAs: "vm",
    });
  
    function MainCtrl($state) {
      const vm = this;
      
      this.$onInit = function() {
        console.log("$onInit");
        
      };
    }
  })();
  