/* eslint-disable import/no-duplicates */
require('./assets/style.css');

import angular from 'angular';
import uirouter from '@uirouter/angularjs';

import { main } from './components/main';
import { result } from './components/result';
import { search } from './components/search';
import { searchBar } from './components/searchBar';


angular
  .module('app', [uirouter])
  .config(config)
  .run(bootstrap)
  .component('cMain', main)
  .component('cResult', result)
  .component('cSearch', search)
  .component('cSearchBar', searchBar);