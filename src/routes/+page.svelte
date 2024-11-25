<script>
  import { base } from '$app/paths';
  import Icon from "$lib/assets/adjd.png"
  
  let valueName='';

</script>

<div class="bg-img">
  <nav class="navbar is-fixed-top has-shadow" aria-label="main navigation">
    <div class="navbar-brand">
          <a class="navbar-item" href="{base}/">
          <img src={Icon} alt="Call Favortite Contacts" />
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

  </nav>
<section class="hero custom-primary is-fullheight ">
  
  <div class="hero-body ">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-8-tablet is-8-desktop is-8-widescreen">
          <form action="" class="box">
            <div class="field email">
              <label for="" class="label is-medium">Email</label>
              <div class="control has-icons-left">
                <input type="email" placeholder="e.g. bobsmith@gmail.com" bind:value="{valueName}" class="input is-medium" required>
                <span class="icon is-small is-left">
                  <i class="fa fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <a class="button is-rounded is-medium is-fullwidth is-info has-text-weight-bold" type="button" href="{base}/form?email={valueName}#state=Standby">
        <span>Login</span>
      </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
</div>


<style>
.email{
  padding: 80px 50px;
}
.custom-primary{
  background-color:#00bcf534;
} 
.bg-img{
  background-image: url("https://www.arabianbusiness.com/cloud/2021/09/16/K5seRsdE-abu-dhabi-judicial-derpartment-4.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>