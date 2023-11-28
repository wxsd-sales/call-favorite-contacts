<script>
  import { onMount } from "svelte";

  onMount(()=>{
    document.body.classList.add('has-navbar-fixed-top');
  })
</script>

<svelte:head>
  <title>Call Favorite Contacts</title>
</svelte:head>

<nav class="navbar is-fixed-top has-shadow" aria-label="main navigation">
    <div class="navbar-brand">
          <a class="navbar-item" href="/">
          <img src="/favicon.png" alt="RoomOS Device Widgets" />
        </a>

      <button
        id="main-burger"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">

      <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-fullwidth is-rounded is-info is-light has-text-weight-bold" href="/auth">
                <span>Log in</span>
              </a>
            </div>
          </div>
        
      </div>
    </div>
  </nav>

<main id="app">
  <slot />
</main>

  <footer class="footer has-background-grey-lighter">
    <div class="content has-text-centered">
      <p>
        <strong>Call Favorite Contacts</strong> by
        <a href="https://github.com/wxsd-sales" target="_blank" referrerpolicy="no-referrer">WXSD-Sales</a>.<br />
        &copy; {new Date().getUTCFullYear()} Webex by Cisco
      </p>
    </div>
  </footer>

  <style>
  html,
body {
  min-height: 100%;
}

#app {
  min-height: 100vh;
}

.is-fullheight {
  height: 100%;
}
</style>