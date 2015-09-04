<?php

/**
 * @file
 * Definition of \Drupal\ckeditor_youtube\Plugin\CKEditorPlugin\YouTubeButton.
 */

namespace Drupal\ckeditor_youtube\Plugin\CKEditorPlugin;

use Drupal\ckeditor\CKEditorPluginInterface;
use Drupal\ckeditor\CKEditorPluginButtonsInterface;
use Drupal\Component\Plugin\PluginBase;
use Drupal\editor\Entity\Editor;

/**
 * Defines the "YouTubeButton" plugin.
 *
 * @CKEditorPlugin(
 *   id = "you_tube_button",
 *   label = @Translation("YouTubeButton")
 * )
 */
class YouTubeButton extends PluginBase implements CKEditorPluginInterface, CKEditorPluginButtonsInterface {
  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getDependencies().
   */
  function getDependencies(Editor $editor) {
    return array();
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getLibraries().
   */
  function getLibraries(Editor $editor) {
    return array();
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::isInternal().
   */
  function isInternal() {
    return FALSE;
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getFile().
   */
  function getFile() {
    return drupal_get_path('module', 'ckeditor_youtube') . '/js/plugins/youtube/youtube/plugin.js';
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginButtonsInterface::getButtons().
   */
  function getButtons() {
    return array(
      'YouTube' => array(
        'label' => t('YouTube'),
        'image' => drupal_get_path('module', 'ckeditor_youtube') . '/js/plugins/youtube/youtube/images/icon.png'
      )
    );
  }

  /**
   * Implements \Drupal\ckeditor\Plugin\CKEditorPluginInterface::getConfig().
   */
  public function getConfig(Editor $editor) {
    return array();
  }
}