
export const searchBar = {
  template: require("./searchBar.html"),
  controller: ["$state", SearchBarCtrl],
  controllerAs: "vm",
};

function SearchBarCtrl($state) {
  const vm = this;
  vm.searchBar = "";
  this.$onInit = function() {
    console.log("$onInit");
  };
}
