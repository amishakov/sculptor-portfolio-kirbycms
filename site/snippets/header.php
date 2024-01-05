<!DOCTYPE html>
<html lang="<?= $kirby->language()->code() ?>">

<?php snippet('ascii') ?>

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?= snippet('seo/meta') ?>
  <?= css('assets/bundle/css/bundle.css') ?>

</head>

<body>

  <div id="<?= $page->intendedTemplate() ?>">

    <!-- header -->

    <header id="header">
      <?php if ($page->is("home")) : ?>
        <div id="header__logo">
          <h1><?= $site->title() ?></h1>
        </div>
        <div id="header__switches">

          <?php foreach ($kirby->languages() as $language) : ?>
            <?php if ($kirby->language() != $language) : ?>
              <a id="header__language-switch" href="<?= $page->url($language->code()) ?>">
                <?= ucfirst($language->code()) ?>
              </a>
            <?php endif ?>
          <?php endforeach ?>
          <span>/</span>
          <button id="header__color-switch">#</button>

        </div>
      <?php else : ?>
        <div id="header__logo">
          <h1 <?= e($page->is("about"), "id=info-hook", "") ?>>
            <?= $page->title() ?>
          </h1>
        </div>
        <a href="<?= $site->url() ?>">
          BACK
        </a>
      <?php endif ?>
    </header>