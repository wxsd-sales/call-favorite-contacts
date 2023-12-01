<script>
  import { onMount } from "svelte";
  import { base } from '$app/paths';
  import Icon from "$lib/assets/adjd.png"

  onMount(()=>{
    document.body.classList.add('has-navbar-fixed-top');
  })
</script>

<svelte:head>
  <title>Call Favorite Contacts</title>
</svelte:head>



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