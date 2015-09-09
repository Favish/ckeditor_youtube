CKEditor Youtube Button Plugin for Drupal 8
===========================================

Dependencies:
------------
* CKEditor module provided by Drupal core
* Youtube CKEditor plugin via bower (http://ckeditor.com/addon/youtube)

Installation:
------------
* Clone/download this module and place it in the modules directory of your project
* Run `bower install` in the root of this directory to fetch dependencies, the main one being the CKEditor Youtube plugin
* Enable module either via `drush en ckeditor_youtube` in your terminal in the context of your Drupal installation or in the admin UI at /admin/modules.
* Choose a text format at /admin/config/content/formats where you'd like to enable the button and drag the button onto the active toolbar
