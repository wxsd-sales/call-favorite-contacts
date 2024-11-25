<script>
  import {PUBLIC_SERVER_URL} from '$env/static/public';
    import { onMount } from "svelte";
    import axios from "axios"
    import { base } from '$app/paths';
    import Icon from "$lib/assets/adjd.png"

    let contacts=[]
    let timeLeft=null;
    let email=null;
    let given_seconds=null;
    let thresholdDialog;
    let notFound=false;

  onMount(async ()=>{
    
    thresholdDialog = document.getElementById('threshold-dialog');
    var lochash = window.location.href.substr(1);
		console.log('url', lochash);
		var code = lochash.split('&')[0].split('=')[1];
		
        email=code.split('#')[0];
        console.log('email', email);
    await axios.get(`${PUBLIC_SERVER_URL}/data/${email}`).then((r)=>{
        console.log(r)
            contacts=r.data.data.contacts
            given_seconds=r.data.data.timeInSec
            let dateObj = new Date(given_seconds * 1000);
            let hours = dateObj.getUTCHours();
            let minutes = dateObj.getUTCMinutes();
            let seconds = dateObj.getSeconds();

            timeLeft = hours.toString().padStart(2, '0') + ':' + 
                            minutes.toString().padStart(2, '0') + ':' + 
                            seconds.toString().padStart(2, '0');
            console.log(timeLeft)
        }).catch((e)=>{
        console.log("error",e)
        notFound=true;
        })
    
    
  })
  async function onSubmit(e) {
    const formData = new FormData(e.target);
		
		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data)
        let time= parseInt(given_seconds)+parseInt(data.threshold)
    const thresdata={
      "time":time.toString()
    }
    await axios.post(`${PUBLIC_SERVER_URL}/data/${email}`,thresdata).then((r)=>{
      console.log(r)
      closeThresClick()
      location.reload()
    }).catch((e)=>{
      console.log("error",e)
    })
  }

  const showThresDialogClick = () => {
    thresholdDialog['showModal']();
	};
	const closeThresClick = () => {
		thresholdDialog.close();
	};
    // Construct the OAuth URL
</script>
<div>
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

      <div id="navbarBasicExample" class="navbar-menu">

      <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-fullwidth is-rounded is-info is-light has-text-weight-bold" href="{base}/">
                <span>Log out</span>
              </a>
            </div>
          </div>
        
      </div>
    </div>
    </div>

  </nav>
<section class="container p-4 is-align-items-center vertical-center" id="login">
  <div class="columns is-multiline">

    <dialog id="threshold-dialog">
      <form class="content" on:submit|preventDefault={onSubmit}>
        <div class="section">
          <label class="label" for="nameLabel">Enter time in seconds</label>
          <div class="control">
            <input class="input" type="text" id="threshold" name="threshold" placeholder="Enter time" required>
          </div>
        </div>
        
        <hr class="solid">
        <div class="columns is-multiline is-mobile">
          <div class="column">
            <button type="submit" class="button is-success is-rounded is-fullwidth" >Submit</button>
          </div>
          <div class="column">
            <button type="reset" class="button is-danger is-outlined is-rounded is-fullwidth" on:click={closeThresClick}>Cancel</button>
          </div>
        </div>
      </form>
	</dialog>

    {#if !notFound}
    <div class="column is-12 top-right">
      <h1 class="time-left"><b>Time Left:</b> {timeLeft}</h1> 
      <button class="button is-rounded is-medium is-fullwidth is-info has-text-weight-bold is-light" on:click={showThresDialogClick}>
        Recharge
      </button>
    </div>
    
    {#each contacts as contact}
    <div class="column is-12 cardContent">
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <div class="columns is-multiline">
                        <div class="column is-one-fifth">
                            <figure class="image is-48x48">
                                <img class="is-rounded" src="https://img.freepik.com/premium-vector/man-character_665280-46967.jpg">
                            </figure>
                        </div>
                        <div class="column is-four-fifths" style="padding-top:22px;">
                           <h3>{contact.name}</h3> 
                        </div>
                        <div class="column is-fullwidth">
                            {#if given_seconds==0}
                            <a class="button is-rounded is-medium is-fullwidth is-info has-text-weight-bold is-light" type="button">
                                <span>Call</span>
                            </a>
                            {:else}
                            <a class="button is-rounded is-medium is-fullwidth is-info has-text-weight-bold is-light" type="button" href="https://wxsd-sales.github.io/call-favorite-contacts/form?sip={contact.sip}&from={email}&time={given_seconds}">
                                <span>Call</span>
                            </a>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/each}
    {:else}
        <div class="column is-12">
      <h1><b>No Contacts found with this email address</b></h1> 
    </div>
    {/if}
  </div>
</section>
</div>
<style>
    .vertical-center {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.cardContent{
    padding: 50px;
}
.top-right{
    margin-top:-3%;
    margin-left:100%;
    text-align: center;
    width: 25%;
}
.time-left{
    font-size: 22px;
    color: green;
    padding-bottom: 20px;
}
dialog {
		border-radius: 10px;
		width: 30%;
		transition: all 2s;
		background-color: white;
	}
	dialog::backdrop {
		background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7));
		animation: fade-in 1s;
	}
    .navbar-menu{
        float:right;
        margin-right: 20px;
        margin-left: 890%;
    }
</style>