import { Visualizer } from '@uirouter/visualizer';

export const states = [
  "$stateProvider",
  "$urlServiceProvider",
  ($stateProvider, $urlServiceProvider) => {
    const states = [
      {
        name: "songSearch",
        redirectTo: "songSearch.searchBar"
      },
      {
        name: "songSearch.searchBar",
        url: "/searchBar",
        component: "cSearchBar",
        redirectTo: "songSearch.searchBar.main"
      },
      {
        name: "songSearch.searchBar.main",
        url: "",
        component: "cMain"
      },
      {
        name: "songSearch.searchBar.search",
        url: "/search/:currentPage/:searchValue",
        component: "cSearch"
      },
      {
        name: "songSearch.searchBar.result",
        url: "/track/:trackId",
        component: "cResult"
      }
    ];
    states.forEach(state => $stateProvider.state(state));
    $urlServiceProvider.rules.otherwise({ state: "songSearch" });
  }
];

export const bootstrap = [
  "$uiRouter", 
  ($uiRouter) => {
    $uiRouter.plugin(Visualizer);
  }
];