<script>
    import { onMount } from "svelte";
    import axios from "axios"

    let contacts=[]
    let timeLeft=null;

  onMount(async ()=>{
    let email=null;
    
    var lochash = window.location.href.substr(1);
		console.log('url', lochash);
		var code = lochash.split('&')[0].split('=')[1];
		console.log('code', code);
    await axios.get('https://webexapis.com/v1/people/me',{
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${code}`
    }
    })
    .then(async(r)=>{
        email=r.data.emails[0]
        await axios.get('https://e703-67-21-186-165.ngrok-free.app/data').then((r)=>{
            contacts=r.data[0].contacts
            let given_seconds=r.data[0].timeInSec
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
        })
    })
    
    
  })
    // Construct the OAuth URL
    const href = `https://wxsd-sales.github.io/call-favorite-contacts/form?sip=rkanthet@cisco.com`;
</script>

<section class="container p-4 is-align-items-center vertical-center" id="login">
  <div class="columns is-multiline">
    <div class="column is-12 top-right">
      <h1 class="time-left"><b>Time Left:</b> {timeLeft}</h1> 
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
                            <a class="button is-rounded is-medium is-fullwidth is-info has-text-weight-bold is-light" type="button" href="https://wxsd-sales.github.io/call-favorite-contacts/form?sip={contact.sip}">
                                <span>Call</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/each}
  </div>
</section>
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
    margin-top:-15%;
    margin-left:120%;;
}
.time-left{
    font-size: 22px;
    color: green;
}
</style>