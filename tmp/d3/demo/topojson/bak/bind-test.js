  


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>topojson/test/bind-test.js at feature · mbostock/topojson · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <link rel="logo" type="image/svg" href="http://github-media-downloads.s3.amazonaws.com/github-logo.svg" />
    <link rel="xhr-socket" href="/_sockets">
    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">

    
    
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="RH1JmtFt52UgbMFE7w1DGLJx2SgB6Y9OBlj1Qk7ywAc=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/assets/github-4334cb7dec4f109f47eceb21f97b58ea0351cf7f.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/assets/github2-c15137b0b05c94db05fa047ecd589d7a7df41d85.css" media="all" rel="stylesheet" type="text/css" />
    


      <script src="https://a248.e.akamai.net/assets.github.com/assets/frameworks-010d500708696b4ecee44478b5229d626367e844.js" type="text/javascript"></script>
      <script src="https://a248.e.akamai.net/assets.github.com/assets/github-d0f76964f2a7dfb9b87493f279d45019ffeeec05.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="0f49408cf31e37c6332aafbd3d4e4423">

        <link data-pjax-transient rel='permalink' href='/mbostock/topojson/blob/d152bc660f0d2470f6bab7dd3981f246c7c1cd35/test/bind-test.js'>
    <meta property="og:title" content="topojson"/>
    <meta property="og:type" content="githubog:gitrepository"/>
    <meta property="og:url" content="https://github.com/mbostock/topojson"/>
    <meta property="og:image" content="https://secure.gravatar.com/avatar/005a27e09fe946ebef64bf4d134efc0a?s=420&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png"/>
    <meta property="og:site_name" content="GitHub"/>
    <meta property="og:description" content="topojson - An extension to GeoJSON that encodes topology."/>
    <meta property="twitter:card" content="summary"/>
    <meta property="twitter:site" content="@GitHub">
    <meta property="twitter:title" content="mbostock/topojson"/>

    <meta name="description" content="topojson - An extension to GeoJSON that encodes topology." />

  <link href="https://github.com/mbostock/topojson/commits/feature.atom" rel="alternate" title="Recent Commits to topojson:feature" type="application/atom+xml" />

  </head>


  <body class="logged_out page-blob windows vis-public env-production  ">
    <div id="wrapper">

      

      
      
      

      
      <div class="header header-logged-out">
  <div class="container clearfix">

      <a class="header-logo-wordmark" href="https://github.com/">Github</a>

    <div class="header-actions">
        <a class="button primary" href="https://github.com/signup">Sign up for free</a>
      <a class="button" href="https://github.com/login?return_to=%2Fmbostock%2Ftopojson%2Fblob%2Ffeature%2Ftest%2Fbind-test.js">Sign in</a>
    </div>

      <ul class="top-nav">
          <li class="explore"><a href="https://github.com/explore">Explore GitHub</a></li>
        <li class="search"><a href="https://github.com/search">Search</a></li>
        <li class="features"><a href="https://github.com/features">Features</a></li>
          <li class="blog"><a href="https://github.com/blog">Blog</a></li>
      </ul>

  </div>
</div>


      

      


            <div class="site hfeed" itemscope itemtype="http://schema.org/WebPage">
      <div class="hentry">
        
        <div class="pagehead repohead instapaper_ignore readability-menu ">
          <div class="container">
            <div class="title-actions-bar">
              


<ul class="pagehead-actions">



    <li>
      <a href="/login?return_to=%2Fmbostock%2Ftopojson"
        class="minibutton js-toggler-target star-button entice tooltipped upwards"
        title="You must be signed in to use this feature" rel="nofollow">
        <span class="mini-icon mini-icon-star"></span>Star
      </a>
      <a class="social-count js-social-count" href="/mbostock/topojson/stargazers">
        363
      </a>
    </li>
    <li>
      <a href="/login?return_to=%2Fmbostock%2Ftopojson"
        class="minibutton js-toggler-target fork-button entice tooltipped upwards"
        title="You must be signed in to fork a repository" rel="nofollow">
        <span class="mini-icon mini-icon-fork"></span>Fork
      </a>
      <a href="/mbostock/topojson/network" class="social-count">
        64
      </a>
    </li>
</ul>

              <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
                <span class="repo-label"><span>public</span></span>
                <span class="mega-icon mega-icon-public-repo"></span>
                <span class="author vcard">
                  <a href="/mbostock" class="url fn" itemprop="url" rel="author">
                  <span itemprop="title">mbostock</span>
                  </a></span> /
                <strong><a href="/mbostock/topojson" class="js-current-repository">topojson</a></strong>
              </h1>
            </div>

            
  <ul class="tabs">
    <li><a href="/mbostock/topojson/tree/feature" class="selected" highlight="repo_source repo_downloads repo_commits repo_tags repo_branches">Code</a></li>
    <li><a href="/mbostock/topojson/network" highlight="repo_network">Network</a></li>
    <li><a href="/mbostock/topojson/pulls" highlight="repo_pulls">Pull Requests <span class='counter'>0</span></a></li>

      <li><a href="/mbostock/topojson/issues" highlight="repo_issues">Issues <span class='counter'>2</span></a></li>

      <li><a href="/mbostock/topojson/wiki" highlight="repo_wiki">Wiki</a></li>


    <li><a href="/mbostock/topojson/graphs" highlight="repo_graphs repo_contributors">Graphs</a></li>


  </ul>
  
<div class="tabnav">

  <span class="tabnav-right">
    <ul class="tabnav-tabs">
          <li><a href="/mbostock/topojson/tags" class="tabnav-tab" highlight="repo_tags">Tags <span class="counter ">36</span></a></li>
    </ul>
    
  </span>

  <div class="tabnav-widget scope">


    <div class="select-menu js-menu-container js-select-menu js-branch-menu">
      <a class="minibutton select-menu-button js-menu-target" data-hotkey="w" data-ref="feature">
        <span class="mini-icon mini-icon-branch"></span>
        <i>branch:</i>
        <span class="js-select-button">feature</span>
      </a>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container">

        <div class="select-menu-modal">
          <div class="select-menu-header">
            <span class="select-menu-title">Switch branches/tags</span>
            <span class="mini-icon mini-icon-remove-close js-menu-close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-filters">
            <div class="select-menu-text-filter">
              <input type="text" id="commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
            </div>
            <div class="select-menu-tabs">
              <ul>
                <li class="select-menu-tab">
                  <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
                </li>
                <li class="select-menu-tab">
                  <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
                </li>
              </ul>
            </div><!-- /.select-menu-tabs -->
          </div><!-- /.select-menu-filters -->

          <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket css-truncate" data-tab-filter="branches">

            <div data-filterable-for="commitish-filter-field" data-filterable-type="substring">

                <div class="select-menu-item js-navigation-item js-navigation-target selected">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/feature/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="feature" rel="nofollow" title="feature">feature</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/master/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="master" rel="nofollow" title="master">master</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/round/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="round" rel="nofollow" title="round">round</a>
                </div> <!-- /.select-menu-item -->
            </div>

              <div class="select-menu-no-results">Nothing to show</div>
          </div> <!-- /.select-menu-list -->


          <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket css-truncate" data-tab-filter="tags">
            <div data-filterable-for="commitish-filter-field" data-filterable-type="substring">

                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v1.0.0/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v1.0.0" rel="nofollow" title="v1.0.0">v1.0.0</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.39/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.39" rel="nofollow" title="v0.0.39">v0.0.39</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.38/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.38" rel="nofollow" title="v0.0.38">v0.0.38</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.37/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.37" rel="nofollow" title="v0.0.37">v0.0.37</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.36/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.36" rel="nofollow" title="v0.0.36">v0.0.36</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.35/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.35" rel="nofollow" title="v0.0.35">v0.0.35</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.34/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.34" rel="nofollow" title="v0.0.34">v0.0.34</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.33/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.33" rel="nofollow" title="v0.0.33">v0.0.33</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.32/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.32" rel="nofollow" title="v0.0.32">v0.0.32</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.31/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.31" rel="nofollow" title="v0.0.31">v0.0.31</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.30/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.30" rel="nofollow" title="v0.0.30">v0.0.30</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.29/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.29" rel="nofollow" title="v0.0.29">v0.0.29</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.28/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.28" rel="nofollow" title="v0.0.28">v0.0.28</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.27/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.27" rel="nofollow" title="v0.0.27">v0.0.27</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.26/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.26" rel="nofollow" title="v0.0.26">v0.0.26</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.25/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.25" rel="nofollow" title="v0.0.25">v0.0.25</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.24/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.24" rel="nofollow" title="v0.0.24">v0.0.24</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.23/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.23" rel="nofollow" title="v0.0.23">v0.0.23</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.22/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.22" rel="nofollow" title="v0.0.22">v0.0.22</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.21/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.21" rel="nofollow" title="v0.0.21">v0.0.21</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.20/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.20" rel="nofollow" title="v0.0.20">v0.0.20</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.19/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.19" rel="nofollow" title="v0.0.19">v0.0.19</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.18/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.18" rel="nofollow" title="v0.0.18">v0.0.18</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.17/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.17" rel="nofollow" title="v0.0.17">v0.0.17</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.16/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.16" rel="nofollow" title="v0.0.16">v0.0.16</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.15/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.15" rel="nofollow" title="v0.0.15">v0.0.15</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.14/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.14" rel="nofollow" title="v0.0.14">v0.0.14</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.13/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.13" rel="nofollow" title="v0.0.13">v0.0.13</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.12/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.12" rel="nofollow" title="v0.0.12">v0.0.12</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.11/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.11" rel="nofollow" title="v0.0.11">v0.0.11</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.10/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.10" rel="nofollow" title="v0.0.10">v0.0.10</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.9/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.9" rel="nofollow" title="v0.0.9">v0.0.9</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.8/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.8" rel="nofollow" title="v0.0.8">v0.0.8</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.7/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.7" rel="nofollow" title="v0.0.7">v0.0.7</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.6/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.6" rel="nofollow" title="v0.0.6">v0.0.6</a>
                </div> <!-- /.select-menu-item -->
                <div class="select-menu-item js-navigation-item js-navigation-target ">
                  <span class="select-menu-item-icon mini-icon mini-icon-confirm"></span>
                  <a href="/mbostock/topojson/blob/v0.0.5/test/bind-test.js" class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target" data-name="v0.0.5" rel="nofollow" title="v0.0.5">v0.0.5</a>
                </div> <!-- /.select-menu-item -->
            </div>

            <div class="select-menu-no-results">Nothing to show</div>

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

  </div> <!-- /.scope -->

  <ul class="tabnav-tabs">
    <li><a href="/mbostock/topojson/tree/feature" class="selected tabnav-tab" highlight="repo_source">Files</a></li>
    <li><a href="/mbostock/topojson/commits/feature" class="tabnav-tab" highlight="repo_commits">Commits</a></li>
    <li><a href="/mbostock/topojson/branches" class="tabnav-tab" highlight="repo_branches" rel="nofollow">Branches <span class="counter ">3</span></a></li>
  </ul>

</div>

  
  
  


            
          </div>
        </div><!-- /.repohead -->

        <div id="js-repo-pjax-container" class="container context-loader-container" data-pjax-container>
          


<!-- blob contrib key: blob_contributors:v21:bcf1dcf7c17c0040300d004ab1b89c00 -->
<!-- blob contrib frag key: views10/v8/blob_contributors:v21:bcf1dcf7c17c0040300d004ab1b89c00 -->


<div id="slider">
    <div class="frame-meta">

      <p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

        <div class="breadcrumb">
          <span class='bold'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/mbostock/topojson/tree/feature" class="js-slide-to" data-branch="feature" data-direction="back" itemscope="url"><span itemprop="title">topojson</span></a></span></span><span class="separator"> / </span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/mbostock/topojson/tree/feature/test" class="js-slide-to" data-branch="feature" data-direction="back" itemscope="url"><span itemprop="title">test</span></a></span><span class="separator"> / </span><strong class="final-path">bind-test.js</strong> <span class="js-zeroclipboard zeroclipboard-button" data-clipboard-text="test/bind-test.js" data-copied-hint="copied!" title="copy to clipboard"><span class="mini-icon mini-icon-clipboard"></span></span>
        </div>

      <a href="/mbostock/topojson/find/feature" class="js-slide-to" data-hotkey="t" style="display:none">Show File Finder</a>


        <div class="commit commit-loader file-history-tease js-deferred-content" data-url="/mbostock/topojson/contributors/feature/test/bind-test.js">
          Fetching contributors…

          <div class="participation">
            <p class="loader-loading"><img alt="Octocat-spinner-32-eaf2f5" height="16" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-32-EAF2F5.gif?1340659511" width="16" /></p>
            <p class="loader-error">Cannot retrieve contributors at this time</p>
          </div>
        </div>

    </div><!-- ./.frame-meta -->

    <div class="frames">
      <div class="frame" data-permalink-url="/mbostock/topojson/blob/d152bc660f0d2470f6bab7dd3981f246c7c1cd35/test/bind-test.js" data-title="topojson/test/bind-test.js at feature · mbostock/topojson · GitHub" data-type="blob">

        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><b class="mini-icon mini-icon-text-file"></b></span>
                <span class="mode" title="File Mode">file</span>
                  <span>33 lines (29 sloc)</span>
                <span>1.195 kb</span>
              </div>
              <div class="actions">
                <div class="button-group">
                      <a class="minibutton js-entice" href=""
                         data-entice="You must be signed in and on a branch to make or propose changes">Edit</a>
                  <a href="/mbostock/topojson/raw/feature/test/bind-test.js" class="button minibutton " id="raw-url">Raw</a>
                    <a href="/mbostock/topojson/blame/feature/test/bind-test.js" class="button minibutton ">Blame</a>
                  <a href="/mbostock/topojson/commits/feature/test/bind-test.js" class="button minibutton " rel="nofollow">History</a>
                </div><!-- /.button-group -->
              </div><!-- /.actions -->

            </div>
                <div class="blob-wrapper data type-javascript js-blob-data">
      <table class="file-code file-diff">
        <tr class="file-code-line">
          <td class="blob-line-nums">
            <span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>

          </td>
          <td class="blob-line-code">
                  <div class="highlight"><pre><div class='line' id='LC1'><span class="kd">var</span> <span class="nx">vows</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">&quot;vows&quot;</span><span class="p">),</span></div><div class='line' id='LC2'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">assert</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">&quot;assert&quot;</span><span class="p">),</span></div><div class='line' id='LC3'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">topojson</span> <span class="o">=</span> <span class="nx">require</span><span class="p">(</span><span class="s2">&quot;../&quot;</span><span class="p">);</span></div><div class='line' id='LC4'><br/></div><div class='line' id='LC5'><span class="kd">var</span> <span class="nx">suite</span> <span class="o">=</span> <span class="nx">vows</span><span class="p">.</span><span class="nx">describe</span><span class="p">(</span><span class="s2">&quot;topojson.bind&quot;</span><span class="p">);</span></div><div class='line' id='LC6'><br/></div><div class='line' id='LC7'><span class="nx">suite</span><span class="p">.</span><span class="nx">addBatch</span><span class="p">({</span></div><div class='line' id='LC8'>&nbsp;&nbsp;<span class="s2">&quot;bind&quot;</span><span class="o">:</span> <span class="p">{</span></div><div class='line' id='LC9'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">topic</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC10'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="nx">topojson</span><span class="p">.</span><span class="nx">bind</span><span class="p">;</span></div><div class='line' id='LC11'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC12'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="s2">&quot;properties are bound to top-level features by id&quot;</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">bind</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC13'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">topology</span> <span class="o">=</span> <span class="nx">topojson</span><span class="p">.</span><span class="nx">topology</span><span class="p">({</span><span class="nx">feature</span><span class="o">:</span> <span class="p">{</span><span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;Feature&quot;</span><span class="p">,</span> <span class="nx">id</span><span class="o">:</span> <span class="s2">&quot;foo&quot;</span><span class="p">,</span> <span class="nx">properties</span><span class="o">:</span> <span class="p">{},</span> <span class="nx">geometry</span><span class="o">:</span> <span class="kc">null</span><span class="p">}});</span></div><div class='line' id='LC14'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">bind</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="p">{</span><span class="nx">foo</span><span class="o">:</span> <span class="p">{</span><span class="nx">color</span><span class="o">:</span> <span class="s2">&quot;red&quot;</span><span class="p">}});</span></div><div class='line' id='LC15'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">assert</span><span class="p">.</span><span class="nx">deepEqual</span><span class="p">(</span><span class="nx">topology</span><span class="p">.</span><span class="nx">objects</span><span class="p">.</span><span class="nx">feature</span><span class="p">.</span><span class="nx">properties</span><span class="p">,</span> <span class="p">{</span><span class="nx">color</span><span class="o">:</span> <span class="s2">&quot;red&quot;</span><span class="p">});</span></div><div class='line' id='LC16'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">},</span></div><div class='line' id='LC17'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="s2">&quot;properties are bound to collected features by id&quot;</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">bind</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC18'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="kd">var</span> <span class="nx">topology</span> <span class="o">=</span> <span class="nx">topojson</span><span class="p">.</span><span class="nx">topology</span><span class="p">({</span><span class="nx">collection</span><span class="o">:</span> <span class="p">{</span><span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;FeatureCollection&quot;</span><span class="p">,</span> <span class="nx">features</span><span class="o">:</span> <span class="p">[</span></div><div class='line' id='LC19'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">{</span><span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;Feature&quot;</span><span class="p">,</span> <span class="nx">id</span><span class="o">:</span> <span class="s2">&quot;foo&quot;</span><span class="p">,</span> <span class="nx">properties</span><span class="o">:</span> <span class="p">{},</span> <span class="nx">geometry</span><span class="o">:</span> <span class="kc">null</span><span class="p">},</span></div><div class='line' id='LC20'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">{</span><span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;Feature&quot;</span><span class="p">,</span> <span class="nx">id</span><span class="o">:</span> <span class="s2">&quot;bar&quot;</span><span class="p">,</span> <span class="nx">properties</span><span class="o">:</span> <span class="p">{},</span> <span class="nx">geometry</span><span class="o">:</span> <span class="p">{</span><span class="nx">type</span><span class="o">:</span> <span class="s2">&quot;Point&quot;</span><span class="p">,</span> <span class="nx">coordinates</span><span class="o">:</span> <span class="p">[</span><span class="mi">0</span><span class="p">,</span> <span class="mi">0</span><span class="p">]}}</span></div><div class='line' id='LC21'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">]}});</span></div><div class='line' id='LC22'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">bind</span><span class="p">(</span><span class="nx">topology</span><span class="p">,</span> <span class="p">{</span></div><div class='line' id='LC23'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">foo</span><span class="o">:</span> <span class="p">{</span><span class="nx">color</span><span class="o">:</span> <span class="s2">&quot;red&quot;</span><span class="p">},</span></div><div class='line' id='LC24'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">bar</span><span class="o">:</span> <span class="p">{</span><span class="nx">size</span><span class="o">:</span> <span class="mi">42</span><span class="p">}</span></div><div class='line' id='LC25'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">});</span></div><div class='line' id='LC26'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">assert</span><span class="p">.</span><span class="nx">deepEqual</span><span class="p">(</span><span class="nx">topology</span><span class="p">.</span><span class="nx">objects</span><span class="p">.</span><span class="nx">collection</span><span class="p">.</span><span class="nx">geometries</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">properties</span><span class="p">,</span> <span class="p">{</span><span class="nx">color</span><span class="o">:</span> <span class="s2">&quot;red&quot;</span><span class="p">});</span></div><div class='line' id='LC27'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="nx">assert</span><span class="p">.</span><span class="nx">deepEqual</span><span class="p">(</span><span class="nx">topology</span><span class="p">.</span><span class="nx">objects</span><span class="p">.</span><span class="nx">collection</span><span class="p">.</span><span class="nx">geometries</span><span class="p">[</span><span class="mi">1</span><span class="p">].</span><span class="nx">properties</span><span class="p">,</span> <span class="p">{</span><span class="nx">size</span><span class="o">:</span> <span class="mi">42</span><span class="p">});</span></div><div class='line' id='LC28'>&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC29'>&nbsp;&nbsp;<span class="p">}</span></div><div class='line' id='LC30'><span class="p">});</span></div><div class='line' id='LC31'><br/></div><div class='line' id='LC32'><span class="nx">suite</span><span class="p">.</span><span class="kr">export</span><span class="p">(</span><span class="nx">module</span><span class="p">);</span></div></pre></div>
          </td>
        </tr>
      </table>
  </div>

          </div>
        </div>

        <a href="#jump-to-line" rel="facebox" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
        <div id="jump-to-line" style="display:none">
          <h2>Jump to Line</h2>
          <form accept-charset="UTF-8" class="js-jump-to-line-form">
            <input class="textfield js-jump-to-line-field" type="text">
            <div class="full-button">
              <button type="submit" class="button">Go</button>
            </div>
          </form>
        </div>

      </div>
    </div>
</div>

<div id="js-frame-loading-template" class="frame frame-loading large-loading-area" style="display:none;">
  <img class="js-frame-loading-spinner" src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-128.gif?1347543527" height="64" width="64">
</div>


        </div>
      </div>
      <div class="context-overlay"></div>
    </div>

      <div id="footer-push"></div><!-- hack for sticky footer -->
    </div><!-- end of wrapper - hack for sticky footer -->

      <!-- footer -->
      <div id="footer">
  <div class="container clearfix">

      <dl class="footer_nav">
        <dt>GitHub</dt>
        <dd><a href="https://github.com/about">About us</a></dd>
        <dd><a href="https://github.com/blog">Blog</a></dd>
        <dd><a href="https://github.com/contact">Contact &amp; support</a></dd>
        <dd><a href="http://enterprise.github.com/">GitHub Enterprise</a></dd>
        <dd><a href="http://status.github.com/">Site status</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Applications</dt>
        <dd><a href="http://mac.github.com/">GitHub for Mac</a></dd>
        <dd><a href="http://windows.github.com/">GitHub for Windows</a></dd>
        <dd><a href="http://eclipse.github.com/">GitHub for Eclipse</a></dd>
        <dd><a href="http://mobile.github.com/">GitHub mobile apps</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Services</dt>
        <dd><a href="http://get.gaug.es/">Gauges: Web analytics</a></dd>
        <dd><a href="http://speakerdeck.com">Speaker Deck: Presentations</a></dd>
        <dd><a href="https://gist.github.com">Gist: Code snippets</a></dd>
        <dd><a href="http://jobs.github.com/">Job board</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>Documentation</dt>
        <dd><a href="http://help.github.com/">GitHub Help</a></dd>
        <dd><a href="http://developer.github.com/">Developer API</a></dd>
        <dd><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></dd>
        <dd><a href="http://pages.github.com/">GitHub Pages</a></dd>
      </dl>

      <dl class="footer_nav">
        <dt>More</dt>
        <dd><a href="http://training.github.com/">Training</a></dd>
        <dd><a href="https://github.com/edu">Students &amp; teachers</a></dd>
        <dd><a href="http://shop.github.com">The Shop</a></dd>
        <dd><a href="/plans">Plans &amp; pricing</a></dd>
        <dd><a href="http://octodex.github.com/">The Octodex</a></dd>
      </dl>

      <hr class="footer-divider">


    <p class="right">&copy; 2013 <span title="0.14152s from fe16.rs.github.com">GitHub</span>, Inc. All rights reserved.</p>
    <a class="left" href="https://github.com/">
      <span class="mega-icon mega-icon-invertocat"></span>
    </a>
    <ul id="legal">
        <li><a href="https://github.com/site/terms">Terms of Service</a></li>
        <li><a href="https://github.com/site/privacy">Privacy</a></li>
        <li><a href="https://github.com/security">Security</a></li>
    </ul>

  </div><!-- /.container -->

</div><!-- /.#footer -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
          <div class="suggester-container">
              <div class="suggester fullscreen-suggester js-navigation-container" id="fullscreen_suggester"
                 data-url="/mbostock/topojson/suggestions/commit">
              </div>
          </div>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped leftwards" title="Exit Zen Mode">
      <span class="mega-icon mega-icon-normalscreen"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped leftwards"
      title="Switch themes">
      <span class="mini-icon mini-icon-brightness"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="mini-icon mini-icon-exclamation"></span>
      Something went wrong with that request. Please try again.
      <a href="#" class="mini-icon mini-icon-remove-close ajax-error-dismiss"></a>
    </div>

    
    
    <span id='server_response_time' data-time='0.14196' data-host='fe16'></span>
    
  </body>
</html>

