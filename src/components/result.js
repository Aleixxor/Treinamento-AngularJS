export const result = {
  template: require("./result.html"),
  controller: ["$http", "$state", ResultCtrl],
  controllerAs: "vm",
  bindings: {
    $transition$: "<"
  }
};

function ResultCtrl($http, $state) {
  const vm = this;
  vm.selectedMusic = {};
  vm.trackId = 0;
  vm.openPage = openPage;

  this.$onInit = function() {
    console.log("$onInit");
    vm.trackId = vm.$transition$.params().trackId;
    $http
      .get("https://localhost:5001/api/iTunes/search?term=" + vm.trackId)
      .then(function(res) {
        console.log(res.data.results[0]);
        vm.selectedMusic = res.data.results[0];
        vm.currentPage = 0;
      });
  };

  vm.isPlaying = false;
  vm.selectedMusic = null;

  function openPage(url) {
    console.log(vm.selectedMusic.trackViewUrl);
    window.open(url);
  }
}