export const search = {
  template: require("./search.html"),
  controller: ["$http", "$state", SearchCtrl],
  controllerAs: "vm",
  bindings: {
    $transition$: "<"
  }
};

let isSearching = false;

function SearchCtrl($http, $state) {
  const vm = this;

  vm.isPlaying = false;
  console.log($state);
  vm.onSearch = onSearch;
  vm.numberOfPages = numberOfPages;
  vm.currentPage;
  vm.pageSize = 10;
  vm.resultPage = [];
  // vm.previousPage = previousPage;
  // vm.nextPage = nextPage;
  vm.playPreview = playPreview;
  vm.preview = { audio: "", url: "" };
  vm.selectedMusic = null;
  vm.searchValue;

  this.$onInit = function() {
    console.log("isSearching: " + isSearching);
    isSearching = true;
    console.log("isSearching: " + isSearching);
    vm.searchValue = vm.$transition$.params().searchValue;
    // console.log("searchValue: " + vm.searchValue);

    vm.currentPage = parseInt(vm.$transition$.params().currentPage);
    // console.log("$transition$: " + vm.$transition$.params().currentPage);
    // console.log("vm.currentPage: " + vm.currentPage);
    onSearch();
  };

  let results;

  atualizeResults();
  console.log(this.results);

  // $document.on('mousemove', function (event) {
  //   atualizeResults();
  //   console.log("mouseMove");
  // });

  function atualizeResults() {
    results = vm.results;
  }

  function onSearch() {
    console.log(vm.searchValue);
    let result;
    $http
      .get(
        "https://localhost:5001/api/iTunes/search?term=" +
          vm.searchValue +
          "&limit=50"
      )
      .then(function(data) {
        result = data.data.results;
        vm.results = data.data.results;
        changeResultPage();
      });
    return result;
  }

  // function nextPage() {
  //   vm.currentPage = vm.currentPage + 1;
  //   changeResultPage();
  // }

  // function previousPage() {
  //   vm.currentPage = vm.currentPage - 1;
  //   changeResultPage();
  // }

  function changeResultPage() {
    vm.resultPage = [];
    console.log("Current page: " + vm.currentPage);
    for (let i = 0; i < 10 && i < vm.results.length; i++) {
      let position = i + 10 * vm.currentPage;
      console.log(position);
      vm.resultPage.push(vm.results[position]);
    }
    console.log("resultsPage: ");
    console.log(vm.resultPage);
  }

  function numberOfPages() {
    return Math.ceil(vm.results.length / vm.pageSize);
  }

  (function() {
    if (vm.preview.audio.paused) {
      vm.isPlaying = false;
    } else {
      vm.isPlaying = true;
    }
  });

  function playPreview(url) {
    if (vm.preview.url == url) {
      if (vm.isPlaying == false) {
        vm.preview.audio.play();
      } else {
        vm.preview.audio.pause();
      }
      vm.isPlaying = !vm.isPlaying;
    } else {
      if (vm.isPlaying == true) {
        vm.preview.audio.pause();
      }
      vm.preview.url = url;
      vm.preview.audio = new Audio(url);
      vm.preview.audio.play();
      vm.isPlaying = true;
    }
  }
}
