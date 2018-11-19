require('./assets/style.css');

import angular from 'angular';
import uirouter from '@uirouter/angularjs';

import { states, bootstrap } from './app.states';

import { main } from './components/main';
import { result } from './components/result';
import { search } from './components/search';
import { searchBar } from './components/searchBar';

angular 
  .module('songSearch', [uirouter])
  .config(states)
  .run(bootstrap)
  .component('cMain', main)
  .component('cResult', result)
  .component('cSearch', search)
  .component('cSearchBar', searchBar);
